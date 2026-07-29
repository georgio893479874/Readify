import { Elysia, t } from "elysia";
import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { reports, comments, books, users } from "../db/schema";

export const reportRoutes = new Elysia({
  prefix: "/reports",
})

  .get("/", async () => {
    const result = await db
      .select({
        report: reports,
        user: users,
        comment: comments,
        book: books,
      })
      .from(reports)
      .leftJoin(users, eq(reports.userId, users.id))
      .leftJoin(comments, eq(reports.commentId, comments.id))
      .leftJoin(books, eq(reports.bookId, books.id))
      .orderBy(desc(reports.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/user/:userId", async ({ params }) => {
    const result = await db
      .select()
      .from(reports)
      .where(eq(reports.userId, Number(params.userId)))
      .orderBy(desc(reports.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/:id", async ({ params, set }) => {
    const result = await db
      .select({
        report: reports,
        user: users,
        comment: comments,
        book: books,
      })
      .from(reports)
      .leftJoin(users, eq(reports.userId, users.id))
      .leftJoin(comments, eq(reports.commentId, comments.id))
      .leftJoin(books, eq(reports.bookId, books.id))
      .where(eq(reports.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Report not found",
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
      await db.insert(reports).values({
        userId: body.userId,
        commentId: body.commentId,
        bookId: body.bookId,
        reason: body.reason,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: "Report created",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        commentId: t.Optional(t.Number()),
        bookId: t.Optional(t.Number()),
        reason: t.String(),
      }),
    },
  )

  .delete("/:id", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(reports)
      .where(eq(reports.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
        message: "Report not found",
      };
    }

    await db
      .delete(reports)
      .where(eq(reports.id, Number(params.id)));

    return {
      success: true,
      message: "Report deleted",
    };
  });