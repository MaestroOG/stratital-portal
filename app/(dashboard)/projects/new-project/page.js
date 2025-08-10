import AddProjectSelect from '@/components/dashboardComponents/AddProjectSelect'
import Container from '@/components/dashboardComponents/Container'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    console.log(service)
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

            {service && <>
                <Container className={'bg-white rounded-lg p-4'}>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fields?.map((field) => (
                            <>
                                <div key={field.name} className="flex flex-col gap-2">
                                    <label className="block font-medium">
                                        {field.label}{" "}
                                        {field.required && <span className="text-red-500">*</span>}
                                    </label>

                                    {field.type === "textarea" ? (
                                        <Textarea
                                            name={field.name}
                                            required={field.required}
                                            className="border border-gray-300"
                                        />
                                    ) : (
                                        <Input
                                            type={field.type}
                                            name={field.name}
                                            required={field.required}
                                            className="border border-gray-300"
                                        />
                                    )}
                                </div>
                            </>
                        ))}
                        {service && <Button type="submit">Submit</Button>}

                    </form>
                </Container>
            </>
            }
        </>
    )
}

export default NewProjectPage