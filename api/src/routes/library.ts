import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../index";
import { libraries, books } from "../db/schema";

export const libraryRoutes = new Elysia({
  prefix: "/library",
})

  .get("/:userId", async ({ params }) => {
    const result = await db
      .select({
        library: libraries,
        book: books,
      })
      .from(libraries)
      .innerJoin(books, eq(libraries.bookId, books.id))
      .where(eq(libraries.userId, Number(params.userId)));

    return {
      success: true,
      data: result,
    };
  })

  .post(
    "/",
    async ({ body }) => {
      await db.insert(libraries).values({
        userId: body.userId,
        bookId: body.bookId,
        status: body.status,
      });

      return {
        success: true,
        message: "Added to library",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        bookId: t.Number(),
        status: t.Union([
          t.Literal("reading"),
          t.Literal("planned"),
          t.Literal("completed"),
          t.Literal("dropped"),
        ]),
      }),
    },
  )

  .patch(
    "/:userId/:bookId",
    async ({ params, body }) => {
      await db
        .update(libraries)
        .set({
          status: body.status,
        })
        .where(eq(libraries.userId, Number(params.userId)));

      return {
        success: true,
        message: "Library updated",
      };
    },
    {
      body: t.Object({
        status: t.Union([
          t.Literal("reading"),
          t.Literal("planned"),
          t.Literal("completed"),
          t.Literal("dropped"),
        ]),
      }),
    },
  )

  .delete("/:userId/:bookId", async ({ params }) => {
    await db
      .delete(libraries)
      .where(eq(libraries.userId, Number(params.userId)));

    return {
      success: true,
      message: "Removed from library",
    };
  });
