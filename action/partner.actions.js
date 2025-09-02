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

    revalidatePath('/', "layout");

    return {
        success: true,
        message: "Deleted Partner Successfully"
    }
}