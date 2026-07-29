import { Elysia, t } from "elysia";
import { eq, and, avg } from "drizzle-orm";
import { db } from "../index";
import { ratings, books } from "../db/schema";

export const ratingRoutes = new Elysia({
  prefix: "/ratings",
})

  .get("/book/:bookId", async ({ params }) => {
    const result = await db
      .select()
      .from(ratings)
      .where(eq(ratings.bookId, Number(params.bookId)));

    return {
      success: true,
      data: result,
    };
  })

  .get("/book/:bookId/user/:userId", async ({ params }) => {
    const result = await db
      .select()
      .from(ratings)
      .where(
        and(
          eq(ratings.bookId, Number(params.bookId)),
          eq(ratings.userId, Number(params.userId)),
        ),
      );

    return {
      success: true,
      data: result.length ? result[0] : null,
    };
  })

  .post(
    "/",
    async ({ body }) => {
      const exists = await db
        .select()
        .from(ratings)
        .where(
          and(eq(ratings.userId, body.userId), eq(ratings.bookId, body.bookId)),
        );

      if (exists.length) {
        await db
          .update(ratings)
          .set({
            rating: body.rating,
          })
          .where(
            and(
              eq(ratings.userId, body.userId),
              eq(ratings.bookId, body.bookId),
            ),
          );
      } else {
        await db.insert(ratings).values({
          userId: body.userId,
          bookId: body.bookId,
          rating: body.rating,
        });
      }

      const average = await db
        .select({
          value: avg(ratings.rating),
        })
        .from(ratings)
        .where(eq(ratings.bookId, body.bookId));

      await db
        .update(books)
        .set({
          rating: Math.round(Number(average[0].value ?? 0)),
          updatedAt: Date.now(),
        })
        .where(eq(books.id, body.bookId));

      return {
        success: true,
        message: "Rating saved",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        bookId: t.Number(),
        rating: t.Number({
          minimum: 1,
          maximum: 5,
        }),
      }),
    },
  )

  .delete("/:bookId/:userId", async ({ params }) => {
    await db
      .delete(ratings)
      .where(
        and(
          eq(ratings.bookId, Number(params.bookId)),
          eq(ratings.userId, Number(params.userId)),
        ),
      );

    const average = await db
      .select({
        value: avg(ratings.rating),
      })
      .from(ratings)
      .where(eq(ratings.bookId, Number(params.bookId)));

    await db
      .update(books)
      .set({
        rating: Math.round(Number(average[0].value ?? 0)),
        updatedAt: Date.now(),
      })
      .where(eq(books.id, Number(params.bookId)));

    return {
      success: true,
      message: "Rating deleted",
    };
  });
