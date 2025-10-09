'use server'

import { uploadFilesToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import HowToVideo from "@/models/HowToVideo";
import Project from "@/models/Project";
import Resource from "@/models/Resource";
import User from "@/models/User";
import { getYouTubeEmbedUrl } from "@/utils/formUtils";
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
    const file = formData.get('file');
    const resourceLink = formData.get('resourceLink')

    console.log(resourceLink)

    if ((!file || file.size === 0) && !resourceLink) {
        return {
            success: false,
            message: "Please upload a valid file or provide a resource link.",
        };
    }

    let fileUrl;

    try {

        if (file && file.size > 0) {
            fileUrl = await uploadFilesToCloudinary(file);
        }

        else if (resourceLink && !file || file.size === 0) {
            fileUrl = resourceLink;
        }
    } catch (error) {
        if (error?.response?.status === 413) {
            return {
                success: false,
                message: "File is too large. Please upload a smaller file.",
            };
        }

        return {
            success: false,
            message: "Something went wrong during upload.",
        };
    }


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
    const link = formData.get('videoLink')?.trim();

    try {

        const videoLink = getYouTubeEmbedUrl(link);

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

export async function deleteHowToVideo(prevState, formData) {
    const videoId = formData.get('videoId');

    if (!videoId) {
        return {
            success: false,
            message: 'No valid id received'
        }
    }

    try {
        await connectDB();

        const deletedVideo = await HowToVideo.findByIdAndDelete(videoId);
        if (deletedVideo) {
            revalidatePath('/how-to', 'page');
            return {
                success: true,
                message: 'Video deleted successfully'
            }
        }

        return {
            success: false,
            message: 'Something went wrong'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export async function editHowToVideo(prevState, formData) {
    const videoId = formData.get('videoId');
    const title = formData.get('title');
    const videoLink = formData.get('videoLink');

    if (!title || !videoLink) {
        return {
            success: false,
            message: 'You cannot leave the fields empty'
        }
    }

    if (!videoId) {
        return {
            success: false,
            message: 'No valid id received'
        }
    }

    try {
        await connectDB();

        const updates = {};

        if (title) {
            updates.title = title;
        }

        if (videoLink) {
            const embedUrl = getYouTubeEmbedUrl(videoLink);
            if (!embedUrl) {
                return {
                    success: false,
                    message: 'Please provide a valid YouTube link'
                }
            }
            updates.videoLink = embedUrl;
        }

        const editedVideo = await HowToVideo.findByIdAndUpdate(videoId, { $set: updates });

        if (editedVideo) {
            revalidatePath('/how-to', 'page');
            return {
                success: true,
                message: 'Video edited successfully'
            }
        }

        return {
            success: false,
            message: 'Something went wrong'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
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
    const resourceLink = formData.get('resourceLink')?.trim();

    const updateData = {};
    if (title) updateData.title = title;

    let fileUrl;

    if (file && file.size > 0) {
        try {
            updateData.fileUrl = await uploadFilesToCloudinary(file);
        } catch (err) {
            console.error(err);
            if (err?.response?.status === 413) {
                return {
                    success: false,
                    message: "File is too large. Please upload a smaller file.",
                };
            }
            return {
                success: false,
                message: 'Failed to upload file. Please try again.'
            };
        }
    } else if (resourceLink && !file || file.size === 0) {
        fileUrl = resourceLink;
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

export async function deleteProject(prevState, formData) {
    const projectId = formData.get('projectId');

    if (!projectId) {
        return {
            success: false,
            message: 'No valid id received'
        }
    }

    const user = await getUser();

    if (user?.role !== 'superadmin') {
        return {
            success: false,
            message: 'You do not have permission to perform this action'
        }
    }

    try {
        await connectDB();
    } catch (err) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }

    try {
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (deletedProject) {
            revalidatePath('/', 'layout');
            return {
                success: true,
                message: 'Project deleted successfully'
            }
        }

        return {
            success: false,
            message: 'Something went wrong'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}