import Container from "@/components/dashboardComponents/Container"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllCompletedProjects, getAllCompletedUserProjects } from "@/lib/projects";
import { getUser } from "@/lib/user";
import { camelToNormal, capitalizeFirst } from "@/utils/formUtils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";


const CompletedProjectsPage = async () => {
    const user = await getUser();
    let projects;

    if (user?.role === 'superadmin') {
        projects = await getAllCompletedProjects();
    } else if (user?.role === 'user') {
        projects = await getAllCompletedUserProjects();
    } else {
        notFound();
    }
    return (
        <Container className={'bg-white p-4 rounded-lg'}>
            <h1 className="text-xl font-medium">Completed Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4">
                <Suspense fallback={<p>Loading...</p>}>
                    {projects?.length === 0 && <p className="text-center p-6">No completed projects found.</p>}
                    {projects?.length > 0 && projects?.map(project => (
                        <div key={project._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <Badge variant={"secondary"} className={'mb-2'}>{camelToNormal(project.service)}</Badge>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.projectTitle}</h5>
                            <p className="mb-3 font-medium">By: {project?.createdBy?.companyName ?? ''}</p>
                            <p className="mb-3 font-medium text-red animate-pulse">• {capitalizeFirst(project?.status) || ""}</p>
                            <Link href={`/projects/${project?._id}`}><Button variant={"default"}>Project Details</Button></Link>
                        </div>
                    ))}
                </Suspense>
            </div>
        </Container>
    )
}

export default CompletedProjectsPage