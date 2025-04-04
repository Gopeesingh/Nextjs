import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/posts/post-show";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react"

type PostShowPageProps = {
    params:Promise<{slug:string; PostId:string}>
}
const PostShowPage :React.FC<PostShowPageProps> = async({params}) => {
    const {slug, PostId} = (await params);
    // console.log(slug)
    return(
        <div className="space-y-3">
            <Link href={`/topics/${slug}`}>
            <Button variant={'link'}>
            <ChevronLeft />
            Back to {slug}
            </Button>
            </Link>
            <Suspense fallback={<p>Loading...</p>}>
            <PostShow postId={PostId}/>
            </Suspense>
            <CommentCreateForm postId={PostId} parentId="" startOpen/>
            <CommentList postId={PostId}/>
        </div>
    )
}

export default PostShowPage;