
import AddProjectSelect from '@/components/dashboardComponents/AddProjectSelect'
import Container from '@/components/dashboardComponents/Container'
import NewProjectForm from '@/components/new-project-form';
import { formConfig } from '@/utils/formConfig';

export const metadata = {
    title: "Add a New Project"
}

const NewProjectPage = ({ searchParams }) => {
    const service = searchParams.service?.toLowerCase()
        .split(' ')
        .map((word, index) => {
            if (index === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('') || "";

    const fields = formConfig[service];
    return (
        <>
            <Container className={'bg-white p-4 rounded-lg'}>
                <h1 className='font-medium text-2xl'>Choose The Service And Get Started</h1>
                <div className='max-w-3xl mt-3'>
                    <AddProjectSelect />
                </div>
            </Container>

            {!fields && service.length !== 0 && <Container className={'bg-white rounded-lg p-4'}>
                <p className="text-red-500">No form found for this service.</p>
            </Container>}

            <NewProjectForm service={service} fields={fields} />
        </>
    )
}

export default NewProjectPage