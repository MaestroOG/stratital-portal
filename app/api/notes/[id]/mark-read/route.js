import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // your MongoDB connection file
import Note from "@/models/Note"; // your Note model

// PATCH /api/notes/[id]/mark-read
export async function POST(req, { params }) {
    try {
        const { id } = params; // Note ID from URL
        const { userId } = await req.json(); // user ID from request body

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Connect to DB
        await connectDB();

        // Find the note
        const note = await Note.findById(id);
        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        // If user hasn't read it yet, add them to readBy array
        if (!note.readBy.includes(userId)) {
            note.readBy.push(userId);
            await note.save();
        }

        return NextResponse.json({ success: true, note });
    } catch (error) {
        console.error("Error marking note as read:", error);
        return NextResponse.json(
            { error: "Failed to mark note as read" },
            { status: 500 }
        );
    }
}
