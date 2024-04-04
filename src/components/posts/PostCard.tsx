import { FC } from "react";
import { Link } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/types/app";
import { Route } from "@/routes/_index/post.$postId";

interface Props {
  post: Post;
}

const PostCard: FC<Props> = ({ post }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>
        <Link
          className="text-blue-500"
          to={Route.to}
          params={{ postId: String(post.id) }}
        >
          {post.title}
        </Link>
      </CardTitle>
      {/* <CardDescription>{post.userId}</CardDescription> */}
    </CardHeader>
    <CardContent>
      <p>{post.body}</p>
    </CardContent>
  </Card>
);

export default PostCard;
