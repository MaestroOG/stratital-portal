import Container from "@/components/dashboardComponents/Container"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/user"
import { getAllComments, getAllCommentsOnUserProjects } from "@/lib/admin"
import { formatDateToYMD, formatTo12HourTime } from "@/utils/formUtils";
import CommentsList from "@/components/superadminComponents/CommentList"

const CommentsPage = async () => {

    const user = await getUser();
    if (!user) {
        return (
            <Container className="bg-white p-2 md:p-4">
                <p className="text-red-500">User not found.</p>
            </Container>
        );
    }

    let data;

    if (user.role !== 'superadmin') {
        data = await getAllCommentsOnUserProjects(user._id);
    } else {
        data = await getAllComments(1, 10);
    }

    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Project Comments</h1>
            <div className="flex flex-col gap-4 mt-4">
                {user?.role === 'user' && data?.map((note, index) => (
                    <Alert key={index} variant="default">
                        <AlertTitle className={'font-semibold text-lg'}>{note?.createdBy?.name} - {formatDateToYMD(note?.createdAt)} - {formatTo12HourTime(note?.createdAt)}</AlertTitle>
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
                ))}
                {user?.role === 'superadmin' && (
                    data.length === 0 ? (
                        <p className="text-gray-500 text-center p-6">No comments found.</p>
                    ) : (
                        <CommentsList initialNotes={data.notes} />
                    )
                )}

            </div>
        </Container>
    )
}

export default CommentsPage