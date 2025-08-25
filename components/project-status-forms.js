'use client'

import { ApproveProject, RejectProject } from "@/action/project.actions"
import { useActionState } from "react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const ProjectStatusForms = ({ projectId, status }) => {

    const [approveState, approveFormAction, approveIsPending] = useActionState(ApproveProject.bind(null, projectId), {})
    const [rejectState, rejectFormAction, rejectIsPending] = useActionState(RejectProject.bind(null, projectId), {})

    return (
        <>

            {status === 'Pending' && <form action={approveFormAction}>
                <Button type='submit' disabled={approveIsPending}>Approve</Button>
            </form>}

            <form action={rejectFormAction}>
                <Button type='submit' disabled={rejectIsPending} variant={'outline'}>Reject</Button>
            </form>

            {/* Approve */}
            <Dialog open={!!approveState.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {approveState.success ? 'Project Approved 🎉' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{approveState.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => window.location.reload()}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject */}

            <Dialog open={!!rejectState.message} onOpenChange={() => window.location.reload()} className='bg-white'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {rejectState.success ? 'Project Rejected 😢' : 'Error ⚠️'}
                        </DialogTitle>
                        <DialogDescription>{rejectState.message}</DialogDescription>
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

export default ProjectStatusForms