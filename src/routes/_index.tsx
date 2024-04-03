import { useEffect } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchPosts, selectPosts } from "@/reducers/postReducer";

export const Route = createFileRoute("/_index")({
  component: IndexLayout,
});

function IndexLayout() {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch and load posts on boot
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      <div className="basis-1/2 bg-red-300">{JSON.stringify(posts)}</div>
      <div className="basis-1/2 bg-lime-300">
        <Outlet />
      </div>
    </div>
  );
}
