import { FC, useEffect } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchComments, selectComments } from "@/reducers/commentReducer";
import CommentCard from "@/components/comments/CommentCard";
import { Comment } from "@/types/app";

interface Props {
  postId: number;
}

const Comments: FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  return (
    <div className="overflow-y-auto h-screen" data-testid="comments-container">
      {/** @TODO: Add breadcrumb **/}
      <div className="mt-6 ml-6">
        {comments.map((comment: Comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
