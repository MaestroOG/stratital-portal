'use server';

import { generateNoteCreatedEmailUserTemplate, generateProjectCreatedEmailTemplate } from "@/htmlemailtemplates/emailTemplates";
import { generateProjectStatusUpdateEmail } from "@/htmlemailtemplates/projectStatusTemplates";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Note from "@/models/Note";
import Project from "@/models/Project";
import { cleanFormEntries } from "@/utils/formUtils";
import { createTransporter } from "@/utils/transporterFns";
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

        const transporter = await createTransporter();

        const html = generateNoteCreatedEmailUserTemplate('https://portal.stratital.com', user?.name);

        await transporter.sendMail({
            from: `stratital.portal@gmail.com`,
            to: [user?.email, 'stratital.portal@gmail.com'],
            subject: "Note Created - Stratital",
            html,
        })

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
    const user = await getUser();
    await connectDB();
    await Project.findByIdAndUpdate(projectId, { status: 'in-progress' });
    revalidatePath('/', "layout");

    const project = await Project.findById(projectId);


    const html = generateProjectStatusUpdateEmail(project?.projectTitle, 'in-progress', user?.name, project?.updatedAt);

    const transporter = await createTransporter();

    await transporter.sendMail({
        from: `stratital.portal@gmail.com`,
        to: [user?.email, 'stratital.portal@gmail.com'],
        subject: "Project Status Update - Stratital",
        html,
    })

    return {
        success: true,
        message: "Project approved successfully",
    }
}

export async function RejectProject(projectId, prevState, formData) {
    const user = await getUser();
    await connectDB();
    await Project.findByIdAndUpdate(projectId, { status: 'rejected' });
    revalidatePath('/', "layout");

    const project = await Project.findById(projectId);


    const html = generateProjectStatusUpdateEmail(project?.projectTitle, 'cancelled', user?.name, project?.updatedAt);

    const transporter = await createTransporter();

    await transporter.sendMail({
        from: `stratital.portal@gmail.com`,
        to: [user?.email, 'stratital.portal@gmail.com'],
        subject: "Project Status Update - Stratital",
        html,
    })

    return {
        success: true,
        message: "Project rejected successfully",
    }
}
