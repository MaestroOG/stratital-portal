import PendingUser from "@/models/PendingUser";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import Project from "@/models/Project";
import Note from "@/models/Note";

export async function getAllPendingUsers() {
    await connectDB();
    return await PendingUser.find({});
}

export async function getPendingUserById(id) {
    await connectDB();
    return await PendingUser.findById(id);
}

export async function getAllUsers() {
    await connectDB();
    return await User.find({}).sort({ createdAt: -1 });
}

export async function getUserById(userId) {
    await connectDB();
    return User.findById(userId);
}

export async function getAllComments() {
    await connectDB();
    return await Note.find({}).populate("createdBy").populate("projectId");
}