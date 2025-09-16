"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const InvoicesPage = () => {
    const initialInvoices = [
        { id: "INV-001", customer: "John Doe", amount: 250, date: "2025-09-10", status: "Paid", projectCount: 3 },
        { id: "INV-002", customer: "Jane Smith", amount: 500, date: "2025-09-12", status: "Pending", projectCount: 3 },
        { id: "INV-003", customer: "Acme Corp", amount: 1200, date: "2025-09-14", status: "Pending", projectCount: 3 },
    ]
    const [invoices, setInvoices] = useState(initialInvoices)
    const [formData, setFormData] = useState({
        customer: "",
        amount: "",
        date: "",
        status: "Pending",
    })

    const handleAddInvoice = (e) => {
        e.preventDefault()
        const newInvoice = {
            id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
            customer: formData.customer,
            amount: Number(formData.amount),
            date: formData.date,
            status: formData.status,
        }
        setInvoices([...invoices, newInvoice])
        setFormData({ customer: "", amount: "", date: "", status: "Pending" })
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Invoices</h1>

            <Tabs defaultValue="all" className="w-full">
                {/* --- Tabs --- */}
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-red data-[state=active]:text-white"
                    >
                        All Invoices
                    </TabsTrigger>
                    <TabsTrigger
                        value="add"
                        className="data-[state=active]:bg-red data-[state=active]:text-white"
                    >
                        Add Invoice
                    </TabsTrigger>
                </TabsList>

                {/* --- All Invoices Tab --- */}
                <TabsContent value="all" className="mt-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        {invoices.map((invoice) => (
                            <Card key={invoice.id} className="rounded-2xl shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">{invoice.id}</CardTitle>
                                    <Badge
                                        variant={
                                            invoice.status === "Paid"
                                                ? "default"
                                                : invoice.status === "Pending"
                                                    ? "secondary"
                                                    : "destructive"
                                        }
                                    >
                                        {invoice.status}
                                    </Badge>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Partner: {invoice.customer}</p>
                                    <p className="text-sm text-muted-foreground">Project Count: {invoice.projectCount}</p>
                                    <p className="text-sm text-muted-foreground">Date: {invoice.date}</p>
                                    <p className="text-base font-semibold">${invoice.amount}</p>
                                </CardContent>

                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={`/invoices/${invoice.id}`}>View Details</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* --- Add Invoice Tab --- */}
                <TabsContent value="add" className="mt-4">
                    <Card className="rounded-2xl shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg">New Invoice</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddInvoice} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="customer">Customer</Label>
                                    <Input
                                        id="customer"
                                        value={formData.customer}
                                        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Amount ($)</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Status</Label>
                                    <Select>
                                        <SelectTrigger className={'w-full'}>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Paid">Paid</SelectItem>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button type="submit" className="w-full">Add Invoice</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default InvoicesPage