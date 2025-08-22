import { getUser } from '@/lib/user'
import Container from '@/components/dashboardComponents/Container';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Globe, Building2, MapPin, Link as LinkIcon } from "lucide-react";


const ProfilePage = async () => {
    const userDetail = await getUser();
    return (
        <Container className={'bg-white p-4 flex items-center justify-center'}>
            <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
                <CardHeader className="bg-red text-white rounded-t-2xl p-6">
                    <CardTitle className="text-2xl font-bold">
                        {userDetail?.name} <span className="text-sm font-light">({userDetail?.position})</span>
                    </CardTitle>
                    <p className="text-sm text-white opacity-90">{userDetail?.companyName}</p>
                </CardHeader>
                <CardContent className="p-6 grid gap-4">
                    {/* Contact Info */}
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Contact Information</h2>
                        <p className="flex items-center gap-2 text-gray-700"><Mail size={16} /> {userDetail.email}</p>
                        <p className="flex items-center gap-2 text-gray-700"><Phone size={16} /> {userDetail.phoneNum}</p>
                        <p className="flex items-center gap-2 text-gray-700"><Mail size={16} /> {userDetail.contactEmail}</p>
                        <p className="flex items-center gap-2 text-gray-700"><Globe size={16} /> <a href={userDetail.companyWebsite} target="_blank" className="text-blue-600 underline">Website</a></p>
                        <p className="flex items-center gap-2 text-gray-700"><MapPin size={16} /> {userDetail.businessAddress}</p>
                    </div>


                    {/* Company Details */}
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Company Details</h2>
                        <p><span className="font-semibold">ABN:</span> {userDetail.abn}</p>
                        <p><span className="font-semibold">Years in Business:</span> {userDetail.yearsInBiz}</p>
                        <p><span className="font-semibold">Active Clients:</span> {userDetail.numOfActiveClients}</p>
                        <p><span className="font-semibold">Structure:</span> {userDetail.companyStructure}</p>
                        <p><span className="font-semibold">Primary Services:</span> {userDetail.primaryServices}</p>
                        <p><span className="font-semibold">Industries:</span> {userDetail.industriesWorkWith}</p>
                        <p><span className="font-semibold">Regions:</span> {userDetail.regionsServe}</p>
                        <p><span className="font-semibold">Service Model:</span> {userDetail.serviceModel}</p>
                        <p><span className="font-semibold">Monthly Projects:</span> {userDetail.monthlyProjectVolume}</p>
                        <p><span className="font-semibold">Using White Label Provider:</span> {userDetail.isUsingWhiteLabelProvider}</p>
                    </div>


                    {/* Challenge */}
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Business Challenge</h2>
                        <p className="text-gray-700">{userDetail.challengeDetail}</p>
                    </div>


                    {/* Social Links */}
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Social Media</h2>
                        <div className="flex flex-wrap gap-3">
                            {userDetail.socialMediaLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-dark-blue rounded-full text-sm hover:bg-blue-200"
                                >
                                    <LinkIcon size={14} /> {link.split("//")[1]}
                                </a>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default ProfilePage