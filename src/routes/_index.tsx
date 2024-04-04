import { useEffect } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import Posts from "@/components/posts/Posts";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchUsers, selectUsers } from "@/reducers/userReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export const Route = createFileRoute("/_index")({
  component: IndexLayout,
});

function IndexLayout() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="basis-1/2">
        {users && Object.values(users).length > 0 && <Posts />}
      </div>
      <div className="basis-1/2 shadow-xl	">
        <Outlet />
      </div>
    </div>
  );
}
