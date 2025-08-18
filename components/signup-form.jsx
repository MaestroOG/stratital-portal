"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { SignUpUser } from "@/action/user";
import { useActionState, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image";

export function SignUpForm({
    className,
    ...props
}) {

    const [message, formAction, isPending] = useActionState(SignUpUser, { err: "", success: false });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (message?.success) {
            setOpen(true)
        }
    }, [message])
    return (
        <>
            <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your information below to create your account
                    </p>
                </div>
                <div className="grid gap-6">
                    {/* Main Credentials */}


                    <div className="grid gap-3">
                        <Label htmlFor="email" className={'text-heading'}>Email</Label>
                        <Input id="email" type="email" name="email" required className={'border border-gray-300'} />
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center">
                            <Label htmlFor="password" className={'text-heading'}>Password</Label>
                        </div>
                        <Input id="password" name="password" type="password" required className={'border border-gray-300'} />
                    </div>

                    {/* Contact Information */}

                    <div className="grid gap-3">
                        <Label htmlFor="name" className={'text-heading'}>Primary Contact Name</Label>
                        <Input id="name" type="text" name="name" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="position" className={'text-heading'}>Position/Title</Label>
                        <Input id="position" type="text" name="position" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="phoneNum" className={'text-heading'}>Phone Number</Label>
                        <Input id="phoneNum" type="text" name="phoneNum" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="contactEmail" className={'text-heading'}>Accounts Contact Email</Label>
                        <Input id="contactEmail" type="email" name="contactEmail" required className={'border border-gray-300'} />
                    </div>

                    {/* Agency Details */}

                    <div className="grid gap-3">
                        <Label htmlFor="companyName" className={'text-heading'}>Agency Name</Label>
                        <Input id="companyName" type="text" name="companyName" className={'border border-gray-300'} required />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="abn" className={'text-heading'}>ABN (Austrailian Business Number)</Label>
                        <Input id="abn" type="number" name="abn" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="companyWebsite" className={'text-heading'}>Company Website</Label>
                        <Input id="companyWebsite" type="url" name="companyWebsite" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="businessAddress" className={'text-heading'}>Business Address</Label>
                        <Input id="businessAddress" type="text" name="businessAddress" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="yearsInBiz" className={'text-heading'}>Years in Business</Label>
                        <Input id="yearsInBiz" type="number" name="yearsInBiz" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="numOfActiveClients" className={'text-heading'}>Approximate number of active clients</Label>
                        <Input id="numOfActiveClients" type="number" name="numOfActiveClients" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="socialMediaLinks" className={'text-heading'}>Social Media Links (if applicable)</Label>
                        <Textarea id="socialMediaLinks" name="socialMediaLinks" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label className={'text-heading'}>Company Structure</Label>
                        <RadioGroup name="companyStructure" defaultValue="sole-trader">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sole-trader" id="sole-trader" />
                                <Label className={'font-normal'} htmlFor="sole-trader">Sole Trader</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="partner-ship" id="partner-ship" />
                                <Label className={'font-normal'} htmlFor="partner-ship">Partnership</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pty-ltd" id="pty-ltd" />
                                <Label className={'font-normal'} htmlFor="pty-ltd">Pty Ltd.</Label>
                            </div>
                        </RadioGroup>
                    </div>


                    {/* Market and Services Information */}

                    <div className="grid gap-3">
                        <Label htmlFor="primaryServices" className={'text-heading'}>Primary Services Your Agency Offers</Label>
                        <Textarea id="primaryServices" name="primaryServices" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="industriesWorkWith" className={'text-heading'}>Industries You Commonly Work With</Label>
                        <Textarea id="industriesWorkWith" name="industriesWorkWith" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="regionsServe" className={'text-heading'}>Regions You Serve</Label>
                        <Textarea id="regionsServe" name="regionsServe" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label className={'text-heading'}>Typical Service Model</Label>
                        <RadioGroup name="serviceModel" defaultValue="retainer-based">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="retainer-based" id="retainer-based" />
                                <Label className={'font-normal'} htmlFor="retainer-based">Retainer Based</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="project-based" id="project-based" />
                                <Label className={'font-normal'} htmlFor="project-based">Project Based</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="both" id="both" />
                                <Label className={'font-normal'} htmlFor="both">Both</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="monthlyProjectVolume" className={'text-heading'}>Anticipated Monthly Project Volume for Stratital (Optional)</Label>
                        <Input id="monthlyProjectVolume" type="text" name="monthlyProjectVolume" required className={'border border-gray-300'} />
                    </div>

                    <div className="grid gap-3">
                        <Label className={'text-heading'}>Do you currently use any other white label providers?</Label>
                        <RadioGroup name="isUsingWhiteLabelProvider" defaultValue="yes">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label className={'font-normal'} htmlFor="yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label className={'font-normal'} htmlFor="no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="challengeDetail" className={'text-heading'}>If yes, what challenges have you faced?</Label>
                        <Textarea id="challengeDetail" name="challengeDetail" required className={'border border-gray-300'} />
                    </div>

                    <div className="flex gap-3">
                        <Checkbox id="master-service-agreement" name="master-service-agreement" />
                        <Label htmlFor="master-service-agreement" className={'text-heading'}>I agree to the Stratital<Link href={'https://stratital.com/stratital-master-services-agreement/'} target="_blank" className="text-red underline">Master Services Agreement</Link></Label>
                    </div>


                    <Button disabled={isPending} type="submit" className="w-full bg-dark-blue cursor-pointer hover:bg-dark-blue">
                        Apply to become a partner
                    </Button>


                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader className={'flex items-center justify-center flex-col gap-3'}>
                                <DialogTitle><Image width={100} height={100} src={'/check-circle.svg'} alt="check-circle" /></DialogTitle>
                                <DialogDescription className={'text-lg'}>
                                    Thanks for signing up! Your request email has been sent to the admin team. You’ll be notified once it’s reviewed.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                {message?.err && <div className="text-center text-red font-bold text-xl">{message?.err}</div>}
                <div className="text-center text-sm">
                    Already a user?{" "}
                    <Link href="/login" className="underline underline-offset-4">
                        Log In
                    </Link>
                </div>
            </form>

        </>
    );
}
