import { Elysia, t } from "elysia";
import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { books } from "../db/schema";

export const bookRoutes = new Elysia({
  prefix: "/books",
})

  .get("/", async () => {
    const result = await db.select().from(books).orderBy(desc(books.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/:bookId", async ({ params, set }) => {
    const result = await db
      .select()
      .from(books)
      .where(eq(books.id, Number(params.bookId)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Book not found",
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
      .from(books)
      .where(eq(books.slug, params.slug));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Book not found",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  })

  .post(
    "/",
    async ({ body, set }) => {
      try {
        const now = Date.now();

        await db.insert(books).values({
          authorId: body.authorId,
          title: body.title,
          slug: body.slug,
          description: body.description,
          cover: body.cover,
          language: body.language,
          status: "draft",
          createdAt: now,
          updatedAt: now,
        });

        return {
          success: true,
          message: "Book created",
        };
      } catch (error) {
        console.error(error);

        set.status = 500;

        return error;
      }
    },
    {
      body: t.Object({
        authorId: t.Number(),
        title: t.String(),
        slug: t.String(),
        description: t.Optional(t.String()),
        cover: t.Optional(t.String()),
        language: t.Optional(t.String()),
      }),
    },
  )

  .patch(
    "/:bookId",
    async ({ params, body, set }) => {
      const exists = await db
        .select()
        .from(books)
        .where(eq(books.id, Number(params.bookId)));

      if (!exists.length) {
        set.status = 404;

        return {
          success: false,
          message: "Book not found",
        };
      }

      await db
        .update(books)
        .set({
          title: body.title,
          description: body.description,
          cover: body.cover,
          language: body.language,
          updatedAt: Date.now(),
        })
        .where(eq(books.id, Number(params.bookId)));

      return {
        success: true,
        message: "Book updated",
      };
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.Optional(t.String()),
        cover: t.Optional(t.String()),
        language: t.Optional(t.String()),
      }),
    },
  )

  .delete("/:bookId", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(books)
      .where(eq(books.id, Number(params.bookId)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
      };
    }

    await db.delete(books).where(eq(books.id, Number(params.bookId)));

    return {
      success: true,
      message: "Book deleted",
    };
  })

  .post("/:bookId/publish", async ({ params }) => {
    await db
      .update(books)
      .set({
        status: "published",
        updatedAt: Date.now(),
      })
      .where(eq(books.id, Number(params.bookId)));

    return {
      success: true,
      message: "Book published",
    };
  })

  .post("/:bookId/hide", async ({ params }) => {
    await db
      .update(books)
      .set({
        status: "hidden",
        updatedAt: Date.now(),
      })
      .where(eq(books.id, Number(params.bookId)));

    return {
      success: true,
      message: "Book hidden",
    };
  })

  .post("/:bookId/complete", async ({ params }) => {
    await db
      .update(books)
      .set({
        status: "completed",
        updatedAt: Date.now(),
      })
      .where(eq(books.id, Number(params.bookId)));

    return {
      success: true,
      message: "Book completed",
    };
  })

  .post("/:bookId/draft", async ({ params }) => {
    await db
      .update(books)
      .set({
        status: "draft",
        updatedAt: Date.now(),
      })
      .where(eq(books.id, Number(params.bookId)));

    return {
      success: true,
      message: "Book moved to draft",
    };
  })

  .post("/:bookId/view", async ({ params, set }) => {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.id, Number(params.bookId)));

    if (!book.length) {
      set.status = 404;

      return {
        success: false,
        message: "Book not found",
      };
    }

    await db
      .update(books)
      .set({
        views: (book[0].views ?? 0) + 1,
        updatedAt: Date.now(),
      })
      .where(eq(books.id, Number(params.bookId)));

    return {
      success: true,
      views: (book[0].views ?? 0) + 1,
    };
  })

  .post("/:bookId/like", async ({ params }) => {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.id, Number(params.bookId)));

    await db
      .update(books)
      .set({
        likes: (book[0].likes ?? 0) + 1,
        updatedAt: Date.now(),
      })
      .where(eq(books.id, Number(params.bookId)));

    return {
      success: true,
    };
  });
