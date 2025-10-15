import Project from "@/models/Project";
import { connectDB } from "./mongodb";
import mongoose from "mongoose";
import Note from "@/models/Note";
import User from "@/models/User";
import { getUserFromDB } from "./user";

export async function getAllProjects() {
    await connectDB();
    const projects = await Project.find({ status: { $ne: 'rejected' } }).populate('createdBy').sort({ createdAt: -1 }).lean();
    return projects;
}

export async function getAllUserProjects(createdBy) {
    await connectDB();
    const projects = await Project.find({ createdBy, status: { $in: ["pending", "in-progress"] } }).populate("createdBy").sort({ createdAt: -1 }).lean();
    return projects;
}

export async function getProjectById(id) {
    await connectDB();
    const project = await Project.findById(id).populate("createdBy").lean();
    return project;
}

export async function getNotesByProjectId(projectId, page = 1, limit = 10) {
    await connectDB();

    const skip = (page - 1) * limit;

    const notes = await Note.find({
        projectId: new mongoose.Types.ObjectId(projectId),
    })
        .populate("createdBy")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await Note.countDocuments({
        projectId: new mongoose.Types.ObjectId(projectId),
    });

    return {
        notes: JSON.parse(JSON.stringify(notes)),
        hasMore: skip + notes.length < total,
    };
}

export async function getUnreadNotesByProject(projectId, userId) {
    try {
        await connectDB();

        // Find all notes in the project where userId is NOT in readBy
        const unreadNotes = await Note.find({
            projectId: new mongoose.Types.ObjectId(projectId),
            readBy: { $nin: [userId] },
        })
            .populate("createdBy", "name companyName profilePictureUrl")
            .sort({ createdAt: -1 });

        return unreadNotes;
    } catch (err) {
        console.error("Error fetching unread notes:", err);
        throw new Error("Failed to fetch unread notes");
    }
}

export async function getCompletedProjectsThisMonth() {
    const user = await getUserFromDB();
    await connectDB();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const count = await Project.countDocuments({
        status: "completed",
        createdBy: user?._id,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return count;
}

export async function getPendingProjectsThisMonth() {
    const user = await getUserFromDB();
    await connectDB();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const count = await Project.countDocuments({
        status: "pending",
        createdBy: user?._id,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return count;
}

export async function getRunningProjectsThisMonth() {
    const user = await getUserFromDB();
    await connectDB();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const count = await Project.countDocuments({
        status: "in-progress",
        createdBy: user?._id,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return count;
}

export async function getAllCompletedProjects() {
    await connectDB();
    const projects = await Project.find({ status: "completed" }).populate('createdBy').sort({ createdAt: -1 }).lean();
    return projects;
}

export async function getAllCompletedUserProjects() {
    await connectDB();
    const user = await getUserFromDB();
    if (!user) {
        return [];
    }
    const projects = await Project.find({ status: "completed", createdBy: user?._id }).populate('createdBy').sort({ createdAt: -1 }).lean();
    return projects;
}

export async function getAllArchivedProjects() {
    await connectDB();
    const projects = await Project.find({ status: "archived" }).populate('createdBy').sort({ createdAt: -1 }).lean();
    return projects;
}

export async function getAllArchivedUserProjects() {
    await connectDB();
    const user = await getUserFromDB();
    const projects = await Project.find({ status: "archived", createdBy: user?._id }).populate('createdBy').sort({ createdAt: -1 }).lean();
    return projects;
}