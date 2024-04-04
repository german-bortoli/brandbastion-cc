import { FC } from "react";
import { Link } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post, User } from "@/types/app";
import { Route as PostRoute } from "@/routes/_index/post.$postId";

interface Props {
  post: Post;
  user?: User | null;
}

const PostCard: FC<Props> = ({ post, user }) => {
  return (
    <Card className="mb-6" data-e2e-id={`post-card-id-${post.id}`}>
      <CardHeader>
        <CardTitle>
          <Link
            data-e2e-id="post-navigation-link"
            className="text-blue-500"
            activeProps={{ className: "font-bold text-green-600" }}
            to={PostRoute.to}
            params={{ postId: String(post.id) }}
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription data-e2e-id="post-card-author">
          By: {user?.name || "Anonymous"}
        </CardDescription>
      </CardHeader>
      <CardContent data-e2e-id="post-card-content">
        <p>{post.body}</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
