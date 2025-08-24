import Container from '@/components/dashboardComponents/Container'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllProjects } from '@/lib/projects'
import { camelToNormal, capitalizeFirst } from '@/utils/formUtils';
import Link from 'next/link';

const AllProjectsPage = async () => {
    const allProjects = await getAllProjects();
    return (
        <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
            <h1 className='text-2xl md:text-4xl'>All Projects</h1>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-4 gap-4'>
                {allProjects?.map(project => (
                    <>
                        <div key={project._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <Badge variant={"secondary"} className={'mb-2'}>{camelToNormal(project.service)}</Badge>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.projectTitle}</h5>
                            <p className="mb-3 font-medium text-red animate-pulse">• {capitalizeFirst(project?.status) || ""}</p>
                            <p className="mb-3 font-medium">Created By: {project?.createdBy?.name}</p>
                            <Link href={`/projects/${project?._id}`}><Button variant={"default"}>Project Details</Button></Link>
                        </div>
                    </>
                ))}
            </div>
        </Container>
    )
}

export default AllProjectsPage