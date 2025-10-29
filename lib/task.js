import Task from "@/models/Task";
import { connectDB } from "./mongodb";
import TaskComment from "@/models/TaskComment";

export async function getTasks() {
    try {
        await connectDB();
        const tasks = await Task.find()
            .sort({ dueDate: -1 });

        return tasks;
    } catch (error) {
        console.error(error)
        return [];
    }
}

export const getTaskById = async (id) => {
    try {
        await connectDB();
        const task = await Task.findById(id).populate('createdBy').populate('assignees');
        return task;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getTaskCommentByTaskId(id) {
    try {
        await connectDB();
        const comments = await TaskComment.find({ taskId: id }).populate('createdBy').sort({ createdAt: -1 }).lean();
        return comments;
    } catch (error) {
        console.error(error);
        return null;
    }
}