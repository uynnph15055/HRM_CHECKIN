import { createRootRoute, Outlet } from "@tanstack/react-router";

const GlobalWrapper = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: GlobalWrapper,
});
