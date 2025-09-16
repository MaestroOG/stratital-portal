"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const EditUserDetailForm = ({ user }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        position: user.position,
        companyName: user.companyName,
        email: user.email,
        phoneNum: user.phoneNum,
        contactEmail: user.contactEmail,
        companyWebsite: user.companyWebsite,
        businessAddress: user.businessAddress,
        abn: user.abn,
        yearsInBiz: user.yearsInBiz,
        numOfActiveClients: user.numOfActiveClients,
        primaryServices: user.primaryServices,
        industriesWorkWith: user.industriesWorkWith,
        regionsServe: user.regionsServe,
        monthlyProjectVolume: user.monthlyProjectVolume,
        challengeDetail: user.challengeDetail,
        socialMediaLinks: user.socialMediaLinks,
    })

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Updated user details:", formData)
        // TODO: send updated data to backend via API or server action
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-8 mt-4">
                {/* Basic Info */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='grid gap-2'>
                        <Label>Name</Label>
                        <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Position</Label>
                        <Input value={formData.position} onChange={(e) => handleChange("position", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Company Name</Label>
                        <Input value={formData.companyName} onChange={(e) => handleChange("companyName", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Email</Label>
                        <Input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Phone Number</Label>
                        <Input value={formData.phoneNum} onChange={(e) => handleChange("phoneNum", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Contact Email</Label>
                        <Input type="email" value={formData.contactEmail} onChange={(e) => handleChange("contactEmail", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Website</Label>
                        <Input value={formData.companyWebsite} onChange={(e) => handleChange("companyWebsite", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Business Address</Label>
                        <Input value={formData.businessAddress} onChange={(e) => handleChange("businessAddress", e.target.value)} />
                    </div>
                </section>

                {/* Company Details */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='grid gap-2'>
                        <Label>ABN</Label>
                        <Input value={formData.abn} onChange={(e) => handleChange("abn", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Years in Business</Label>
                        <Input value={formData.yearsInBiz} onChange={(e) => handleChange("yearsInBiz", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Active Clients</Label>
                        <Input value={formData.numOfActiveClients} onChange={(e) => handleChange("numOfActiveClients", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Primary Services</Label>
                        <Input value={formData.primaryServices} onChange={(e) => handleChange("primaryServices", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Industries</Label>
                        <Input value={formData.industriesWorkWith} onChange={(e) => handleChange("industriesWorkWith", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Regions</Label>
                        <Input value={formData.regionsServe} onChange={(e) => handleChange("regionsServe", e.target.value)} />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Monthly Projects</Label>
                        <Input value={formData.monthlyProjectVolume} onChange={(e) => handleChange("monthlyProjectVolume", e.target.value)} />
                    </div>
                </section>

                {/* Business Challenge */}
                <section className='grid gap-2'>
                    <Label>Business Challenge</Label>
                    <Textarea
                        value={formData.challengeDetail}
                        onChange={(e) => handleChange("challengeDetail", e.target.value)}
                    />
                </section>

                {/* Social Media */}
                <section className='grid gap-2'>
                    <Label>Social Media Links (comma separated)</Label>
                    <Input
                        value={formData.socialMediaLinks.join(", ")}
                        onChange={(e) => handleChange("socialMediaLinks", e.target.value.split(",").map((s) => s.trim()))}
                    />
                </section>

                <Button type="submit" className="w-full">Save Changes</Button>
            </form>
        </>
    )
}

export default EditUserDetailForm