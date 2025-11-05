import Container from "@/components/dashboardComponents/Container"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/user"
import { getAllComments, getAllCommentsOnUserProjects, getAllUnreadComments } from "@/lib/admin"
import { formatDateToYMD, formatReadableDate, formatTo12HourTime } from "@/utils/formUtils";
import CommentFilterForm from "@/components/comment-filter-form";

const CommentsPage = async ({ searchParams }) => {

    const user = await getUser();

    const { filter } = await searchParams
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
        if (filter === 'unread') {
            data = await getAllUnreadComments(user._id); // returns array of unread notes
        } else {
            data = await getAllComments(1, 10); // returns paginated notes object
        }
    }

    const notes = filter === 'unread' || user.role !== 'superadmin' ? data : data?.notes || [];
    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-4xl font-bold">Project Comments</h1>
                {user?.role === 'superadmin' && <CommentFilterForm />}
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {/* {user?.role === 'user' && data?.map((note, index) => (
                    <Link key={note?._id || index} href={`/projects/${note?.projectId?._id}`}>
                        <Alert variant="default">
                            <AlertTitle className="font-semibold text-lg">
                                {note?.createdBy?.name} - {formatReadableDate(note?.createdAt)} - {formatTo12HourTime(note?.createdAt)}
                            </AlertTitle>
                            <AlertDescription>
                                <span className="font-bold">on {note.projectId?.projectTitle}</span>
                            </AlertDescription>
                        </Alert>
                    </Link>
                ))} */}

                <div className="flex flex-col gap-4 mt-4">
                    {notes?.length === 0 ? (
                        <p className="text-gray-500 text-center p-6">No comments found.</p>
                    ) : (
                        notes.map((note, index) => {
                            const isUnread = !(note?.readBy ?? []).includes(user?._id);
                            return (
                                <Link key={note._id || index} href={`/projects/${note.projectId?._id}`}>
                                    <Alert variant="default">
                                        {isUnread && (
                                            <span className="absolute top-5 right-5 ml-2 h-3 w-3 rounded-full bg-red"></span>
                                        )}
                                        <AlertTitle className="font-semibold text-lg">
                                            {note?.createdBy?.name} - {formatReadableDate(note?.createdAt)} - {formatTo12HourTime(note?.createdAt)}
                                        </AlertTitle>
                                        <AlertDescription>
                                            <span className="font-bold">on {note.projectId?.projectTitle}</span>
                                        </AlertDescription>
                                    </Alert>
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>
        </Container>
    )
}

export default CommentsPage