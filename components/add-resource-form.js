'use client';

import { Label } from "@/components/ui/label"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useActionState, useEffect, useState } from "react";
import { addResource } from "@/action/admin.actions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const AddResourceForm = () => {
    const [open, setOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(addResource, {})

    useEffect(() => {
        if (state.success || state.message) {
            setOpen(true)
        }
    }, [state])
    return (
        <>
            <form action={formAction} className="bg-white p-2 rounded-lg grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Resource Title (optional)</Label>
                    <Input type='text' name='title' />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="file">Upload File</Label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-4"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        id="file"
                        name="file"
                    />
                </div>
                <p>OR</p>
                <div className="grid gap-2">
                    <Label htmlFor="resourceLink">Resource Link</Label>
                    <Input type='url' name='resourceLink' />
                </div>
                <Button type='submit' disabled={isPending} className={'mt-2'}>Submit</Button>
            </form>

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

export default AddResourceForm