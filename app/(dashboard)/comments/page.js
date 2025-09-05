import Container from "@/components/dashboardComponents/Container"
import { getAllUserRelatedComments } from "@/lib/comments"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUser } from "@/lib/user"
import { getAllComments } from "@/lib/admin"
import { formatDateToYMD } from "@/utils/formUtils"

const CommentsPage = async () => {
    const user = await getUser();
    let notes;

    if (user?.role === 'user') {
        notes = await getAllUserRelatedComments();
    } else if (user?.role === 'superadmin') {
        notes = await getAllComments();
    }

    console.log(notes)

    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Project Comments</h1>
            <div className="flex flex-col gap-4 mt-4">
                {notes && notes.length > 0 ? (
                    notes?.map(note => (
                        <Alert key={note._id} variant="default">
                            <AlertTitle className={'font-semibold text-lg'}>{note?.projectId?.projectTitle} - {formatDateToYMD(note?.createdAt)}</AlertTitle>
                            <AlertDescription>
                                A comment was created by <span className="italic">{note.createdBy?.name}</span> on the project <span className="font-bold">{note.projectId?.projectTitle}</span>{" "}
                                <Link
                                    href={`/projects/${note.projectId?._id}`}
                                >
                                    <Button variant={'link'} className={'pl-0'}>
                                        View Comment
                                    </Button>
                                </Link>
                            </AlertDescription>
                        </Alert>
                    ))
                ) : (
                    <p className="text-gray-500">No comments found.</p>
                )}

            </div>
        </Container>
    )
}

export default CommentsPage