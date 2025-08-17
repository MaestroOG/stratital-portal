"use server";

import { redirect } from "next/navigation";
import crypto from "crypto";
import { cookies } from "next/headers";
import { hashPassword, isValidEmail, validateABN } from "@/utils/validatorFns";
import PendingUser from "@/models/PendingUser";
import { connectDB } from "@/lib/mongodb";
import nodemailer from "nodemailer";

const userInfo = {
    email: "chris@straightupdigital.com.au",
    password: "testpass123"
}

const userInfo2 = {
    email: 'waqas@novaprotocols.com',
    password: 'testpass123',
}

const userInfo2ToSet = {
    email: "waqas@novaprotocols.com",
    name: "Waqas",
    agency: "Nova Protocols",
    role: 'customer',
    avatar: '/avatar.jpeg'
}

const userInfoToSet = {
    email: "chris@stratital.com",
    name: "Chris Bindley",
    agency: "Straight Up Digital",
    role: 'superadmin',
    avatar: '/avatar.jpeg'
}

export const LoginUser = async (prevState, formData) => {
    const email = formData.get("email").toString().trim();
    const password = formData.get("password").toString().trim();

    if (!email || !email.includes('@') || password.trim().length === 0) {
        return {
            err: "Invalid Credentials"
        }
    }

    if (email === userInfo.email && password === userInfo.password) {
        const token = crypto.randomBytes(32).toString("hex");

        (await cookies()).set({
            name: "authToken",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV || 'production',
            maxAge: 60 * 60 * 24 * 7
        });

        (await cookies()).set("user", JSON.stringify(userInfoToSet), {
            httpOnly: false,
            secure: true,
            path: '/'
        });

        redirect('/')
    } else if (email === userInfo2.email && password === userInfo2.password) {
        const token = crypto.randomBytes(32).toString("hex");

        (await cookies()).set({
            name: "authToken",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV || 'production',
            maxAge: 60 * 60 * 24 * 7
        });

        (await cookies()).set("user", JSON.stringify(userInfo2ToSet), {
            httpOnly: false,
            secure: true,
            path: '/'
        });

        redirect('/')
    }
    else {
        return {
            err: "Invalid Credentials"
        }
    }
}


export const SignUpUser = async (prevState, formData) => {
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";
    const name = formData.get("name")?.toString().trim() || "";
    const position = formData.get("position")?.toString().trim() || "";
    const phoneNum = formData.get("phoneNum")?.toString().trim() || "";
    const contactEmail = formData.get("contactEmail")?.toString().trim() || "";
    const companyName = formData.get("companyName")?.toString().trim() || "";
    const abn = formData.get("abn")?.toString().trim() || "";
    const companyWebsite = formData.get("companyWebsite")?.toString().trim() || "";
    const businessAddress = formData.get("businessAddress")?.toString().trim() || "";
    const yearsInBiz = formData.get("yearsInBiz")?.toString().trim() || "";
    const numOfActiveClients = formData.get("numOfActiveClients")?.toString().trim() || "";
    const socialMediaLinks = formData.get("socialMediaLinks")?.toString().trim() || "";

    // Radio groups (only one selected)
    const companyStructure = formData.get("companyStructure")?.toString() || "";
    const serviceModel = formData.get("serviceModel")?.toString() || "";
    const isUsingWhiteLabelProvider = formData.get("isUsingWhiteLabelProvider")?.toString() || "";

    const primaryServices = formData.get("primaryServices")?.toString().trim() || "";
    const industriesWorkWith = formData.get("industriesWorkWith")?.toString().trim() || "";
    const regionsServe = formData.get("regionsServe")?.toString().trim() || "";
    const monthlyProjectVolume = formData.get("monthlyProjectVolume")?.toString().trim() || "";
    const challengeDetail = formData.get("challengeDetail")?.toString().trim() || "";

    // Checkbox (null if unchecked)
    const masterServiceAgreement = formData.get("master-service-agreement") === "on";


    // Validations

    if (!isValidEmail(email) || password.length < 8 || !name || !position || !phoneNum || !contactEmail || !companyName || !abn || !validateABN(abn) || !companyWebsite || !businessAddress || !yearsInBiz || !numOfActiveClients || !numOfActiveClients || !socialMediaLinks || !primaryServices || !industriesWorkWith || !regionsServe || !monthlyProjectVolume || !challengeDetail || !masterServiceAgreement || masterServiceAgreement === null) {
        return {
            err: "Please fill the form correctly."
        }
    }


    // Password Hashing

    const hashedPassword = await hashPassword(password);


    // DB Insertion

    await connectDB();

    const pendingUser = await PendingUser.create({
        email,
        password: hashedPassword,
        name,
        position,
        phoneNum,
        contactEmail,
        companyName,
        abn,
        companyWebsite,
        businessAddress,
        yearsInBiz,
        numOfActiveClients,
        socialMediaLinks,
        companyStructure,
        primaryServices,
        industriesWorkWith,
        regionsServe,
        serviceModel,
        monthlyProjectVolume,
        isUsingWhiteLabelProvider,
        challengeDetail,
        role: "user"
    })


    // Email Sending
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: String(process.env.SMTP_USER),
                pass: String(process.env.SMTP_PASS)
            },
        });

        const html = `<h2>New User Registration</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td><b>First Name</b></td><td>${name}</td></tr>
        <tr><td><b>Email</b></td><td>${email}</td></tr>
        <tr><td><b>Phone</b></td><td>${phoneNum}</td></tr>
        <tr><td><b>Business Name</b></td><td>${companyName}</td></tr>
        <tr><td><b>Business Website</b></td><td>${companyWebsite}</td></tr>
      </table>
      <div style="margin-top: 40px; text-align: center; font-size: 14px; color: #666;">
          <p>Or go to the <a target="_blank" href="https://stratital-portal.vercel.app/" style="color:#4CAF50; text-decoration:none;">Portal</a> to manage this registration.</p>
        </div>
    `;

        await transporter.sendMail({
            from: `Client Portal - Stratital`,
            to: ['muneeb@novaprotocols.com', "nabeel@novaprotocols.com"],
            subject: "New User Application – Review Required",
            html,
        })

        console.log(pendingUser)
        return {
            success: true
        }

    } catch (error) {
        return {
            err: error.message
        }
    }

}

export const signOutUser = async (prevState, formData) => {
    (await cookies()).delete("authToken");
    (await cookies()).delete("user");
    redirect("/login");
}