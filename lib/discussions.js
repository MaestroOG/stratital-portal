import Discussion from "@/models/Discussion";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import Opinion from "@/models/Opinion";

export async function getAllDiscussions() {
    await connectDB();
    const discussions = await Discussion.find({}).populate('createdBy').sort({ createdAt: -1 }).lean();
    return discussions;
}

export async function getDiscussionById(id) {
    await connectDB();
    const discussion = await Discussion.findById(id).populate('createdBy').lean();
    return discussion;
}

export async function getOpinionsByDiscussionId(discussionId) {
    await connectDB();
    const opinions = await Opinion.find({ discussionId }).populate('createdBy').sort({ createdAt: -1 }).lean();
    return opinions;
}