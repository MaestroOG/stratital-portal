import Notification from "@/models/Notification";
import { connectDB } from "./mongodb"

export const getAllNotifications = async () => {
    await connectDB();
    const notifications = await Notification.find({});
    return notifications;
}