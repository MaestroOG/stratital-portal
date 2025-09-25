import Container from "@/components/dashboardComponents/Container"
import { getAllUserRelatedComments } from "@/lib/comments"
import { getUser } from "@/lib/user"
import { getAllComments } from "@/lib/admin"

import CommentsList from "@/components/superadminComponents/CommentList"

const CommentsPage = async () => {
    const user = await getUser();
    let data = await getAllComments(1, 10);


    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Project Comments</h1>
            <div className="flex flex-col gap-4 mt-4">
                <CommentsList initialNotes={data.notes} />
            </div>
        </Container>
    )
}

export default CommentsPage