import { Elysia, t } from "elysia";
import { eq, and, desc } from "drizzle-orm";
import { db } from "../index";
import { achievements, userAchievements, users } from "../db/schema";

export const achievementRoutes = new Elysia({
  prefix: "/achievements",
})

  .get("/", async () => {
    const result = await db
      .select()
      .from(achievements)
      .orderBy(achievements.name);

    return {
      success: true,
      data: result,
    };
  })

  .get("/:id", async ({ params, set }) => {
    const result = await db
      .select()
      .from(achievements)
      .where(eq(achievements.id, Number(params.id)));

    if (!result.length) {
      set.status = 404;

      return {
        success: false,
        message: "Achievement not found",
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
      await db.insert(achievements).values({
        name: body.name,
        icon: body.icon,
        description: body.description,
      });

      return {
        success: true,
        message: "Achievement created",
      };
    },
    {
      body: t.Object({
        name: t.String(),
        icon: t.Optional(t.String()),
        description: t.Optional(t.String()),
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const exists = await db
        .select()
        .from(achievements)
        .where(eq(achievements.id, Number(params.id)));

      if (!exists.length) {
        set.status = 404;

        return {
          success: false,
          message: "Achievement not found",
        };
      }

      await db
        .update(achievements)
        .set({
          name: body.name,
          icon: body.icon,
          description: body.description,
        })
        .where(eq(achievements.id, Number(params.id)));

      return {
        success: true,
        message: "Achievement updated",
      };
    },
    {
      body: t.Object({
        name: t.String(),
        icon: t.Optional(t.String()),
        description: t.Optional(t.String()),
      }),
    },
  )

  .delete("/:id", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(achievements)
      .where(eq(achievements.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
        message: "Achievement not found",
      };
    }

    await db
      .delete(userAchievements)
      .where(eq(userAchievements.achievementId, Number(params.id)));

    await db.delete(achievements).where(eq(achievements.id, Number(params.id)));

    return {
      success: true,
      message: "Achievement deleted",
    };
  })

  .get("/user/:userId", async ({ params }) => {
    const result = await db
      .select({
        achievement: achievements,
        unlockedAt: userAchievements.unlockedAt,
      })
      .from(userAchievements)
      .innerJoin(
        achievements,
        eq(userAchievements.achievementId, achievements.id),
      )
      .where(eq(userAchievements.userId, Number(params.userId)))
      .orderBy(desc(userAchievements.unlockedAt));

    return {
      success: true,
      data: result,
    };
  })

  .post(
    "/user",
    async ({ body, set }) => {
      const exists = await db
        .select()
        .from(userAchievements)
        .where(
          and(
            eq(userAchievements.userId, body.userId),
            eq(userAchievements.achievementId, body.achievementId),
          ),
        );

      if (exists.length) {
        set.status = 409;

        return {
          success: false,
          message: "Achievement already unlocked",
        };
      }

      await db.insert(userAchievements).values({
        userId: body.userId,
        achievementId: body.achievementId,
        unlockedAt: Date.now(),
      });

      return {
        success: true,
        message: "Achievement unlocked",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        achievementId: t.Number(),
      }),
    },
  )

  .delete("/user/:userId/:achievementId", async ({ params }) => {
    await db
      .delete(userAchievements)
      .where(
        and(
          eq(userAchievements.userId, Number(params.userId)),
          eq(userAchievements.achievementId, Number(params.achievementId)),
        ),
      );

    return {
      success: true,
      message: "Achievement removed from user",
    };
  });
