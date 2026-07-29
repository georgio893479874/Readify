import { Elysia, t } from "elysia";
import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { uploads } from "../db/schema";

export const uploadRoutes = new Elysia({
  prefix: "/uploads",
})

  .get("/:userId", async ({ params }) => {
    const result = await db
      .select()
      .from(uploads)
      .where(eq(uploads.userId, Number(params.userId)))
      .orderBy(desc(uploads.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/file/:id", async ({ params, set }) => {
    const result = await db
      .select()
      .from(uploads)
      .where(eq(uploads.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Upload not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  })

  .post(
    "/",
    async ({ body }) => {
      await db.insert(uploads).values({
        userId: body.userId,
        path: body.path,
        mime: body.mime,
        size: body.size,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: "Upload saved",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        path: t.String(),
        mime: t.String(),
        size: t.Number(),
      }),
    },
  )

  .delete("/:id", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(uploads)
      .where(eq(uploads.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
        message: "Upload not found",
      };
    }

    await db.delete(uploads).where(eq(uploads.id, Number(params.id)));

    return {
      success: true,
      message: "Upload deleted",
    };
  })

  .delete("/user/:userId", async ({ params }) => {
    await db.delete(uploads).where(eq(uploads.userId, Number(params.userId)));

    return {
      success: true,
      message: "User uploads deleted",
    };
  });
