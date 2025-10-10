import Container from '@/components/dashboardComponents/Container'
import ProjectStatusForms from '@/components/project-status-forms'
import NoteBox from '@/components/superadminComponents/NoteBox'
import { getNotesByProjectId, getProjectById, getUnreadNotesByProject } from '@/lib/projects'
import { getUser } from '@/lib/user'
import { camelToNormal, capitalizeFirst } from '@/utils/formUtils'
import ProjectNotesList from '@/components/ProjectNotesList'
import ProjectDeleteForm from '@/components/project-delete-form'
import { notFound } from 'next/navigation'
import FilterCommentsForm from '@/components/filter-comments-form'
import { Suspense } from 'react'


export const metadata = {
    title: 'Project Details',
    description: 'View details of a specific project',
}

const ProjectDetailPage = async ({ params, searchParams }) => {
    const user = await getUser();
    const { id } = await params;
    const projectDetails = await getProjectById(id);;
    const service = camelToNormal(projectDetails?.service);
    const status = capitalizeFirst(projectDetails?.status);
    const { filter } = searchParams;

    let notes;

    if (filter === "unread") {
        if (!user?._id) {
            notes = [];
        } else {
            const { notes: unreadNotes } = await getUnreadNotesByProject(id, user?._id);
            notes = unreadNotes;
        }
    } else {
        const { notes: allNotes } = await getNotesByProjectId(id, 1, 10);
        notes = allNotes;
    }
    const isUnread = user ? notes?.some(note => !(note?.readBy ?? []).includes(user._id)) : false;


    if (!projectDetails) {
        notFound();
    }

    return (
        <>
            <Container className={'bg-white p-4 overflow-x-hidden'}>
                <div className='flex md:flex-row flex-col items-start md:items-end justify-between'>
                    <div>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-2xl md:text-4xl font-bold whitespace-nowrap'>{projectDetails?.projectTitle}</h1>
                            {user?.role === 'superadmin' && <ProjectDeleteForm id={id} />}
                        </div>
                        <h3 className='mt-2'>{service} by {projectDetails?.createdBy?.companyName ?? ""}</h3>
                        {projectDetails?.byAdmin ? <p className='text-sm mt-2'>Created By Admin</p> : ''}
                    </div>
                    <div className='flex items-start md:items-center md:flex-row flex-col gap-2 md:gap-4'>
                        <p className='text-red font-medium animate-pulse whitespace-nowrap'>• {status}</p>
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
                    <FilterCommentsForm />
                </div>
                <NoteBox id={id} />
                <div className="mt-6">
                    <ul>
                        {notes?.length > 0 ? (
                            <ProjectNotesList
                                user={user}
                                isUnread={isUnread}
                                projectId={id}
                                initialNotes={notes}
                            />) : (
                            <p className="p-4 text-center">No Comments For Now.</p>
                        )}
                    </ul>
                </div>
            </Container>
        </>
    )
}

export default ProjectDetailPage