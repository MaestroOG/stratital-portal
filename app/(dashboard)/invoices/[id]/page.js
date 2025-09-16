import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getInvoiceDetails } from "@/lib/invoice"
import parse from "html-react-parser";
import { formatDateToYMD } from "@/utils/formUtils";

const InvoiceDetail = async ({ params }) => {
    const { id } = await params

    // Example: Fetch invoice by ID here
    const invoice = await getInvoiceDetails(id);

    return (
        <div className="p-4">
            <Card className="rounded-2xl shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">INV-{invoice._id}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p>Partner: {invoice?.partner?.name}</p>
                    <p>Date: {formatDateToYMD(invoice?.createdAt)}</p>
                    <p>Status: {invoice?.status}</p>

                    <div className="mt-4">
                        <p>{parse(invoice?.detail)}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-4">
                <Button asChild variant="secondary">
                    <Link href="/invoices">← Back to Invoices</Link>
                </Button>
            </div>
        </div>
    )
}

export default InvoiceDetail