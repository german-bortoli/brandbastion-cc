import { createFileRoute, Outlet } from "@tanstack/react-router";

import Posts from "@/components/posts/Posts";

export const Route = createFileRoute("/_index")({
  component: IndexLayout,
});

function IndexLayout() {
  return (
    <div className="flex">
      <div className="basis-1/2">
        <Posts />
      </div>
      <div className="basis-1/2 bg-lime-300">
        <Outlet />
      </div>
    </div>
  );
}
