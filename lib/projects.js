import Project from "@/models/Project";
import { connectDB } from "./mongodb";
import mongoose from "mongoose";
import Note from "@/models/Note";

export async function getAllUserProjects(createdBy) {
    await connectDB();
    const projects = await Project.find({ createdBy }).sort({ createdAt: -1 });
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
    }).sort({ createdAt: -1 });

    return notes;
}

export async function getCompletedProjectsThisMonth() {
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

export async function getPendingProjectsThisMonth() {
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

export async function getRunningProjectsThisMonth() {
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