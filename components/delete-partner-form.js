'use client';

import { useActionState } from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { deletePartner } from '@/action/partner.actions'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const DeletePartnerForm = ({ userId }) => {
    const [state, formAction, isPending] = useActionState(deletePartner, {})
    return (
        <>
            <form action={formAction} onSubmit={(e) => {
                if (!window.confirm("Are you sure you want to delete this partner?")) {
                    e.preventDefault();
                }
            }}>
                <input type="hidden" name='userId' value={userId} />
                <Button disabled={isPending} type='submit' variant="secondary">
                    <Trash
                        size={24}
                        alt="view"
                    />
                </Button>
            </form>

            {state.message && <Dialog open onOpenChange={() => { }} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? 'Deleted Partner 🚮' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{state.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => window.location.reload()}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>}
        </>
    )
}

export default DeletePartnerForm