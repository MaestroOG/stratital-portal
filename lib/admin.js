import PendingUser from "@/models/PendingUser";

export async function getAllPendingUsers() {
    return await PendingUser.find({});
}