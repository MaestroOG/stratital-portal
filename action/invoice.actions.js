'use server';

import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { revalidatePath } from "next/cache";

export async function createInvoice(prevState, formData) {
    const partner = formData.get("partner");
    const detail = formData.get("details");
    const status = formData.get("status")

    try {
        await connectDB();
        await Invoice.create({
            status,
            partner,
            detail
        })

        revalidatePath("/", "layout")

        return {
            success: true,
            message: "Invoice successfully created."
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Failed to create invoice."
        }
    }

}