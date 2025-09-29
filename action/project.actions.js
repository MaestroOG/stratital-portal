'use server';

import { generateAdminToUserEmailNoteTemplate, generateNoteCreatedEmailUserTemplate, generateProjectCreatedEmailTemplate } from "@/htmlemailtemplates/emailTemplates";
import { generateProjectStatusUpdateEmail } from "@/htmlemailtemplates/projectStatusTemplates";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import Note from "@/models/Note";
import Project from "@/models/Project";
import User from "@/models/User";
import { cleanFormEntries, formatDateToYMD, validateEntries } from "@/utils/formUtils";
import { createTransporter } from "@/utils/transporterFns";
import { revalidatePath } from "next/cache";

export async function createProject(prevState, formData) {
    const user = await getUser();
    const service = formData.get("service");
    const projectTitle = formData.get("projectTitle");
    const packageSelected = formData.get("selectedPackage")
    const entries = {};
    const partnerId = formData.get("partnerId")

    // Turn formData into a plain object
    formData.forEach((value, key) => {
        if (key !== "service") {
            entries[key] = value;
        }
    });

    const cleanedEntries = cleanFormEntries(entries);

    if (!cleanedEntries || !validateEntries(cleanedEntries)) {
        return {
            success: false,
            message: "Project not created.",
        }
    }

    await connectDB();

    if (user?.role === 'superadmin') {
        const projectForUser = await User.findById(partnerId);
        await Project.create({
            projectTitle,
            service,
            fields: cleanedEntries,
            status: 'pending',
            createdBy: projectForUser?._id,
            packageSelected,
            byAdmin: true
        })

        const html = generateProjectCreatedEmailTemplate(projectForUser?.companyName, projectTitle, service, packageSelected);

        const transporter = createTransporter();

        await transporter.sendMail({
            from: '"Stratital" <admin@stratital.com>',
            to: [projectForUser?.email, 'portal@stratital.com'],
            subject: "Project Created - Stratital",
            html,
        })
    }

    if (user?.role === 'user') {
        const html = generateProjectCreatedEmailTemplate(user?.companyName, projectTitle, service, packageSelected);

        await Project.create({
            projectTitle,
            service,
            fields: cleanedEntries,
            status: 'pending',
            createdBy: user?._id,
            packageSelected
        })

        const transporter = createTransporter();

        await transporter.sendMail({
            from: '"Stratital" <admin@stratital.com>',
            to: [user?.email, 'portal@stratital.com'],
            subject: "Project Created - Stratital",
            html,
        })
    }

    return {
        success: true,
        message: "Project created successfully",
    }
}


export async function addNote(id, prevState, formData) {
    const user = await getUser();
    const commentText = formData.get('commentText');


    try {
        await connectDB();
        const project = await Project.findById(id).populate("createdBy");
        await Note.create({
            note: commentText,
            createdBy: user?._id,
            projectId: id,
        })

        revalidatePath('/', "layout")

        const transporter = createTransporter();

        const html = generateNoteCreatedEmailUserTemplate('https://portal.stratital.com', user?.name);

        if (user?.role === 'user') {
            await transporter.sendMail({
                from: '"Stratital" <admin@stratital.com>',
                to: ['admin@stratital.com', 'portal@stratital.com'],
                subject: "Note Created - Stratital",
                html,
            })
        }

        if (user?.role === 'superadmin') {
            const date = formatDateToYMD(project?.createdAt)
            const adminToUserHtml = generateAdminToUserEmailNoteTemplate(project?.projectTitle, project?.createdBy?.name, date, 'https://portal.stratital.com');
            await transporter.sendMail({
                from: '"Stratital" <admin@stratital.com>',
                to: [project?.createdBy.email, 'portal@stratital.com'],
                subject: "Note Created - Stratital",
                html: adminToUserHtml,
            })
        }

        return {
            success: true,
            message: "Comment added successfully",
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to add comment"
        }
    }
}


export async function ApproveProject(projectId, prevState, formData) {
    const user = await getUser();
    await connectDB();
    await Project.findByIdAndUpdate(projectId, { status: 'in-progress' });
    revalidatePath('/', "layout");

    const project = await Project.findById(projectId).populate('createdBy');


    const html = generateProjectStatusUpdateEmail(project?.projectTitle, 'in-progress', user?.name, project?.updatedAt);

    const transporter = createTransporter();

    await transporter.sendMail({
        from: '"Stratital" <admin@stratital.com>',
        to: [project?.createdBy.email, 'portal@stratital.com'],
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

    const transporter = createTransporter();

    await transporter.sendMail({
        from: '"Stratital" <admin@stratital.com>',
        to: [user?.email, 'portal@stratital.com'],
        subject: "Project Status Update - Stratital",
        html,
    })

    return {
        success: true,
        message: "Project rejected successfully",
    }
}


export async function changeProjectStatus(projectId, prevState, formData) {
    const status = formData.get("status")?.trim();
    const user = await getUser();
    await connectDB();

    await Project.findByIdAndUpdate(projectId, { status: status });
    revalidatePath('/', "layout");

    const project = await Project.findById(projectId);

    const html = generateProjectStatusUpdateEmail(project?.projectTitle, status, user?.name, project?.updatedAt);

    const transporter = createTransporter();

    await transporter.sendMail({
        from: '"Stratital" <admin@stratital.com>',
        to: ["portal@stratital.com", user?.email],
        subject: "Project Status Update - Stratital",
        html,
    })

    return {
        success: true,
        message: "Project status updated successfully",
    }
}