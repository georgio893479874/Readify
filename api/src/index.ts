import { Elysia } from "elysia";
import { routes } from "./routes";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import cors from "@elysiajs/cors";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle({client});

new Elysia({
  prefix: "/api",
})
  .use(
    cors({
      origin: process.env.WEB_URL,
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
      credentials: true
    })
  )
  .use(routes)
  .listen(3000);

console.log("🚀 Server running on http://localhost:3000/api");