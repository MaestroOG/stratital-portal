import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET() {
    try {
        await connectDB();

        const notifications = await Notification.find().sort({ createdAt: -1 });

        return Response.json(notifications, { status: 200 });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return Response.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}