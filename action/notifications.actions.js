'use server';

import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { revalidatePath } from "next/cache";

export async function createNotification(prevState, formData) {
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();

    try {
        await connectDB();
        await Notification.create({
            title,
            description
        })

        revalidatePath('/', "layout")

        return {
            success: true,
            message: "Notification successfully created!"
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to create notification"
        }
    }
}