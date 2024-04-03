import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_index/")({
  component: () => <div>Please select a post to read comments</div>,
});
