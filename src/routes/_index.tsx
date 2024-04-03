import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_index")({
  component: IndexLayout,
});

function IndexLayout() {
  return (
    <div className="flex h-screen">
      <div className="basis-1/2 bg-red-300">List of posts</div>
      <div className="basis-1/2 bg-lime-300">
        <Outlet />
      </div>
    </div>
  );
}
