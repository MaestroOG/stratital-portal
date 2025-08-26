'use server';

import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function createNotification(prevState, formData) {
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();

    try {
        await connectDB();
        await Notification.create({
            title,
            description
        })

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