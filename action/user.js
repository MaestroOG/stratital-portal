"use server";

import { redirect } from "next/navigation";
import crypto from "crypto";
import { cookies } from "next/headers";

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


export const signOutUser = async (prevState, formData) => {
    (await cookies()).delete("authToken");
    (await cookies()).delete("user");
    redirect("/login");
}