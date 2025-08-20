import Project from "@/models/Project";

export async function getAllUserProjects(createdBy) {
    const projects = await Project.find({ createdBy });
    return projects;
}

export async function getProjectById(id) {
    const project = await Project.findById(id);
    return project;
}