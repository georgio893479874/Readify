import { Elysia, t } from "elysia";
import { eq, and } from "drizzle-orm";
import { db } from "../index";
import { collections, collectionBooks, books } from "../db/schema";

export const collectionRoutes = new Elysia({
  prefix: "/collections",
})

  .get("/user/:userId", async ({ params }) => {
    const result = await db
      .select()
      .from(collections)
      .where(eq(collections.userId, Number(params.userId)));

    return {
      success: true,
      data: result,
    };
  })

  .get("/:id/books", async ({ params, set }) => {
    const collection = await db
      .select()
      .from(collections)
      .where(eq(collections.id, Number(params.id)));

    if (!collection.length) {
      set.status = 404;

      return {
        success: false,
        message: "Collection not found",
      };
    }

    const result = await db
      .select({
        book: books,
      })
      .from(collectionBooks)
      .innerJoin(books, eq(collectionBooks.bookId, books.id))
      .where(eq(collectionBooks.collectionId, Number(params.id)));

    return {
      success: true,
      data: result,
    };
  })

  .post(
    "/",
    async ({ body }) => {
      await db.insert(collections).values({
        userId: body.userId,
        name: body.name,
        description: body.description,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: "Collection created",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        name: t.String(),
        description: t.Optional(t.String()),
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const exists = await db
        .select()
        .from(collections)
        .where(eq(collections.id, Number(params.id)));

      if (!exists.length) {
        set.status = 404;

        return {
          success: false,
          message: "Collection not found",
        };
      }

      await db
        .update(collections)
        .set({
          name: body.name,
          description: body.description,
        })
        .where(eq(collections.id, Number(params.id)));

      return {
        success: true,
        message: "Collection updated",
      };
    },
    {
      body: t.Object({
        name: t.String(),
        description: t.Optional(t.String()),
      }),
    },
  )

  .delete("/:id", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(collections)
      .where(eq(collections.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
        message: "Collection not found",
      };
    }

    await db
      .delete(collectionBooks)
      .where(eq(collectionBooks.collectionId, Number(params.id)));

    await db.delete(collections).where(eq(collections.id, Number(params.id)));

    return {
      success: true,
      message: "Collection deleted",
    };
  })

  .post("/:id/books/:bookId", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(collectionBooks)
      .where(
        and(
          eq(collectionBooks.collectionId, Number(params.id)),
          eq(collectionBooks.bookId, Number(params.bookId)),
        ),
      );

    if (exists.length) {
      set.status = 409;

      return {
        success: false,
        message: "Book already exists in collection",
      };
    }

    await db.insert(collectionBooks).values({
      collectionId: Number(params.id),
      bookId: Number(params.bookId),
    });

    return {
      success: true,
      message: "Book added to collection",
    };
  })

  .delete("/:id/books/:bookId", async ({ params }) => {
    await db
      .delete(collectionBooks)
      .where(
        and(
          eq(collectionBooks.collectionId, Number(params.id)),
          eq(collectionBooks.bookId, Number(params.bookId)),
        ),
      );

    return {
      success: true,
      message: "Book removed from collection",
    };
  });
