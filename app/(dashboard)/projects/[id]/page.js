import Container from '@/components/dashboardComponents/Container'
import ProjectStatusForms from '@/components/project-status-forms'
import NoteBox from '@/components/superadminComponents/NoteBox'
import { Button } from '@/components/ui/button'
import { getNotesByProjectId, getProjectById } from '@/lib/projects'
import { getUser } from '@/lib/user'
import { camelToNormal, capitalizeFirst, formatDateToYMD, formatTo12HourTime, timeAgo } from '@/utils/formUtils'
import Linkify from 'linkify-react'
import Image from 'next/image'
import parse from 'html-react-parser';
import ProjectNotesList from '@/components/ProjectNotesList'

export const metadata = {
    title: 'Project Details',
    description: 'View details of a specific project',
}

const ProjectDetailPage = async ({ params }) => {
    const user = await getUser();
    const { id } = await params;
    const projectDetails = await getProjectById(id);;
    const service = camelToNormal(projectDetails?.service);
    const status = capitalizeFirst(projectDetails?.status);

    const { notes } = await getNotesByProjectId(id, 1, 10);


    return (
        <>
            <Container className={'bg-white p-4'}>
                <div className='flex md:flex-row flex-col items-start md:items-end justify-between'>
                    <div>
                        <h1 className='text-2xl md:text-4xl font-bold whitespace-nowrap'>{projectDetails?.projectTitle}</h1>
                        <h3 className='mt-2'>{service} by {projectDetails?.createdBy.companyName}</h3>
                    </div>
                    <div className='flex items-start md:items-center md:flex-row flex-col gap-2 md:gap-4'>
                        {projectDetails?.byAdmin ? <p className='text-sm'>Created By Admin</p> : ''}
                        <p className='text-red font-medium animate-pulse'>• {status}</p>
                        {user?.role === 'superadmin' && <ProjectStatusForms status={status} projectId={id} />}
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
                <NoteBox id={params?.id} />
                <div className='mt-6'>
                    <ul>
                        {notes.length > 0 ? <ProjectNotesList projectId={params.id} initialNotes={notes} /> : <p className='p-4 text-center'>No Comments For Now.</p>}
                    </ul>
                </div>
            </Container>
        </>
    )
}

export default ProjectDetailPage