import Container from '@/components/dashboardComponents/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllUserProjects } from '@/lib/projects';
import { camelToNormal, capitalizeFirst } from '@/utils/formUtils';

import Link from 'next/link';

const AgencyProjects = async ({ searchParams }) => {
    const { agencyId } = await searchParams;
    const projects = await getAllUserProjects(agencyId)
    console.log(projects)
    return (
        <>
            <Container className={'bg-white px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">Agency Projects</h1>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-6'>
                    {projects?.map(project => (
                        <div key={project?._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <Badge variant={"secondary"} className={'mb-2'}>{camelToNormal(project?.service)}</Badge>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project?.projectTitle}</h5>
                            <p className="mb-3 font-medium text-red animate-pulse">• {capitalizeFirst(project?.status) || ""}</p>
                            <Link href={`/projects/${project?._id}`}><Button variant={"default"}>Project Details</Button></Link>
                        </div>
                    ))}
                </div>

            </Container>
        </>
    )
}

export default AgencyProjects