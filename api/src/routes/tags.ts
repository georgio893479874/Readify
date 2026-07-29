import { Elysia, t } from "elysia";
import { eq, asc, and } from "drizzle-orm";
import { db } from "../index";
import { tags, bookTags, books } from "../db/schema";

export const tagRoutes = new Elysia({
  prefix: "/tags",
})

  .get("/", async () => {
    const result = await db.select().from(tags).orderBy(asc(tags.name));

    return {
      success: true,
      data: result,
    };
  })

  .get("/:id", async ({ params, set }) => {
    const result = await db
      .select()
      .from(tags)
      .where(eq(tags.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Tag not found",
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
      await db.insert(tags).values({
        name: body.name,
      });

      return {
        success: true,
        message: "Tag created",
      };
    },
    {
      body: t.Object({
        name: t.String(),
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const exists = await db
        .select()
        .from(tags)
        .where(eq(tags.id, Number(params.id)));

      if (!exists.length) {
        set.status = 404;

        return {
          success: false,
          message: "Tag not found",
        };
      }

      await db
        .update(tags)
        .set({
          name: body.name,
        })
        .where(eq(tags.id, Number(params.id)));

      return {
        success: true,
        message: "Tag updated",
      };
    },
    {
      body: t.Object({
        name: t.String(),
      }),
    },
  )

  .delete("/:id", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(tags)
      .where(eq(tags.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
        message: "Tag not found",
      };
    }

    await db.delete(bookTags).where(eq(bookTags.tagId, Number(params.id)));

    await db.delete(tags).where(eq(tags.id, Number(params.id)));

    return {
      success: true,
      message: "Tag deleted",
    };
  })

  .get("/:id/books", async ({ params, set }) => {
    const tagId = Number(params.id);

    const tag = await db.select().from(tags).where(eq(tags.id, tagId));

    if (!tag.length) {
      set.status = 404;

      return {
        success: false,
        message: "Tag not found",
      };
    }

    const result = await db
      .select({
        book: books,
      })
      .from(bookTags)
      .innerJoin(books, eq(bookTags.bookId, books.id))
      .where(eq(bookTags.tagId, tagId));

    return {
      success: true,
      data: result,
    };
  })

  .post("/:id/books/:bookId", async ({ params }) => {
    const exists = await db
      .select()
      .from(bookTags)
      .where(
        and(
          eq(bookTags.tagId, Number(params.id)),
          eq(bookTags.bookId, Number(params.bookId)),
        ),
      );

    if (exists.length) {
      return {
        success: false,
        message: "Book already has this tag",
      };
    }

    await db.insert(bookTags).values({
      tagId: Number(params.id),
      bookId: Number(params.bookId),
    });

    return {
      success: true,
      message: "Tag added to book",
    };
  })

  .delete("/:id/books/:bookId", async ({ params }) => {
    await db
      .delete(bookTags)
      .where(
        and(
          eq(bookTags.tagId, Number(params.id)),
          eq(bookTags.bookId, Number(params.bookId)),
        ),
      );

    return {
      success: true,
      message: "Tag removed from book",
    };
  });
