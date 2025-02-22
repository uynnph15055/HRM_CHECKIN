import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { IndexPage } from "./routes";
import { CheckInRouter } from "./routes/checkIn";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

const checkInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkIn",
  component: CheckInRouter,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, checkInRoute]),
});

export const routeTree = rootRoute.addChildren([homeRoute, checkInRoute]);
