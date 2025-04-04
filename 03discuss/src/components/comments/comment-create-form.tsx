"use client";
import React, { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CreateComment } from "@/actions/create-comment";
import { Loader } from "lucide-react";

type CommentCreateFormProps = {
  postId: string;
  parentId: string;
  startOpen?: boolean;
};

const CommentCreateForm: React.FC<CommentCreateFormProps> = ({
    postId,
  parentId,
  startOpen,
})=> {
  const [open, setOpen] = useState(startOpen);
  const [formState, action, isPending] = useActionState(
    CreateComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  return (
    <div>
      <Button size={"sm"} variant={"link"} onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && (
        <form action={action}>
          <Textarea
            name="content"
            placeholder="Write a comment..."
            className="bg-gray-100 
                    focus-visible:ring-0"
          />
          {formState.errors.content && (
            <p className="text-red-600 text-sm">{formState.errors.content}</p>
          )}
          {formState.errors.formError && (
            <div className="bg-red-200 border-red-600  text-sm p-2 rounded">
              {formState.errors.formError}
            </div>
          )}
          <Button disabled={isPending} size={"sm"} variant={"secondary"}>
            {isPending ? (
                <>
                <Loader />
                Please wait
                </>
            ) : (
                "Save"
            )}
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
export default CommentCreateForm;
