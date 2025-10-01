'use client';

import { Button } from '@/components/ui/button'
import { useActionState, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { deleteProject } from '@/action/admin.actions';
import { useRouter } from 'next/navigation';

const ProjectDeleteForm = ({ id }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(deleteProject, {});
    const router = useRouter();

    const handleClick = () => {
        setDeleteOpen(true);
    }

    useEffect(() => {
        if (state?.success) {
            setDeleteOpen(false);
            setOpen(true);

            const timer = setTimeout(() => {
                router.replace('/projects');
            }, 2000);

            return () => clearTimeout(timer);
        } else if (state?.message) {
            setDeleteOpen(false);
            setOpen(true);
        }
    }, [state, router]);
    return (
        <>
            <Button type='button' onClick={handleClick}>Delete Project</Button>
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <form action={formAction}>
                        <input type="hidden" name='projectId' value={id} />
                        <DialogHeader>
                            <DialogTitle>
                                Are you sure you want to delete this project
                            </DialogTitle>
                        </DialogHeader>
                        <DialogFooter className={'mt-5'}>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Yes, Delete</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state?.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state?.message}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProjectDeleteForm