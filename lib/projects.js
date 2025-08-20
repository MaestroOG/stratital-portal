import Project from "@/models/Project";
import { connectDB } from "./mongodb";
import mongoose from "mongoose";
import Note from "@/models/Note";

export async function getAllUserProjects(createdBy) {
    await connectDB();
    const projects = await Project.find({ createdBy }).populate('createdBy').sort({ createdAt: -1 });
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