import Note from "@/models/Note";
import { connectDB } from "./mongodb"
import { getUser } from "./user";
import User from "@/models/User";
import Project from "@/models/Project";

export const getAllUserRelatedComments = async () => {
    await connectDB();
    const user = await getUser();

    const projects = await Project.find({ createdBy: user?._id }).select("_id");

    const projectIds = projects.map(p => p._id);

    const notes = await Note.find({ projectId: { $in: projectIds } })
        .populate("createdBy", "name email")
        .populate("projectId", "projectTitle service");

    return notes;
}