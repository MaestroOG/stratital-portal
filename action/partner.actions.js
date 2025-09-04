'use server'

import { generatePartnerShipEndEmail } from "@/htmlemailtemplates/partnerEmailTemplates";
import { getUserById } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import DeletedUser from "@/models/DeletedUser";
import User from "@/models/User";
import { getTodayDate } from "@/utils/formUtils";
import { createTransporter } from "@/utils/transporterFns";
import { revalidatePath } from "next/cache";

export async function deletePartner(prevState, formData) {
    const userId = formData.get('userId');

    const sendFinalEmail = formData.get('sendFinalEmail')
    const todaysDate = getTodayDate();
    await connectDB();

    const user = await getUserById(userId);
    const userData = user.toObject();
    delete userData._id;

    await DeletedUser.create(userData)

    if (sendFinalEmail) {
        const html = generatePartnerShipEndEmail(user?.email, user?.name, user?.companyName, todaysDate, 'support@stratital.com')
        const transporter = await createTransporter();
        await transporter.sendMail({
            from: `admin@stratital.com`,
            to: [user?.email, 'portal@stratital.com'],
            subject: "Partnership Update - Ended",
            html,
        })
    }

    await User.findByIdAndDelete(userId);

    revalidatePath('/', "layout");

    return {
        success: true,
        message: "Deleted Partner Successfully"
    }
}