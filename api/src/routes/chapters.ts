import { Elysia, t } from "elysia";
import { eq, asc, sql } from "drizzle-orm";
import { db } from "../index";
import { chapters } from "../db/schema";

export const chapterRoutes = new Elysia({
  prefix: "",
})

  .get("/books/:bookId/chapters", async ({ params }) => {
    const result = await db
      .select()
      .from(chapters)
      .where(eq(chapters.bookId, Number(params.bookId)))
      .orderBy(asc(chapters.number));

    return {
      success: true,
      data: result,
    };
  })

  .get("/chapters/:id", async ({ params, set }) => {
    const result = await db
      .select()
      .from(chapters)
      .where(eq(chapters.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Chapter not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  })

  .post(
    "/books/:bookId/chapters",
    async ({ params, body }) => {
      const now = Date.now();

      await db.insert(chapters).values({
        bookId: Number(params.bookId),
        title: body.title,
        number: body.number,
        content: body.content,
        createdAt: now,
        updatedAt: now,
      });

      return {
        success: true,

        message: "Chapter created",
      };
    },
    {
      body: t.Object({
        title: t.String(),
        number: t.Number(),
        content: t.String(),
      }),
    },
  )

  .patch(
    "/chapters/:id",
    async ({ params, body, set }) => {
      const exists = await db
        .select()
        .from(chapters)
        .where(eq(chapters.id, Number(params.id)));

      if (!exists.length) {
        set.status = 404;

        return {
          success: false,
          message: "Chapter not found",
        };
      }

      await db
        .update(chapters)
        .set({
          title: body.title,
          content: body.content,
          number: body.number,
          updatedAt: Date.now(),
        })
        .where(eq(chapters.id, Number(params.id)));

      return {
        success: true,
        message: "Chapter updated",
      };
    },
    {
      body: t.Object({
        title: t.String(),
        number: t.Number(),
        content: t.String(),
      }),
    },
  )

  .delete("/chapters/:id", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(chapters)
      .where(eq(chapters.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
      };
    }

    await db.delete(chapters).where(eq(chapters.id, Number(params.id)));

    return {
      success: true,

      message: "Chapter deleted",
    };
  })

  .post("/chapters/:id/view", async ({ params, set }) => {
    const chapter = await db
      .select()
      .from(chapters)
      .where(eq(chapters.id, Number(params.id)));

    if (!chapter.length) {
      set.status = 404;

      return {
        success: false,
        message: "Chapter not found",
      };
    }

    await db
      .update(chapters)
      .set({
        views: sql`${chapters.views} + 1`,
      })
      .where(eq(chapters.id, Number(params.id)));

    return {
      success: true,
    };
  });
