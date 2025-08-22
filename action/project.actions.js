'use server';

import { generateProjectCreatedEmailTemplate } from "@/htmlemailtemplates/emailTemplates";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Note from "@/models/Note";
import Project from "@/models/Project";
import { cleanFormEntries } from "@/utils/formUtils";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

export async function createProject(prevState, formData) {
    const user = await getUser();
    const service = formData.get("service");
    const projectTitle = formData.get("projectTitle");
    const packageSelected = formData.get("selectedPackage")
    const entries = {};

    // Turn formData into a plain object
    formData.forEach((value, key) => {
        if (key !== "service") {
            entries[key] = value;
        }
    });


    const cleanedEntries = cleanFormEntries(entries);

    const html = generateProjectCreatedEmailTemplate(user?.companyName, projectTitle, service, packageSelected);

    await connectDB();

    await Project.create({
        projectTitle,
        service,
        fields: cleanedEntries,
        status: 'pending',
        createdBy: user?._id,
        packageSelected
    })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    await transporter.sendMail({
        from: `stratital.portal@gmail.com`,
        to: [user?.email, 'portal@stratital.com'],
        subject: "Project Created - Stratital",
        html,
    })

    return {
        success: true,
        message: "Project created successfully",
    }
}


export async function addNote(id, prevState, formData) {
    const user = await getUser();
    const note = formData.get("note");

    try {
        await connectDB();
        await Note.create({
            note,
            createdBy: user?._id,
            projectId: id,
        })

        revalidatePath('/', "layout")

        return {
            success: true,
            message: "Note added successfully",
        }
    } catch (error) {
        return {
            message: "Failed to add note"
        }
    }
}


export async function ApproveProject(projectId, prevState, formData) {
    await connectDB();
    await Project.findByIdAndUpdate(projectId, { status: 'in-progress' });
    revalidatePath('/', "layout");

    return {
        success: true,
        message: "Project approved successfully",
    }
}

export async function RejectProject(projectId, prevState, formData) {
    await connectDB();
    await Project.findByIdAndUpdate(projectId, { status: 'rejected' });
    revalidatePath('/', "layout");

    return {
        success: true,
        message: "Project rejected successfully",
    }
}
