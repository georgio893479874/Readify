import { Elysia, t } from "elysia";
import { like, or, eq } from "drizzle-orm";
import { db } from "../index";
import {
  books,
  authors,
  genres,
  tags,
  bookGenres,
  bookTags,
} from "../db/schema";

export const searchRoutes = new Elysia({
  prefix: "/search",
})

  .get(
    "/",
    async ({ query }) => {
      if (!query.q) {
        return {
          success: true,
          data: {
            books: [],
            authors: [],
            genres: [],
            tags: [],
          },
        };
      }

      const search = `%${query.q}%`;

      const foundBooks = await db
        .select()
        .from(books)
        .where(or(like(books.title, search), like(books.description, search)));

      const foundAuthors = await db
        .select()
        .from(authors)
        .where(
          or(
            like(authors.displayName, search),
            like(authors.description, search),
          ),
        );

      const foundGenres = await db
        .select()
        .from(genres)
        .where(or(like(genres.name, search), like(genres.slug, search)));

      const foundTags = await db
        .select()
        .from(tags)
        .where(like(tags.name, search));

      return {
        success: true,
        data: {
          books: foundBooks,
          authors: foundAuthors,
          genres: foundGenres,
          tags: foundTags,
        },
      };
    },
    {
      query: t.Object({
        q: t.Optional(t.String()),
      }),
    },
  )

  .get("/books", async ({ query }) => {
    if (!query.q) {
      return {
        success: true,
        data: [],
      };
    }

    const result = await db
      .select()
      .from(books)
      .where(
        or(
          like(books.title, `%${query.q}%`),
          like(books.description, `%${query.q}%`),
        ),
      );

    return {
      success: true,
      data: result,
    };
  })

  .get("/authors", async ({ query }) => {
    if (!query.q) {
      return {
        success: true,
        data: [],
      };
    }

    const result = await db
      .select()
      .from(authors)
      .where(
        or(
          like(authors.displayName, `%${query.q}%`),
          like(authors.description, `%${query.q}%`),
        ),
      );

    return {
      success: true,
      data: result,
    };
  })

  .get("/genres", async ({ query }) => {
    if (!query.q) {
      return {
        success: true,
        data: [],
      };
    }

    const result = await db
      .select()
      .from(genres)
      .where(like(genres.name, `%${query.q}%`));

    return {
      success: true,
      data: result,
    };
  })

  .get("/tags", async ({ query }) => {
    if (!query.q) {
      return {
        success: true,
        data: [],
      };
    }

    const result = await db
      .select()
      .from(tags)
      .where(like(tags.name, `%${query.q}%`));

    return {
      success: true,
      data: result,
    };
  });
