import { Elysia } from "elysia";
import { authorRoutes } from "./authors";
import { bookRoutes } from "./books";
import { chapterRoutes } from "./chapters";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";
import { commentRoutes } from "./comments";
import { libraryRoutes } from "./library";
import { historyRoutes } from "./reading-history";
import { bookmarkRoutes } from "./bookmarks";
import { followRoutes } from "./follows";
import { favoriteRoutes } from "./favorites";
import { collectionRoutes } from "./collections";
import { achievementRoutes } from "./achievements";
import { ratingRoutes } from "./ratings";
import { genreRoutes } from "./genres";
import { notificationRoutes } from "./notifications";
import { reportRoutes } from "./reports";
import { searchRoutes } from "./search";
import { tagRoutes } from "./tags";
import { uploadRoutes } from "./uploads";

export const routes = new Elysia()
  .use(authorRoutes)
  .use(bookRoutes)
  .use(chapterRoutes)
  .use(authRoutes)
  .use(userRoutes)
  .use(commentRoutes)
  .use(libraryRoutes)
  .use(historyRoutes)
  .use(bookmarkRoutes)
  .use(followRoutes)
  .use(favoriteRoutes)
  .use(collectionRoutes)
  .use(achievementRoutes)
  .use(ratingRoutes)
  .use(genreRoutes)
  .use(notificationRoutes)
  .use(reportRoutes)
  .use(searchRoutes)
  .use(tagRoutes)
  .use(uploadRoutes);
