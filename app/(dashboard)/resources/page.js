import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUser } from "@/lib/user"

const ResourcesPage = async () => {
    const user = await getUser();
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

            </Tabs>
        </div>
    )
}

export default ResourcesPage