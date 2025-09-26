'use server'

import { uploadFilesToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import HowToVideo from "@/models/HowToVideo";
import Resource from "@/models/Resource";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createManager(prevState, formData) {
    const userId = formData.get('userId');
    const service = formData.get('service');

    try {
        await connectDB();
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: { role: "manager" },
                $addToSet: { serviceManager: service },
            },
            { new: true }
        );

        return {
            success: true,
            message: "Role Assigned Successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}


export async function updateUserDetails(formValues, prevState, formData) {
    const userId = formData.get("userId")

    await connectDB();

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: formValues })

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return {
            success: true,
            message: "User updated successfully"
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}

export async function addResource(prevState, formData) {
    const title = formData.get('title');
    const file = formData.get('file')

    if (!file) {
        return {
            success: false,
            message: "Please upload a valid file"
        }
    }

    const fileUrl = await uploadFilesToCloudinary(file);

    await connectDB();

    await Resource.create({
        title,
        fileUrl
    })

    revalidatePath('/', 'layout')

    return {
        success: true,
        message: "Resource added successfully"
    }
}

export async function addHowToVideo(prevState, formData) {
    const title = formData.get('title')?.trim();
    const videoLink = formData.get('videoLink')?.trim();

    try {

        await connectDB();

        await HowToVideo.create({
            title,
            videoLink
        })

        revalidatePath('/', 'layout');
        return {
            success: true,
            message: "Video added Successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong."
        }
    }
}

export async function deleteResource(prevState, formData) {
    const resourceId = formData.get('resourceId');

    try {
        await connectDB();
        await Resource.findByIdAndDelete(resourceId);


        revalidatePath('/resources', "page");
        return {
            success: true,
            message: 'Resource deleted successfully.'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong.'
        }
    }
}

export async function editResource(prevState, formData) {
    const title = formData.get('title')?.trim();
    const file = formData.get('file');
    const resourceId = formData.get('resourceId');

    const updateData = {};
    if (title) updateData.title = title;

    let fileUrl;

    if (file && file.size > 0) {
        try {
            updateData.fileUrl = await uploadFilesToCloudinary(file);
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: 'Failed to upload file. Please try again.'
            };
        }
    }
    updateData.fileUrl = fileUrl;


    await connectDB();

    const updatedResource = await Resource.findByIdAndUpdate(resourceId, { $set: updateData })

    if (!updatedResource) {
        return {
            success: false,
            message: "Resource not found",
        };
    }

    revalidatePath('/resources', 'page')

    return {
        success: true,
        message: "Resource updated successfully"
    }

}