import { Elysia, t } from "elysia";
import { eq, asc } from "drizzle-orm";
import { db } from "../index";
import { genres, bookGenres, books } from "../db/schema";

export const genreRoutes = new Elysia({
  prefix: "/genres",
})

  .get("/", async () => {
    const result = await db.select().from(genres).orderBy(asc(genres.name));

    return {
      success: true,
      data: result,
    };
  })

  .get("/:id", async ({ params, set }) => {
    const result = await db
      .select()
      .from(genres)
      .where(eq(genres.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Genre not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  })

  .get("/slug/:slug", async ({ params, set }) => {
    const result = await db
      .select()
      .from(genres)
      .where(eq(genres.slug, params.slug));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Genre not found",
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
      await db.insert(genres).values({
        name: body.name,
        slug: body.slug,
      });

      return {
        success: true,
        message: "Genre created",
      };
    },
    {
      body: t.Object({
        name: t.String(),
        slug: t.String(),
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const exists = await db
        .select()
        .from(genres)
        .where(eq(genres.id, Number(params.id)));

      if (!exists.length) {
        set.status = 404;

        return {
          success: false,
          message: "Genre not found",
        };
      }

      await db
        .update(genres)
        .set({
          name: body.name,
          slug: body.slug,
        })
        .where(eq(genres.id, Number(params.id)));

      return {
        success: true,
        message: "Genre updated",
      };
    },
    {
      body: t.Object({
        name: t.String(),
        slug: t.String(),
      }),
    },
  )

  .delete("/:id", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(genres)
      .where(eq(genres.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
        message: "Genre not found",
      };
    }

    await db
      .delete(bookGenres)
      .where(eq(bookGenres.genreId, Number(params.id)));

    await db.delete(genres).where(eq(genres.id, Number(params.id)));

    return {
      success: true,
      message: "Genre deleted",
    };
  })

  .get("/:id/books", async ({ params, set }) => {
    const genreId = Number(params.id);

    const genre = await db.select().from(genres).where(eq(genres.id, genreId));

    if (!genre.length) {
      set.status = 404;

      return {
        success: false,
        message: "Genre not found",
      };
    }

    const result = await db
      .select({
        book: books,
      })
      .from(bookGenres)
      .innerJoin(books, eq(bookGenres.bookId, books.id))
      .where(eq(bookGenres.genreId, genreId));

    return {
      success: true,
      data: result,
    };
  })

  .post("/:id/books/:bookId", async ({ params }) => {
    await db.insert(bookGenres).values({
      genreId: Number(params.id),
      bookId: Number(params.bookId),
    });

    return {
      success: true,
      message: "Genre added to book",
    };
  })

  .delete("/:id/books/:bookId", async ({ params }) => {
    await db
      .delete(bookGenres)
      .where(eq(bookGenres.genreId, Number(params.id)));

    return {
      success: true,
      message: "Genre removed from book",
    };
  });
