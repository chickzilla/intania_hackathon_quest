import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter } from "../../../api/src/trpc/trpc.router";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8000/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});