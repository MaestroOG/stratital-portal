'use client';

import { editResource } from "@/action/admin.actions";
import { useActionState, useEffect, useState } from "react";
import { Pencil } from 'lucide-react';
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ResourceEditForm = ({ resource }) => {
    const [state, formAction, isPending] = useActionState(editResource, {})
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [open, setOpen] = useState(false)

    const handleEditClick = () => {
        setEditFormOpen(true);
    }

    useEffect(() => {
        if (state.success || state.message) {
            setEditFormOpen(false);
            setOpen(true)
        }
    }, [state])

    return (
        <>
            <input type="hidden" value={resource?._id} name="resourceId" />
            <Button onClick={handleEditClick} type='button'><Pencil /></Button>

            <Dialog open={editFormOpen} onOpenChange={setEditFormOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit resource</DialogTitle>
                        <DialogDescription>
                            Make changes to your resource here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <form action={formAction} method="post" encType="multipart/form-data" className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" defaultValue={resource?.title} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="file">Upload File</Label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-4"
                                type="file"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                id="file"
                                name="file"
                            />
                        </div>

                        <input type="hidden" name="resourceId" value={resource?._id} />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {state.success ? "✅ Success" : "⚠️ Error"}
                        </DialogTitle>
                    </DialogHeader>
                    <p>{state.message}</p>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ResourceEditForm