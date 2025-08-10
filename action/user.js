"use server";

import { redirect } from "next/navigation";

const userInfo = {
    email: "test@test.com",
    password: "testpass123"
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
        redirect('/')
    } else {
        return {
            err: "Invalid Credentials"
        }
    }
}