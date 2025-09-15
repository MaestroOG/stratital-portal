import Project from "@/models/Project";
import { connectDB } from "./mongodb";
import mongoose from "mongoose";
import Note from "@/models/Note";
import User from "@/models/User";
import { getUserFromDB } from "./user";

export async function getAllProjects() {
    await connectDB();
    const projects = await Project.find({}).populate('createdBy').sort({ createdAt: -1 });
    return projects;
}

export async function getAllUserProjects(createdBy) {
    await connectDB();
    const projects = await Project.find({ createdBy, status: { $in: ["pending", "in-progress", "completed"] } }).populate("createdBy").sort({ createdAt: -1 });
    return projects;
}

export async function getProjectById(id) {
    await connectDB();
    const project = await Project.findById(id).populate("createdBy");
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