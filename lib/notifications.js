import Notification from "@/models/Notification";
import { connectDB } from "./mongodb"
import { getUser } from "./user";

export const getAllNotifications = async () => {
    await connectDB();
    const notifications = await Notification.find({});
    return notifications;
}

export async function getLatestUnreadNotification() {
    try {
        await connectDB();
        const user = await getUser();

        const notification = await Notification.findOne({
            readBy: { $ne: user?._id }
        }).sort({ createdAt: -1 }).lean();

        return notification;
    } catch (error) {
        console.error(error);
        return null;
    }
}