import { Elysia, t } from "elysia";
import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { notifications } from "../db/schema";

export const notificationRoutes = new Elysia({
  prefix: "/notifications",
})

  .get("/:userId", async ({ params }) => {
    const result = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, Number(params.userId)))
      .orderBy(desc(notifications.createdAt));

    return {
      success: true,
      data: result,
    };
  })

  .get("/unread/:userId", async ({ params }) => {
    const result = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, Number(params.userId)));

    return {
      success: true,
      data: result.filter((x) => !x.read),
    };
  })

  .post(
    "/",
    async ({ body }) => {
      await db.insert(notifications).values({
        userId: body.userId,
        title: body.title,
        message: body.message,
        read: false,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: "Notification created",
      };
    },
    {
      body: t.Object({
        userId: t.Number(),
        title: t.String(),
        message: t.String(),
      }),
    },
  )

  .patch("/:id/read", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(notifications)
      .where(eq(notifications.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
        message: "Notification not found",
      };
    }

    await db
      .update(notifications)
      .set({
        read: true,
      })
      .where(eq(notifications.id, Number(params.id)));

    return {
      success: true,
      message: "Notification marked as read",
    };
  })

  .patch("/user/:userId/read-all", async ({ params }) => {
    const list = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, Number(params.userId)));

    for (const notification of list) {
      await db
        .update(notifications)
        .set({
          read: true,
        })
        .where(eq(notifications.id, notification.id));
    }

    return {
      success: true,
      message: "All notifications marked as read",
    };
  })

  .delete("/:id", async ({ params, set }) => {
    const exists = await db
      .select()
      .from(notifications)
      .where(eq(notifications.id, Number(params.id)));

    if (!exists.length) {
      set.status = 404;

      return {
        success: false,
        message: "Notification not found",
      };
    }

    await db
      .delete(notifications)
      .where(eq(notifications.id, Number(params.id)));

    return {
      success: true,
      message: "Notification deleted",
    };
  })

  .delete("/user/:userId", async ({ params }) => {
    const list = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, Number(params.userId)));

    for (const notification of list) {
      await db
        .delete(notifications)
        .where(eq(notifications.id, notification.id));
    }

    return {
      success: true,
      message: "Notifications cleared",
    };
  });
