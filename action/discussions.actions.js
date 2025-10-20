'use server';

import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Discussion from "@/models/Discussion";
import Opinion from "@/models/Opinion";
import { revalidatePath } from "next/cache";

export async function createDiscussion(prevState, formData) {
    const topic = formData.get('discussionTopic');
    const title = formData.get('discussionTitle');
    const subtitle = formData.get('discussionSubtitle');

    if (!topic || !title) {
        return {
            success: false,
            message: "Topic and Title are required fields."
        }
    }

    const user = await getUser();


    if (!user) {
        return {
            success: false,
            message: "User must be logged in to create a discussion."
        }
    }

    if (user?.role === 'user') {
        return {
            success: false,
            message: "You do not have permission to create a discussion."
        }
    }

    try {
        await connectDB();

        const discussion = await Discussion.create({
            topic,
            title,
            subtitle,
            createdBy: user?._id
        })

        if (!discussion) {
            return {
                success: false,
                message: "Failed to create discussion. Please try again."
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Discussion created successfully."
        }
    } catch (error) {
        console.error("Error creating discussion:", error);
        return {
            success: false,
            message: "An error occurred while creating the discussion."
        }
    }

}

export async function deleteDiscussion(prevState, formData) {
    const discussionId = formData.get('discussionId');

    if (!discussionId) {
        return {
            success: false,
            message: "Discussion ID is required."
        }
    }

    await connectDB();

    const discussion = await Discussion.findByIdAndDelete(discussionId);

    if (!discussion) {
        return {
            success: false,
            message: "Discussion not found or already deleted."
        }
    }

    revalidatePath('/', 'layout');

    return {
        success: true,
        message: "Discussion deleted successfully."
    }

}

export async function addOpinion(prevState, formData) {
    const opinion = formData.get('opinion');
    const discussionId = formData.get('discussionId');

    if (!opinion || !discussionId) {
        return {
            success: false,
            message: "Opinion is required."
        }
    }

    const user = await getUser();

    if (!user) {
        return {
            success: false,
            message: "User must be logged in to add an opinion."
        }
    }

    try {
        await connectDB();

        const addedOpinion = await Opinion.create({
            opinion,
            createdBy: user?._id,
            discussionId
        })

        if (!addedOpinion) {
            return {
                success: false,
                message: "Failed to add opinion. Please try again."
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: "Opinion added successfully."
        }
    } catch (error) {
        console.error("Error adding opinion:", error);
        return {
            success: false,
            message: "An error occurred while adding the opinion."
        }
    }

}