'use server';

import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Task from "@/models/Task";
import TaskComment from "@/models/TaskComment";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(selectedUsers, prevState, formData) {
    const title = formData.get('title')?.trim();
    const description = formData.get('description')?.trim();
    const dueDate = formData.get('dueDate');
    const status = formData.get('status');
    const assignees = selectedUsers;

    const user = await getUser();

    if (!user || user?.role !== 'superadmin') {
        return {
            success: false,
            message: "Failed to create task. Please Authorize yourself."
        }
    }

    try {
        await connectDB();

        const task = await Task.create({
            title,
            description,
            dueDate,
            status,
            createdBy: user?._id,
            assignees
        })

        if (!task) {
            return {
                success: false,
                message: "Failed to create task"
            }
        }

        revalidatePath('/', 'layout')

        return {
            success: true,
            message: "Task successfully created"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export async function createTaskComment(prevState, formData) {
    const commentText = formData.get('commentText');
    const taskId = formData.get('taskId')

    const user = await getUser();

    if (!user) {
        return {
            success: false,
            message: "You should be authencticated to make a comment"
        }
    }

    if (!commentText) {
        return {
            success: false,
            message: "Comment cannot be empty"
        }
    }

    try {
        await connectDB();

        const taskComment = await TaskComment.create({
            commentText,
            createdBy: user?._id,
            taskId
        })

        if (!taskComment) {
            return {
                success: false,
                message: "Cannot create comment"
            }
        }

        revalidatePath('/', 'layout')

        return {
            success: true,
            message: "Comment created successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function deleteTask(prevState, formData) {
    const taskId = formData.get('taskId');
    const user = await getUser();

    console.log(taskId)
    if (!user) {
        return {
            success: false,
            message: "Cannot perform this action without authenticating"
        }
    }

    if (user?.role !== 'superadmin') {
        return {
            success: false,
            message: "You need admin priveleges to perform this action"
        }
    }

    if (!taskId) {
        return {
            success: false,
            message: "Task does not exist"
        }
    }

    try {
        await connectDB();

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return {
                success: false,
                message: "Could not delete task"
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Task deleted successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong"
        }
    }

}