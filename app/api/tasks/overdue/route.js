import { generateTaskOverdueEmail } from "@/htmlemailtemplates/taskEmailTemplates";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { createTransporter } from "@/utils/transporterFns";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
    } catch (error) {
        return NextResponse.json(
            { error: "Database connection failed" },
            { status: 500 }
        );
    }
    const now = new Date();

    const overdueTasks = await Task.find({
        dueDate: { $lt: now },
        status: { $ne: "completed" },
        isOverdueNotified: false
    }).populate("createdBy", "email");

    if (overdueTasks.length === 0)
        return NextResponse.json({ message: "No overdue tasks found" });

    const transporter = createTransporter();
    for (const task of overdueTasks) {
        if (!task.createdBy?.email) {
            console.error(`Task ${task._id} has no valid creator email`);
            continue;
        }

        task.isOverdueNotified = true;
        await task.save();

        const html = generateTaskOverdueEmail(task)

        await transporter.sendMail({
            from: '"Stratital" <admin@stratital.com>',
            to: ['admin@stratital.com', 'portal@stratital.com'],
            subject: "Task Overdue Alert",
            html,
        })


    }

    return NextResponse.json({ message: "Overdue notifications sent" });
}
