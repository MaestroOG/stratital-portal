'use client';
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useActionState } from 'react';
import { createNotification } from '@/action/notifications.actions';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const NotificationCreationForm = () => {
    const [state, formAction, isPending] = useActionState(createNotification, {})
    return (
        <>
            <form action={formAction} className='grid gap-4 mt-6'>
                <div className='grid gap-2'>
                    <Label className={'text-detail'}>Enter Notification Title</Label>
                    <Input name='title' type={'text'} className={'max-w-2xl'} />
                </div>
                <div className='grid gap-2'>
                    <Label className={'text-detail'}>Enter Notification Description</Label>
                    <Textarea name='description' className={'max-w-2xl'} />
                </div>
                <Button disabled={isPending} type='submit' className={'mt-4 max-w-2xl'}>Create Notification</Button>
            </form>
            <Dialog open={!!state.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Notification Created 🎉' : 'Error ⚠️'}
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
        </>
    )
}

export default NotificationCreationForm