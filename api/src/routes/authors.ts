import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../index";
import { authors, books } from "../db/schema";

export const authorRoutes = new Elysia({
  prefix: "/authors",
})

  .get("/", async () => {
    const result = await db.select().from(authors);

    return {
      success: true,
      data: result,
    };
  })

  .get("/:id", async ({ params, set }) => {
    const result = await db
      .select()
      .from(authors)
      .where(eq(authors.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Author not found",
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
      const now = Date.now();

      await db.insert(authors).values({
        userId: body.userId,
        displayName: body.displayName,
        description: body.description,
        website: body.website,
        instagram: body.instagram,
        facebook: body.facebook,
        twitter: body.twitter,
        createdAt: now,
      });

      return {
        success: true,
        message: "Author created",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        displayName: t.String(),
        description: t.Optional(t.String()),
        website: t.Optional(t.String()),
        instagram: t.Optional(t.String()),
        facebook: t.Optional(t.String()),
        twitter: t.Optional(t.String()),
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const result = await db
        .select()
        .from(authors)
        .where(eq(authors.id, Number(params.id)));

      if (!result.length) {
        set.status = 404;

        return {
          success: false,
          message: "Author not found",
        };
      }

      await db
        .update(authors)
        .set({
          displayName: body.displayName,
          description: body.description,
          website: body.website,
          instagram: body.instagram,
          facebook: body.facebook,
          twitter: body.twitter,
        })
        .where(eq(authors.id, Number(params.id)));

      return {
        success: true,
        message: "Author updated",
      };
    },
    {
      body: t.Object({
        displayName: t.String(),
        description: t.Optional(t.String()),
        website: t.Optional(t.String()),
        instagram: t.Optional(t.String()),
        facebook: t.Optional(t.String()),
        twitter: t.Optional(t.String()),
      }),
    },
  )

  .delete("/:id", async ({ params, set }) => {
    const result = await db
      .select()
      .from(authors)
      .where(eq(authors.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Author not found",
      };
    }

    await db.delete(authors).where(eq(authors.id, Number(params.id)));

    return {
      success: true,
      message: "Author deleted",
    };
  })

  .get("/:id/books", async ({ params, set }) => {
    const authorId = Number(params.id);

    const author = await db
      .select()
      .from(authors)
      .where(eq(authors.id, authorId));

    if (!author.length) {
      set.status = 404;

      return {
        success: false,
        message: "Author not found",
      };
    }

    const result = await db
      .select()
      .from(books)
      .where(eq(books.authorId, authorId));

    return {
      success: true,
      data: result,
    };
  });
