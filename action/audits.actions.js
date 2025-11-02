'use server';

import { generateAuditEmail } from "@/htmlemailtemplates/partnerEmailTemplates";
import { connectDB } from "@/lib/mongodb";
import { getUser } from "@/lib/user";
import User from "@/models/User";
import { cleanFormEntries, validateEntries } from "@/utils/formUtils";
import { createTransporter } from "@/utils/transporterFns";

export default async function createAudit(prevState, formData) {
    const user = await getUser();
    const service = formData.get("service");
    const auditTitle = formData.get("auditTitle");
    const partnerId = formData.get("partnerId");

    // Turn formData into a plain object, excluding service
    const entries = {};
    formData.forEach((value, key) => {
        if (key !== "service") {
            entries[key] = value;
        }
    });

    // Clean and validate entries
    const cleanedEntries = cleanFormEntries(entries);

    if (!cleanedEntries || !validateEntries(cleanedEntries)) {
        return {
            success: false,
            message: "Audit not created. Invalid form data.",
        };
    }

    try {
        const transporter = createTransporter();

        // Prepare email data
        const emailData = {
            companyName: user?.companyName || "N/A",
            auditTitle,
            service,
            fields: cleanedEntries
        };

        if (user?.role === 'user') {
            const html = generateAuditEmail(emailData);

            await transporter.sendMail({
                from: '"Stratital" <admin@stratital.com>',
                to: [user?.email, 'portal@stratital.com'],
                subject: "Audit Request - Stratital",
                html,
            });
        }

        if (user?.role === 'superadmin') {
            await connectDB();
            const auditForUser = await User.findById(partnerId);

            const html = generateAuditEmail({
                ...emailData,
                companyName: auditForUser?.companyName || "N/A"
            });

            await transporter.sendMail({
                from: '"Stratital" <admin@stratital.com>',
                to: [auditForUser?.email, 'portal@stratital.com'],
                subject: "Audit Request - Stratital",
                html,
            });
        }

        return {
            success: true,
            message: "Audit request successfully sent."
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Something went wrong while sending the audit request."
        };
    }
}
