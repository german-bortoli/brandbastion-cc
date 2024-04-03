import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_index/post/$postId")({
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();

  return <div>Fetching post comments from postID: {postId}</div>;
}
