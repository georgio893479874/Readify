import { Elysia, t } from "elysia";
import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { bookmarks, chapters, books } from "../db/schema";

export const bookmarkRoutes = new Elysia({
  prefix: "/bookmarks",
})

  .get("/:userId", async ({ params }) => {
    const result = await db
      .select({
        bookmark: bookmarks,
        chapter: chapters,
        book: books,
      })
      .from(bookmarks)
      .innerJoin(chapters, eq(bookmarks.chapterId, chapters.id))
      .innerJoin(books, eq(chapters.bookId, books.id))
      .where(eq(bookmarks.userId, Number(params.userId)))
      .orderBy(desc(bookmarks.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/chapter/:chapterId", async ({ params }) => {
    const result = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.chapterId, Number(params.chapterId)));

    return {
      success: true,
      data: result,
    };
  })

  .post(
    "/",
    async ({ body }) => {
      await db.insert(bookmarks).values({
        userId: body.userId,
        chapterId: body.chapterId,
        position: body.position,
        note: body.note,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: "Bookmark created",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        chapterId: t.Number(),
        position: t.Number(),
        note: t.Optional(t.String()),
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body }) => {
      await db
        .update(bookmarks)
        .set({
          position: body.position,
          note: body.note,
        })
        .where(eq(bookmarks.id, Number(params.id)));

      return {
        success: true,
        message: "Bookmark updated",
      };
    },
    {
      body: t.Object({
        position: t.Number(),
        note: t.Optional(t.String()),
      }),
    },
  )

  .delete("/:id", async ({ params }) => {
    await db.delete(bookmarks).where(eq(bookmarks.id, Number(params.id)));

    return {
      success: true,
      message: "Bookmark deleted",
    };
  });
