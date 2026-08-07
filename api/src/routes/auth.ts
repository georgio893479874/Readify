import Elysia, { t } from "elysia";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

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

      const passwordHash = await Bun.password.hash(body.password);
      const now = Date.now();

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
        password: t.String({
          minLength: 6,
        }),
      }),
    },
  )

  .post(
    "/login",
    async (ctx) => {
      const { jwt, body, set } = ctx as any;
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

      const token = await jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        success: true,
        token,
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

  .get("/me", async (ctx) => {
    const { jwt, headers, set } = ctx as any;
    const auth = (headers as Record<string, string | undefined>).authorization;

    if (!auth?.startsWith("Bearer ")) {
      set.status = 401;

      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const token = auth.replace("Bearer ", "");

    const payload = await jwt.verify(token);

    if (!payload) {
      set.status = 401;

      return {
        success: false,
        message: "Invalid token",
      };
    }

    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(payload.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "User not found",
      };
    }

    const user = result[0];

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
  });
