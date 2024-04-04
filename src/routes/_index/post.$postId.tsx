import { createFileRoute } from "@tanstack/react-router";

import Comments from "@/components/comments/Comments";

export const Route = createFileRoute("/_index/post/$postId")({
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();

  return <Comments postId={Number(postId)} />;
}
