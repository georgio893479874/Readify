import Elysia, { t } from "elysia";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";

export const authRoutes = new Elysia({
  prefix: "/auth",
})

  .post(
    "/register",
    async ({ body, set }) => {
      const exists = await db
        .select()
        .from(users)
        .where(eq(users.email, body.email));

      if (exists.length) {
        set.status = 409;

        return {
          success: false,
          message: "Email already exists",
        };
      }

      const now = Date.now();
      const passwordHash = await Bun.password.hash(body.password);

      await db.insert(users).values({
        username: body.username,
        email: body.email,
        passwordHash,
        createdAt: now,
        updatedAt: now,
      });

      return {
        success: true,
        message: "User created",
      };
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    },
  )

  .post(
    "/login",
    async ({ body, set }) => {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, body.email));

      if (!result.length) {
        set.status = 401;

        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      const user = result[0];
      const valid = await Bun.password.verify(body.password, user.passwordHash);

      if (!valid) {
        set.status = 401;

        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      return {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          verified: user.verified,
        },
      };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  )

  .get("/auth/me", async ({ query, set }) => {
    if (!query.id) {
      set.status = 400;

      return {
        success: false,
      };
    }

    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(query.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
      };
    }

    return {
      success: true,
      user: result[0],
    };
  });
