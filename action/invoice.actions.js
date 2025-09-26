'use server';

import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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


export async function deleteInvoice(prevState, formData) {
    const invoiceId = formData.get("invoiceId");

    await connectDB();
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (deletedInvoice) {
        revalidatePath("/", "layout");
        redirect("/invoices");
    }
}

export async function editInvoice(prevState, formData) {
    const status = formData.get('status')?.trim();
    const details = formData.get('details')?.trim();
    const invoiceId = formData.get('invoiceId');

    const updateObject = {};

    if (status) {
        updateObject.status = status;
    }

    if (details) {
        updateObject.detail = details;
    }

    await connectDB();

    const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, { $set: updateObject });
    if (!updatedInvoice) {
        return {
            success: false,
            message: "Resource not found",
        };
    }

    revalidatePath('/', 'layout')

    return {
        success: true,
        message: "Resource added successfully"
    }
}