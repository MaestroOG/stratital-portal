'use server'

import { generatePartnerShipEndEmail } from "@/htmlemailtemplates/partnerEmailTemplates";
import { getUserById } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import { getUserFromDB } from "@/lib/user";
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
        const transporter = createTransporter();
        await transporter.sendMail({
            from: '"Stratital" <admin@stratital.com>',
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

export async function assignCredit(prevData, formData) {
    const partnerId = formData.get('partnerId');
    const creditValue = parseInt(formData.get('creditValue'));
    let finalSum = 0;

    try {
        await connectDB();

        const user = await getUserFromDB();

        const updatedCredit = await User.findByIdAndUpdate(partnerId, { $inc: { credit: creditValue } });

        if (!updatedCredit) {
            return {
                success: false,
                message: "Failed to assign credit"
            }
        }

        revalidatePath('/', 'layout');

        return {
            success: true,
            message: `Successfully assigned credit.`,
        }
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while assigning credit",
        }
    }
}