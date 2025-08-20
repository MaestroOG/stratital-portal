'use client';

import { useActionState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { addNote } from "@/action/project.actions";

const NoteBox = ({ id }) => {
    const [state, formAction, isPending] = useActionState(addNote.bind(null, id), {});
    return (
        <>
            <form action={formAction} className='mt-6 grid gap-3'>
                <Label className='text-heading' htmlFor="note">Add a Note</Label>
                <Textarea name="note" id="note" placeholder="Enter a Note" />
                <Button disabled={isPending} type="submit">Submit</Button>

                {state?.message && <p className={`text-${state.success ? 'green' : 'red'}`}>{state.message}</p>}
            </form>
        </>
    )
}

export default NoteBox