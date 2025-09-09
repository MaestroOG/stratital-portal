import PendingUser from "@/models/PendingUser";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import Project from "@/models/Project";
import Note from "@/models/Note";
import DeletedUser from "@/models/DeletedUser";
import { getUser, getUserFromDB } from "./user";
import { toCamelCase } from "@/utils/formUtils";

export async function getAllPendingUsers() {
    await connectDB();
    return await PendingUser.find({});
}

export async function getPendingUserById(id) {
    await connectDB();
    return await PendingUser.findById(id);
}

export async function getAllUsers() {
    await connectDB();
    return await User.find({}).sort({ createdAt: -1 });
}

export async function getUserById(userId) {
    await connectDB();
    return User.findById(userId);
}

export async function getAllComments() {
    await connectDB();
    return await Note.find({ projectId: { $ne: null } }).populate("createdBy").populate("projectId").sort({ createdAt: -1 });
}

export async function getAllDeletedUsers() {
    await connectDB();
    return await DeletedUser.find({});
}

export async function getAllSimpleUsers() {
    await connectDB();
    return await User.find({ role: 'user' }).lean();
}

export async function getAllManagerRelatedProjects() {
    await connectDB();
    const user = await getUserFromDB();

    const normalizedServices = user?.serviceManager?.map(service =>
        toCamelCase(service)
    );

    const projects = await Project.find({
        service: { $in: normalizedServices }
    });

    return projects;
}


export async function getAllProjects() {
    await connectDB();
    return await Project.find({});
}

export async function getAllCompletedProjectsThisMonth() {
    await connectDB();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const count = await Project.countDocuments({
        status: "completed",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return count;
}


export async function getAllPendingProjectsThisMonth() {
    await connectDB();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const count = await Project.countDocuments({
        status: "pending",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return count;
}


export async function getAllRunningProjectsThisMonth() {
    await connectDB();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const count = await Project.countDocuments({
        status: "in-progress",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return count;
}


export async function getAllPartners() {
    await connectDB();
    return await User.find({ role: 'user' }).lean();
}