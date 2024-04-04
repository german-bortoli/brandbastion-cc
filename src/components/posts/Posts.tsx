import { useEffect } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  fetchPosts,
  selectPosts,
  selectPostsHasError,
  selectPostsIsLoading,
} from "@/reducers/postReducer";

import { Post } from "@/types/app";

import PostCard from "@/components/posts/PostCard";
import SkeletonCard from "@/components/SkeletonCard";
import { selectUsers } from "@/reducers/userReducer";

const Posts = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPosts);
  const users = useAppSelector(selectUsers);
  const hasError = useAppSelector(selectPostsHasError);
  const isLoading = useAppSelector(selectPostsIsLoading);

  useEffect(() => {
    // Fetch and load posts on boot
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        data-e2e-id="posts-loading-content"
        className="px-3 mt-3 overflow-y-auto h-screen"
      >
        <h1 className="mb-3">Loading Posts...</h1>
        {[1, 2, 3].map((id) => (
          <SkeletonCard key={id} />
        ))}
      </div>
    );
  }

  if (hasError) {
    return (
      <div data-e2e-id="posts-error-content" className="text-red-500">
        Some error happens while fetching posts
      </div>
    );
  }

  return (
    <div
      data-e2e-id="posts-list-content"
      className="px-3 overflow-y-auto h-screen"
    >
      <h1>Posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <PostCard post={post} user={users[post.userId]} key={post.id} />
        ))}
      </ul>
    </div>
  );
};

export default Posts;
