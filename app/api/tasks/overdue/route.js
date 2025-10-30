import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { createTransporter } from "@/utils/transporterFns";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();

    const now = new Date();

    const overdueTasks = await Task.find({
        dueDate: { $lt: now },
        status: { $ne: "completed" },
        isOverdueNotified: false
    }).populate("createdBy", "email");

    if (overdueTasks.length === 0)
        return NextResponse.json({ message: "No overdue tasks found" });

    for (const task of overdueTasks) {
        const transporter = createTransporter();

        await transporter.sendMail({
            from: '"Stratital" <admin@stratital.com>',
            to: ['admin@stratital.com', 'portal@stratital.com'],
            subject: "Task Overdue Alert",
            html: `
        <p>The task with the title <strong>${task.title}</strong> is overdue.</p>
        <p>Due Date: ${task.dueDate.toDateString()}</p>
        <p>Created By: ${task.createdBy.email}</p>
        <p>Description: ${task.description || "No description"}</p>
      `,
        })

        task.isOverdueNotified = true;
        await task.save();
    }

    return NextResponse.json({ message: "Overdue notifications sent" });
}
