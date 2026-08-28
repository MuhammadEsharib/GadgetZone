import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  // Polyfill stores.ids for TanStack Start hydration compatibility
  if (router.stores && !(router.stores as any).ids) {
    (router.stores as any).ids = (router.stores as any).matchesId ?? { get: () => [] };
  }

  return router;
};
