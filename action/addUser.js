'use server'

import { generateAcceptEmailTemplate } from '@/htmlemailtemplates/emailTemplates';
import { connectDB } from '@/lib/mongodb';
import PendingUser from '@/models/PendingUser';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';

export async function addUser(prevState, formData) {
    const userId = formData.get('userId');

    try {

        await connectDB();
        const user = await PendingUser.findById(userId);
        if (!user) {
            return { err: "User not found" };
        }

        const userData = user.toObject();
        delete userData._id;


        // Add user to the database (assuming you have a User model)

        await User.create(userData);


        await PendingUser.findByIdAndDelete(userId);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: String(process.env.SMTP_USER),
                pass: String(process.env.SMTP_PASS)
            }
        })
        const html = generateAcceptEmailTemplate();

        await transporter.sendMail({
            from: `portal@stratital.com`,
            to: 'portal@stratital.com',
            subject: "Partnership Application Update – Accepted",
            html,
        })

        revalidatePath('/admin', "layout");

        return {
            success: true
        }
    } catch (error) {
        return { err: "Failed to add user" };
    }
}