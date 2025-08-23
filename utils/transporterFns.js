import nodemailer from 'nodemailer'

export async function createTransporter() {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    return transporter;
}