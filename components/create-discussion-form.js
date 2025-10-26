'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { createDiscussion } from '@/action/discussions.actions';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const CreateDiscussionForm = () => {
    const [state, formAction, isPending] = useActionState(createDiscussion, {});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success || state?.message) {
            setOpen(true);
        }
    }, [state])
    return (
        <>
            <form action={formAction} className='grid gap-4'>
                <div className='grid gap-2'>
                    <Label htmlFor="topic">Discussion Topic</Label>
                    <Input id='topic' name='discussionTopic' type="text" placeholder="Enter topic here" className={'w-2xl max-w-2xl'} required />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor="title">Discussion Title</Label>
                    <Input type="text" id='title' name='discussionTitle' placeholder="Enter title here" className={'w-2xl max-w-2xl'} required />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor="subtitle">Discussion Subtitle</Label>
                    <Input type="text" id='subtitle' name='discussionSubtitle' placeholder="Enter subtitle here" className={'w-2xl max-w-2xl'} required />
                </div>

                <Button disabled={isPending} type='submit' className={'w-2xl max-w-2xl'}>Create Discussion</Button>
            </form>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state.message}</p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateDiscussionForm