'use client';
import { addUser } from '@/action/addUser';
import { rejectUser } from '@/action/rejectUser';
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { useActionState, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

const PendingUserTable = ({ pendingUsers }) => {
    const [open, setOpen] = useState(false);
    const [message, addUserFormAction, isPending] = useActionState(addUser, { err: "", success: false });
    const [rejMessage, rejectUserFormAction, isRejectPending] = useActionState(rejectUser, { rejErr: "", success: false });

    useEffect(() => {
        if (message?.success) {
            setOpen(true)
        }
    }, [message, rejMessage]);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Business Name</TableHead>
                    <TableHead>Owner Name</TableHead>
                    <TableHead>Contact Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pendingUsers?.map(user => (
                    <TableRow key={user?._id}>
                        <TableCell className="font-medium">{user?.companyName}</TableCell>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell className="text-right flex items-center justify-end gap-4">
                            <form action={addUserFormAction}>
                                <input type="hidden" name='userId' value={user?._id} />
                                <Button type='submit' disabled={isPending}>
                                    <Image src={'/tick.svg'} width={24} height={24} alt='tick' />
                                </Button>
                            </form>
                            <form action={rejectUserFormAction}>

                                <input type="hidden" name='userId' value={user?._id} />
                                <Button type='submit' disabled={isRejectPending} variant={'secondary'}>
                                    <Image src={'/cancel.svg'} width={24} height={24} alt='cancel' />
                                </Button>
                            </form>
                            <Button variant={'secondary'}><Image src={'/eye-open.svg'} width={24} height={24} alt='cancel' /></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader className={'flex items-center justify-center flex-col gap-3'}>
                        <DialogTitle><Image width={100} height={100} src={'/check-circle.svg'} alt="check-circle" /></DialogTitle>
                        <DialogDescription className={'text-lg'}>
                            Action completed successfully!
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </Table>
    )
}

export default PendingUserTable