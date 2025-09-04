'use client';


import { useActionState, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { addNote } from "@/action/project.actions";
import JoditEditor from 'jodit-react';

const NoteBox = ({ id }) => {
    const [state, formAction, isPending] = useActionState(addNote.bind(null, id), {});
    const [value, setValue] = useState("");
    const contentRef = useRef(null);

    const handleSubmit = (e) => {

        // ✅ reset editor after submit
        setValue("");
    };

    return (
        <>
            <form action={formAction} onSubmit={handleSubmit} className='mt-6 grid gap-3 max-w-3xl'>
                <Label className='text-heading' htmlFor="note">Add a Comment</Label>
                <JoditEditor
                    ref={contentRef}
                    value={value}
                    tabIndex={1}
                    onBlur={newContent => setValue(newContent)}
                    onChange={newContent => { }}
                />
                <input type="hidden" name="commentText" value={value} />
                <Button disabled={isPending} type="submit">Send</Button>
                {state?.message && <p className={`text-${state.success ? 'green' : 'red'}`}>{state.message}</p>}
            </form>
        </>
    )
}

export default NoteBox