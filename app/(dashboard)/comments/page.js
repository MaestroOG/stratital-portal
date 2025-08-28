import Container from "@/components/dashboardComponents/Container"
import { getAllUserRelatedComments } from "@/lib/comments"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const CommentsPage = async () => {
    const notes = await getAllUserRelatedComments()

    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">All Comments</h1>
            <div className="flex flex-col gap-4 mt-4">
                {notes && notes.length > 0 ? (
                    notes?.map(note => (
                        <Alert key={note._id} variant="default">
                            <AlertTitle className={'font-semibold text-lg'}>Comment Notice!</AlertTitle>
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