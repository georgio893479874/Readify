import { Elysia, t } from "elysia";
import { eq, and, desc } from "drizzle-orm";
import { db } from "../index";
import { favorites, books } from "../db/schema";

export const favoriteRoutes = new Elysia({
  prefix: "/favorites",
})

  .get("/:userId", async ({ params }) => {
    const result = await db
      .select({
        favorite: favorites,
        book: books,
      })
      .from(favorites)
      .innerJoin(books, eq(favorites.bookId, books.id))
      .where(eq(favorites.userId, Number(params.userId)))
      .orderBy(desc(favorites.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/:userId/:bookId", async ({ params }) => {
    const result = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, Number(params.userId)),
          eq(favorites.bookId, Number(params.bookId)),
        ),
      );

    return {
      success: true,
      favorite: result.length > 0,
    };
  })

  .post(
    "/",
    async ({ body, set }) => {
      const exists = await db
        .select()
        .from(favorites)
        .where(
          and(
            eq(favorites.userId, body.userId),
            eq(favorites.bookId, body.bookId),
          ),
        );

      if (exists.length) {
        set.status = 409;

        return {
          success: false,
          message: "Book already in favorites",
        };
      }

      await db.insert(favorites).values({
        userId: body.userId,
        bookId: body.bookId,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: "Book added to favorites",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        bookId: t.Number(),
      }),
    },
  )

  .delete("/:userId/:bookId", async ({ params }) => {
    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.userId, Number(params.userId)),
          eq(favorites.bookId, Number(params.bookId)),
        ),
      );

    return {
      success: true,
      message: "Book removed from favorites",
    };
  })

  .delete("/clear/:userId", async ({ params }) => {
    await db
      .delete(favorites)
      .where(eq(favorites.userId, Number(params.userId)));

    return {
      success: true,
      message: "Favorites cleared",
    };
  });
