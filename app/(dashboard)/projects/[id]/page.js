import Container from '@/components/dashboardComponents/Container'
import ProjectStatusForms from '@/components/project-status-forms'
import NoteBox from '@/components/superadminComponents/NoteBox'
import { Button } from '@/components/ui/button'
import { getNotesByProjectId, getProjectById } from '@/lib/projects'
import { getUser } from '@/lib/user'
import { camelToNormal, capitalizeFirst, formatDateToYMD, timeAgo } from '@/utils/formUtils'

export const metadata = {
    title: 'Project Details',
    description: 'View details of a specific project',
}

const ProjectDetailPage = async ({ params }) => {
    const user = await getUser();
    const { id } = await params;
    const projectDetails = await getProjectById(id);
    const projectNotes = await getNotesByProjectId(id);
    const service = camelToNormal(projectDetails?.service);
    const status = capitalizeFirst(projectDetails?.status);


    return (
        <>
            <Container className={'bg-white p-4'}>
                <div className='flex md:flex-row flex-col items-start md:items-end justify-between'>
                    <div>
                        <h1 className='text-2xl md:text-4xl font-bold whitespace-nowrap'>{projectDetails?.projectTitle}</h1>
                        <h3 className='mt-2'>{service}</h3>
                    </div>
                    <div className='flex items-start md:items-center md:flex-row flex-col gap-2 md:gap-4'>
                        <p className='text-red font-medium animate-pulse'>• {status}</p>
                        {user?.role === 'superadmin' && <ProjectStatusForms projectId={id} />}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 mt-6'>
                    <div className='flex flex-col gap-4'>
                        {Object.keys(projectDetails?.fields).map(key => (
                            <p key={key}>{camelToNormal(key)}</p>
                        ))}
                    </div>
                    <div className='flex flex-col gap-4'>
                        {Object.values(projectDetails?.fields).map(value => (
                            <p key={value} className='font-bold text-heading'>{camelToNormal(value)}</p>
                        ))}
                    </div>
                </div>
            </Container>

            <Container className={'bg-white p-4 mt-6'}>
                <div className='flex items-end justify-between'>
                    <h1 className='text-4xl font-bold'>Comments</h1>
                </div>
                <div className='mt-6'>
                    <ul>
                        {projectNotes?.length === 0 && (
                            <p className='font-medium text-center p-6'>No Comments For Now</p>
                        )}
                        {projectNotes?.map((note, index) => (
                            <li key={index} className='mb-4'>
                                <p className='text-sm text-gray-600'>{formatDateToYMD(note?.createdAt)} by {note?.createdBy === null ? 'Stratital Team' : note?.createdBy?.name} - {timeAgo(note?.createdAt)}</p>
                                <p className='text-lg font-medium'>{note?.note}</p>
                            </li>
                        ))}
                    </ul>
                    <NoteBox id={params?.id} />
                </div>
            </Container>
        </>
    )
}

export default ProjectDetailPage