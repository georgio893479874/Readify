import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../db/schema";
import Elysia, { t } from "elysia";

export const userRoutes = new Elysia({
  prefix: "/users",
})

  .get("/", async () => {
    const result = await db.select().from(users);

    return {
      success: true,
      data: result,
    };
  })

  .get("/:id", async ({ params, set }) => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
      };
    }

    return {
      success: true,
      data: result[0],
    };
  })

  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, Number(params.id)));

      if (!result.length) {
        set.status = 404;

        return {
          success: false,
        };
      }

      await db
        .update(users)
        .set({
          username: body.username,
          avatar: body.avatar,
          bio: body.bio,
          updatedAt: Date.now(),
        })
        .where(eq(users.id, Number(params.id)));

      return {
        success: true,
        message: "Updated",
      };
    },
    {
      body: t.Object({
        username: t.String(),
        avatar: t.Optional(t.String()),
        bio: t.Optional(t.String()),
      }),
    },
  )

  .delete("/:id", async ({ params, set }) => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
      };
    }

    await db.delete(users).where(eq(users.id, Number(params.id)));

    return {
      success: true,
      message: "User deleted",
    };
  })

  .onError(({ error }) => {
    console.error(error);

    return {
      success: false,
      message: (error as Error).message,
    };
  });
