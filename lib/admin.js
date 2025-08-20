import PendingUser from "@/models/PendingUser";
import { connectDB } from "./mongodb";
import User from "@/models/User";

export async function getAllPendingUsers() {
    await connectDB();
    return await PendingUser.find({});
}

export async function getAllUsers() {
    await connectDB();
    return await User.find({}).sort({ createdAt: -1 });
}