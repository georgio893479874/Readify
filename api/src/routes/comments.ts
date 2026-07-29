import { Elysia, t } from "elysia";
import { eq, asc } from "drizzle-orm";
import { db } from "../index";
import { comments } from "../db/schema";

export const commentRoutes = new Elysia({
  prefix: "/comments",
})

  .get("/book/:bookId", async ({ params }) => {
    const result = await db
      .select()
      .from(comments)
      .where(eq(comments.bookId, Number(params.bookId)))
      .orderBy(asc(comments.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/chapter/:chapterId", async ({ params }) => {
    const result = await db
      .select()
      .from(comments)
      .where(eq(comments.chapterId, Number(params.chapterId)))
      .orderBy(asc(comments.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/:id/replies", async ({ params }) => {
    const result = await db
      .select()
      .from(comments)
      .where(eq(comments.parentId, Number(params.id)));

    return {
      success: true,
      data: result,
    };
  })

  .post(
    "/",
    async ({ body }) => {
      await db.insert(comments).values({
        userId: body.userId,
        bookId: body.bookId,
        chapterId: body.chapterId,
        parentId: body.parentId,
        content: body.content,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: "Comment created",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        bookId: t.Optional(t.Number()),
        chapterId: t.Optional(t.Number()),
        parentId: t.Optional(t.Number()),
        content: t.String(),
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const exists = await db
        .select()
        .from(comments)
        .where(eq(comments.id, Number(params.id)));

      if (!exists.length) {
        set.status = 404;

        return {
          success: false,
          message: "Comment not found",
        };
      }

      await db
        .update(comments)
        .set({
          content: body.content,
        })
        .where(eq(comments.id, Number(params.id)));

      return {
        success: true,
        message: "Comment updated",
      };
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    },
  )

  .delete("/:id", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(comments)
      .where(eq(comments.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
        message: "Comment not found",
      };
    }

    await db.delete(comments).where(eq(comments.id, Number(params.id)));

    return {
      success: true,
      message: "Comment deleted",
    };
  });
