import { useDeferredValue, useEffect, useState } from "react";

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
import { Input } from "../ui/input";

const Posts = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const deferredSearch = useDeferredValue(search);

  const posts = useAppSelector(selectPosts);
  const users = useAppSelector(selectUsers);
  const hasError = useAppSelector(selectPostsHasError);
  const isLoading = useAppSelector(selectPostsIsLoading);

  useEffect(() => {
    // Fetch and load posts on boot
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) => {
    const filterKey = deferredSearch.toLowerCase();

    // Find by title
    const foundByTitle = post.title.toLowerCase().includes(filterKey);
    if (foundByTitle) {
      return true;
    }

    // Find by body
    const foundByBody = post.body.toLowerCase().includes(filterKey);
    if (foundByBody) {
      return true;
    }

    // Find by author
    const user = users[post.userId];

    const foundByAuthor = user?.name?.toLowerCase().includes(filterKey);
    if (foundByAuthor) {
      return true;
    }

    return false;
  });

  if (isLoading) {
    return (
      <div
        data-testid="posts-loading-content"
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
      <div data-testid="posts-error-content" className="text-red-500">
        Some error happens while fetching posts
      </div>
    );
  }

  return (
    <div
      data-testid="posts-list-content"
      className="px-3 overflow-y-auto h-screen"
    >
      <div
        data-testid="post-topbar"
        className="h-14 bg-lime-100 rounded-lg mt-3 mb-3 px-6 border border-lime-400 w-full grid grid-cols-2 gap-3 sticky top-3 shadow-xl"
      >
        <div className="flex items-center justify-start">
          <h1>Posts</h1>
        </div>
        <div className="flex items-center justify-end">
          <Input
            type="search"
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
            className="bg-lime-50"
            placeholder="Search ..."
          />
        </div>
      </div>
      {filteredPosts.length === 0 ? <div>No posts found</div> : null}
      <ul>
        {filteredPosts.map((post: Post) => (
          <PostCard post={post} user={users[post.userId]} key={post.id} />
        ))}
      </ul>
    </div>
  );
};

export default Posts;
