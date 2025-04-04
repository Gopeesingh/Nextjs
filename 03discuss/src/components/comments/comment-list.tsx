import React from "react"
import CommentShow from "./comment-show"
import { fetchCommentByPostId } from "@/lib/query/comment"

type CommentListProps = {
    postId:string
}

const CommentList:React.FC<CommentListProps> =async ({postId}) => {
    const comments = await fetchCommentByPostId(postId);
    const topLevelComment = comments.filter((comment) => comment.parentId == null)
    return(
        <div>
            <h1 className="font-bold text-lg"></h1>
            {
                topLevelComment.map((comment) => (
                <CommentShow key={comment.id} postId={comment.postId} commentId={comment.id}/>
                ))
            }
        </div>
    )
}
export default CommentList