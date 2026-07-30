import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  avatar: text(),
  bio: text(),
  role: text({ enum: ["user", "author", "admin"] })
    .default("user")
    .notNull(),
  verified: int({ mode: "boolean" }).default(false).notNull(),
  createdAt: int().notNull(),
  updatedAt: int().notNull(),
});

export const authors = sqliteTable("authors", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  displayName: text().notNull(),
  description: text(),
  website: text(),
  instagram: text(),
  facebook: text(),
  twitter: text(),
  createdAt: int().notNull(),
});

export const books = sqliteTable("books", {
  id: int().primaryKey({ autoIncrement: true }),
  authorId: int().notNull(),
  title: text().notNull(),
  slug: text().unique().notNull(),
  description: text(),
  cover: text(),
  file: text(),
  language: text().default("uk"),
  status: text({
    enum: ["draft", "published", "hidden", "completed"],
  }),
  ageLimit: int().default(0),
  views: int().default(0),
  likes: int().default(0),
  rating: int().default(0),
  createdAt: int().notNull(),
  updatedAt: int().notNull(),
});

export const chapters = sqliteTable("chapters", {
  id: int().primaryKey({ autoIncrement: true }),
  bookId: int().notNull(),
  title: text().notNull(),
  number: int().notNull(),
  content: text().notNull(),
  views: int().default(0),
  createdAt: int().notNull(),
  updatedAt: int().notNull(),
});

export const genres = sqliteTable("genres", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().unique().notNull(),
  slug: text().unique().notNull(),
});

export const bookGenres = sqliteTable("book_genres", {
  bookId: int().notNull(),
  genreId: int().notNull(),
});

export const tags = sqliteTable("tags", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().unique().notNull(),
});

export const bookTags = sqliteTable("book_tags", {
  bookId: int().notNull(),
  tagId: int().notNull(),
});

export const comments = sqliteTable("comments", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  chapterId: int(),
  bookId: int(),
  parentId: int(),
  content: text().notNull(),
  createdAt: int().notNull(),
});

export const ratings = sqliteTable("ratings", {
  userId: int().notNull(),
  bookId: int().notNull(),
  rating: real().notNull(),
});

export const favorites = sqliteTable("favorites", {
  userId: int().notNull(),
  bookId: int().notNull(),
  createdAt: int().notNull(),
});

export const readingHistory = sqliteTable("reading_history", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  chapterId: int().notNull(),
  progress: int().default(0),
  updatedAt: int().notNull(),
});

export const bookmarks = sqliteTable("bookmarks", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  chapterId: int().notNull(),
  position: int().notNull(),
  note: text(),
  createdAt: int().notNull(),
});

export const libraries = sqliteTable("libraries", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  bookId: int().notNull(),
  status: text({
    enum: ["reading", "planned", "completed", "dropped"],
  }),
});

export const follows = sqliteTable("follows", {
  userId: int().notNull(),
  authorId: int().notNull(),
  createdAt: int().notNull(),
});

export const notifications = sqliteTable("notifications", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  title: text().notNull(),
  message: text().notNull(),
  read: int({ mode: "boolean" }).default(false),
  createdAt: int().notNull(),
});

export const reports = sqliteTable("reports", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  commentId: int(),
  bookId: int(),
  reason: text().notNull(),
  createdAt: int().notNull(),
});

export const collections = sqliteTable("collections", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  name: text().notNull(),
  description: text(),
  createdAt: int().notNull(),
});

export const collectionBooks = sqliteTable("collection_books", {
  collectionId: int().notNull(),
  bookId: int().notNull(),
});

export const achievements = sqliteTable("achievements", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  icon: text(),
  description: text(),
});

export const userAchievements = sqliteTable("user_achievements", {
  userId: int().notNull(),
  achievementId: int().notNull(),
  unlockedAt: int().notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text().primaryKey(),
  userId: int().notNull(),
  expiresAt: int().notNull(),
});

export const refreshTokens = sqliteTable("refresh_tokens", {
  id: text().primaryKey(),
  userId: int().notNull(),
  token: text().notNull(),
  expiresAt: int().notNull(),
});

export const uploads = sqliteTable("uploads", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  path: text().notNull(),
  mime: text().notNull(),
  size: int().notNull(),
  createdAt: int().notNull(),
});
