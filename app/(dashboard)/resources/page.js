import AddResourceForm from "@/components/add-resource-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getUser } from "@/lib/user"
import { getAllResources, getResourceCategories } from "@/lib/admin";
import { formatDateToYMD } from "@/utils/formUtils";
import ResourceDeletionForm from "@/components/resource-deletion-form";
import ResourceEditForm from "@/components/resource-edit-form";
import CreateResourceCategoryForm from "@/components/create-resource-category-form";
import ResourceFilterSelect from "@/components/resource-filter-select";

const ResourcesPage = async ({ searchParams }) => {
    const user = await getUser();
    let resources = await getAllResources();
    const categories = await getResourceCategories();
    const { filter } = await searchParams;

    console.log("Filter param:", filter);

    if (filter) {
        resources = resources.filter(resource =>
            resource.category.name.includes(filter)
        );
    }

    return (
        <div className='p-2 md:p-4'>
            <h1 className="text-2xl font-bold mb-4">Resources</h1>

            <Tabs defaultValue="all" className="w-full">
                {/* --- Tabs --- */}
                <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-red data-[state=active]:text-white"
                    >
                        All Resources
                    </TabsTrigger>
                    {user?.role === 'superadmin' && (
                        <>
                            <TabsTrigger
                                value="add"
                                className="data-[state=active]:bg-red data-[state=active]:text-white"
                            >
                                Add Resources
                            </TabsTrigger>
                            <TabsTrigger
                                value="category"
                                className="data-[state=active]:bg-red data-[state=active]:text-white"
                            >
                                Add Category
                            </TabsTrigger>
                        </>
                    )}
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    <div className="flex items-center justify-end">
                        <p className="text-sm text-muted-foreground mr-2">Total Resources: {resources.length}</p>
                        <ResourceFilterSelect categories={categories} />
                    </div>
                    {resources.length === 0 && <p className="p-4 text-center">No Resources.</p>}
                    <div className="grid md:grid-cols-3 gap-4">
                        {resources.length > 0 && resources.map((resource) => (
                            <Card key={resource?._id} className="rounded-2xl shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">{resource?.title ?? ""}</CardTitle>
                                    {user?.role === 'superadmin' && <div className="flex items-center gap-2">
                                        <ResourceDeletionForm resourceId={resource?._id} />
                                        <ResourceEditForm categories={categories} resource={resource} />
                                    </div>
                                    }
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Category: {resource?.category.name}</p>
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
                    <AddResourceForm categories={categories} />
                </TabsContent>

                <TabsContent value="category" className="mt-4">
                    <CreateResourceCategoryForm />
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default ResourcesPage