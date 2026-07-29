import { Elysia, t } from "elysia";
import { eq, and, desc } from "drizzle-orm";
import { db } from "../index";
import { follows, authors } from "../db/schema";

export const followRoutes = new Elysia({
  prefix: "/follows",
})

  .get("/:userId", async ({ params }) => {
    const result = await db
      .select({
        follow: follows,
        author: authors,
      })
      .from(follows)
      .innerJoin(authors, eq(follows.authorId, authors.id))
      .where(eq(follows.userId, Number(params.userId)))
      .orderBy(desc(follows.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/:userId/:authorId", async ({ params }) => {
    const result = await db
      .select()
      .from(follows)
      .where(
        and(
          eq(follows.userId, Number(params.userId)),
          eq(follows.authorId, Number(params.authorId)),
        ),
      );

    return {
      success: true,
      following: result.length > 0,
    };
  })

  .post(
    "/",
    async ({ body, set }) => {
      const exists = await db
        .select()
        .from(follows)
        .where(
          and(
            eq(follows.userId, body.userId),
            eq(follows.authorId, body.authorId),
          ),
        );

      if (exists.length) {
        set.status = 409;

        return {
          success: false,
          message: "Already following this author",
        };
      }

      await db.insert(follows).values({
        userId: body.userId,
        authorId: body.authorId,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: "Author followed",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        authorId: t.Number(),
      }),
    },
  )

  .delete("/:userId/:authorId", async ({ params }) => {
    await db
      .delete(follows)
      .where(
        and(
          eq(follows.userId, Number(params.userId)),
          eq(follows.authorId, Number(params.authorId)),
        ),
      );

    return {
      success: true,
      message: "Author unfollowed",
    };
  })

  .get("/author/:authorId/followers", async ({ params }) => {
    const result = await db
      .select()
      .from(follows)
      .where(eq(follows.authorId, Number(params.authorId)));

    return {
      success: true,
      count: result.length,
      data: result,
    };
  });
