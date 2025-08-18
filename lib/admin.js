import PendingUser from "@/models/PendingUser";
import { connectDB } from "./mongodb";

export async function getAllPendingUsers() {
    await connectDB();
    return await PendingUser.find({});
}