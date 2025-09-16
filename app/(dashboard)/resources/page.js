import AddResourceForm from "@/components/add-resource-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getUser } from "@/lib/user"
import { getAllResources } from "@/lib/admin";
import { formatDateToYMD } from "@/utils/formUtils";

const ResourcesPage = async () => {
    const user = await getUser();
    const resources = await getAllResources();
    return (
        <div className='p-2 md:p-4'>
            <h1 className="text-2xl font-bold mb-4">Resources</h1>

            <Tabs defaultValue="all" className="w-full">
                {/* --- Tabs --- */}
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-red data-[state=active]:text-white"
                    >
                        All Resources
                    </TabsTrigger>
                    {user?.role === 'superadmin' && <TabsTrigger
                        value="add"
                        className="data-[state=active]:bg-red data-[state=active]:text-white"
                    >
                        Add Resources
                    </TabsTrigger>}
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    {resources.length === 0 && <p className="p-4 text-center">No Resources.</p>}
                    <div className="grid md:grid-cols-3 gap-4">
                        {resources.length > 0 && resources.map((resource) => (
                            <Card key={resource?._id} className="rounded-2xl shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">{resource?.title ?? ""}</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Date: {formatDateToYMD(resource?.createdAt)}</p>

                                    <a
                                        href={resource?.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red underline text-sm"
                                    >
                                        View / Download
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="add" className="mt-4">
                    <AddResourceForm />
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default ResourcesPage