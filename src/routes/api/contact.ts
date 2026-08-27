import { createFileRoute } from "@tanstack/react-router";
import { POST } from "@/server/api/contact";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST,
    },
  },
});
