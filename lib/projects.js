import Project from "@/models/Project";
import { connectDB } from "./mongodb";

export async function getAllUserProjects(createdBy) {
    await connectDB();
    const projects = await Project.find({ createdBy });
    return projects;
}

export async function getProjectById(id) {
    await connectDB();
    const project = await Project.findById(id);
    return project;
}