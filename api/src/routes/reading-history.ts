import { Elysia, t } from "elysia";
import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { readingHistory, chapters, books } from "../db/schema";

export const historyRoutes = new Elysia({
  prefix: "/history",
})

  .get("/:userId", async ({ params }) => {
    const result = await db
      .select({
        history: readingHistory,
        chapter: chapters,
        book: books,
      })
      .from(readingHistory)
      .innerJoin(chapters, eq(readingHistory.chapterId, chapters.id))
      .innerJoin(books, eq(chapters.bookId, books.id))
      .where(eq(readingHistory.userId, Number(params.userId)))
      .orderBy(desc(readingHistory.updatedAt));

    return {
      success: true,
      data: result,
    };
  })

  .post(
    "/",
    async ({ body }) => {
      await db.insert(readingHistory).values({
        userId: body.userId,
        chapterId: body.chapterId,
        progress: body.progress,
        updatedAt: Date.now(),
      });

      return {
        success: true,
        message: "History saved",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        chapterId: t.Number(),
        progress: t.Number(),
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body }) => {
      await db
        .update(readingHistory)
        .set({
          progress: body.progress,
          updatedAt: Date.now(),
        })
        .where(eq(readingHistory.id, Number(params.id)));

      return {
        success: true,
        message: "Progress updated",
      };
    },
    {
      body: t.Object({
        progress: t.Number(),
      }),
    },
  );
