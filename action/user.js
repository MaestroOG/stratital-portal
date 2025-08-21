"use server";

import { redirect } from "next/navigation";
import crypto from "crypto";
import { cookies } from "next/headers";
import { comparePassword, hashPassword, isValidEmail, validateABN } from "@/utils/validatorFns";
import PendingUser from "@/models/PendingUser";
import { connectDB } from "@/lib/mongodb";
import nodemailer from "nodemailer";
import { generatePartnershipEmailTemplate } from "@/htmlemailtemplates/emailTemplates";
import User from "@/models/User";

const superAdminCredentials = {
  email: String(process.env.SUPERADMIN_EMAIL) || "",
  password: String(process.env.SUPERADMIN_PASSWORD) || "",
  name: String(process.env.SUPERADMIN_NAME) || "",
  agency: String(process.env.SUPERADMIN_AGENCY) || "",
  role: String(process.env.SUPERADMIN_ROLE) || "superadmin",
  avatar: String(process.env.SUPERADMIN_AVATAR) || "/avatar.jpeg",
  _id: '507f1f77bcf86cd799439011'
}

export const LoginUser = async (prevState, formData) => {
  const email = formData.get("email").toString().trim();
  const password = formData.get("password").toString().trim();

  if (!email || !email.includes('@') || password.trim().length === 0) {
    return {
      err: "Invalid Credentials"
    }
  }

  if (email === superAdminCredentials.email && password === superAdminCredentials.password) {
    const token = crypto.randomBytes(32).toString("hex");

    (await cookies()).set({
      name: "authToken",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV || 'production',
      maxAge: 60 * 60 * 24 * 7
    });

    (await cookies()).set("user", JSON.stringify(superAdminCredentials), {
      httpOnly: false,
      secure: true,
      path: '/'
    });

    redirect('/')
  } else {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return {
        err: "User not found"
      }
    }

    const isPasswordValid = await comparePassword(password, user?.password);

    if (!isPasswordValid) {
      return {
        err: "Invalid Credentials"
      }
    }

    const token = crypto.randomBytes(32).toString("hex");

    (await cookies()).set({
      name: "authToken",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV || 'production',
      maxAge: 60 * 60 * 24 * 7
    });

    (await cookies()).set("user", JSON.stringify(user), {
      httpOnly: false,
      secure: true,
      path: '/'
    });

    redirect('/');

  }
}


export const SignUpUser = async (formValues, prevState, formData) => {
  const { email,
    password,
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
    ['master-service-agreement']: masterServiceAgreement } = formValues;


  // Validations

  if (!isValidEmail(email) || password.length < 6 || !name) {
    return {
      err: "Please fill the form correctly."
    }
  }


  // Password Hashing

  const hashedPassword = await hashPassword(password);


  // DB Insertion

  await connectDB();

  await PendingUser.create({
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

    const html = generatePartnershipEmailTemplate(email, monthlyProjectVolume, name, position, phoneNum, contactEmail, companyName, abn, companyWebsite, businessAddress, yearsInBiz, numOfActiveClients, companyStructure, serviceModel, isUsingWhiteLabelProvider, primaryServices, industriesWorkWith, regionsServe, challengeDetail);

    await transporter.sendMail({
      from: `portal@stratital.com`,
      to: ['portal@stratital.com', email],
      subject: "New User Application – Review Required",
      html,
    })

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