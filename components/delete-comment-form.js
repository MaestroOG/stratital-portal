'use client';

import { deleteComment } from "@/action/project.actions"
import { useActionState } from "react"
import { Button } from "./ui/button";


const DeleteCommentForm = ({ id }) => {
    const [state, formAction, isPending] = useActionState(deleteComment, {});

    const handleSubmit = (e) => {
        if (state?.success) {
            window.location.reload();
        }
    }
    return (
        <>
            <form className="w-full" onSubmit={handleSubmit} action={formAction}>
                <input type="hidden" name="commentId" value={id} />
                <Button className={'w-full'} type='submit' disabled={isPending}>Delete Comment</Button>
            </form>
        </>
    )
}

export default DeleteCommentForm