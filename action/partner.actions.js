'use server'

import { generatePartnerShipEndEmail } from "@/htmlemailtemplates/partnerEmailTemplates";
import { getUserById } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getTodayDate } from "@/utils/formUtils";
import { createTransporter } from "@/utils/transporterFns";
import { revalidatePath } from "next/cache";

export async function deletePartner(prevState, formData) {
    const userId = formData.get('userId');
    const todaysDate = getTodayDate();
    await connectDB();

    const user = await getUserById(userId);

    await User.findByIdAndDelete(userId);

    const transporter = await createTransporter();

    const html = generatePartnerShipEndEmail(user?.email, user?.name, user?.companyName, todaysDate, 'support@stratital.com')

    await transporter.sendMail({
        from: `stratital.portal@gmail.com`,
        to: user?.email,
        subject: "Partnership Status: Ended",
        html,
    })

    revalidatePath('/', "layout");

    return {
        success: true,
        message: "Deleted Partner Successfully"
    }
}