CREATE TABLE `achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`icon` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `authors` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`displayName` text NOT NULL,
	`description` text,
	`website` text,
	`instagram` text,
	`facebook` text,
	`twitter` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `book_genres` (
	`bookId` integer NOT NULL,
	`genreId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `book_tags` (
	`bookId` integer NOT NULL,
	`tagId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `bookmarks` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`chapterId` integer NOT NULL,
	`position` integer NOT NULL,
	`note` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`authorId` integer NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL UNIQUE,
	`description` text,
	`cover` text,
	`language` text DEFAULT 'uk',
	`status` text,
	`ageLimit` integer DEFAULT 0,
	`views` integer DEFAULT 0,
	`likes` integer DEFAULT 0,
	`rating` integer DEFAULT 0,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `chapters` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`bookId` integer NOT NULL,
	`title` text NOT NULL,
	`number` integer NOT NULL,
	`content` text NOT NULL,
	`views` integer DEFAULT 0,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `collection_books` (
	`collectionId` integer NOT NULL,
	`bookId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `collections` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`chapterId` integer,
	`bookId` integer,
	`parentId` integer,
	`content` text NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`userId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `follows` (
	`userId` integer NOT NULL,
	`authorId` integer NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE,
	`slug` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE `libraries` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`status` text
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`read` integer DEFAULT false,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ratings` (
	`userId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`rating` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reading_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`chapterId` integer NOT NULL,
	`progress` integer DEFAULT 0,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `refresh_tokens` (
	`id` text PRIMARY KEY,
	`userId` integer NOT NULL,
	`token` text NOT NULL,
	`expiresAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`commentId` integer,
	`bookId` integer,
	`reason` text NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY,
	`userId` integer NOT NULL,
	`expiresAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` integer NOT NULL,
	`path` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_achievements` (
	`userId` integer NOT NULL,
	`achievementId` integer NOT NULL,
	`unlockedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`username` text NOT NULL UNIQUE,
	`email` text NOT NULL UNIQUE,
	`passwordHash` text NOT NULL,
	`avatar` text,
	`bio` text,
	`role` text DEFAULT 'user' NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
DROP TABLE `users_table`;