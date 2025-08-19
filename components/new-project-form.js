'use client';

import { createProject } from '@/action/project.actions';
import { useActionState } from 'react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import Container from './dashboardComponents/Container';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const NewProjectForm = ({ service, fields }) => {

    const [state, formAction, isPending] = useActionState(createProject, {})

    return (
        <>
            {service && <>
                <Container className={'bg-white rounded-lg p-4'}>
                    <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="hidden" name="service" value={service} />

                        <div className="flex flex-col gap-2">
                            <Label className="block font-medium">
                                Project Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="projectTitle"
                                required
                                className="border border-gray-300"
                            />
                        </div>
                        {fields?.map((field) => (
                            <>
                                <div key={field.name} className="flex flex-col gap-2">
                                    <Label className="block font-medium">
                                        {field.label}{" "}
                                        {field.required && <span className="text-red-500">*</span>}
                                    </Label>

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
                        {service && <Button key={service} disabled={isPending} type="submit">Submit</Button>}

                    </form>

                    <Dialog open={!!state.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {state.success ? 'Project Created 🎉' : 'Error ⚠️'}
                                </DialogTitle>
                                <DialogDescription>{state.message}</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button onClick={() => window.location.reload()}>
                                    Close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Container>
            </>
            }
        </>
    )
}

export default NewProjectForm