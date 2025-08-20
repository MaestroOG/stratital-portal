import Container from '@/components/dashboardComponents/Container'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getProjectById } from '@/lib/projects'
import { getUser } from '@/lib/user'
import { camelToNormal, capitalizeFirst } from '@/utils/formUtils'

export const metadata = {
    title: 'Project Details',
    description: 'View details of a specific project',
}

const ProjectDetailPage = async ({ params }) => {
    const user = await getUser();
    const projectDetails = await getProjectById(params.id);
    const service = camelToNormal(projectDetails?.service);
    const status = capitalizeFirst(projectDetails?.status);

    const adminNotesList = [
        // Example admin notes, replace with actual data retrieval logic
        { note: "Initial review completed", date: "2023-10-01" },
        { note: "Client feedback received", date: "2023-10-05" },
        { note: "Final adjustments made", date: "2023-10-10" }
    ]

    return (
        <>
            <Container className={'bg-white p-4'}>
                <div className='flex items-end justify-between'>
                    <div>
                        <h1 className='text-4xl font-bold'>{projectDetails?.projectTitle}</h1>
                        <h3 className='mt-2'>{service}</h3>
                    </div>
                    <p className='text-red font-medium animate-pulse'>• {status}</p>
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
                    <h1 className='text-4xl font-bold'>Admin Notes</h1>
                </div>
                <div className='mt-6'>
                    <ul>
                        {adminNotesList?.map((note, index) => (
                            <li key={index} className='mb-4'>
                                <p className='text-sm text-gray-600'>{note.date}</p>
                                <p className='text-lg font-medium'>{note.note}</p>
                            </li>
                        ))}
                    </ul>

                    {user?.role === 'user' && (
                        <>
                            <form className='mt-6 grid gap-3'>
                                <Label className='text-heading' htmlFor="note">Add a Note</Label>
                                <Textarea name="note" id="note" placeholder="Enter a Note" />
                                <Button type="submit">Submit</Button>
                            </form>
                        </>
                    )}
                </div>
            </Container>
        </>
    )
}

export default ProjectDetailPage