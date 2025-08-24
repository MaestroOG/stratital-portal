import Project from "@/models/Project";
import { connectDB } from "./mongodb";
import mongoose from "mongoose";
import Note from "@/models/Note";
import User from "@/models/User";
import { getUserFromDB } from "./user";

export async function getAllProjects() {
    await connectDB();
    const projects = await Project.find({}).populate('createdBy');
    return projects;
}

export async function getAllUserProjects(createdBy) {
    await connectDB();
    const projects = await Project.find({ createdBy, status: { $in: ["pending", "in-progress", "completed"] } }).sort({ createdAt: -1 });
    return projects;
}

export async function getProjectById(id) {
    await connectDB();
    const project = await Project.findById(id);
    return project;
}

export async function getNotesByProjectId(projectId) {
    await connectDB();

    const notes = await Note.find({
        projectId: new mongoose.Types.ObjectId(projectId),
    }).populate('createdBy', 'name').sort({ createdAt: -1 });

    return notes;
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