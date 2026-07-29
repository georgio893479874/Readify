PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ratings` (
	`userId` integer NOT NULL,
	`bookId` integer NOT NULL,
	`rating` real NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_ratings`(`userId`, `bookId`, `rating`) SELECT `userId`, `bookId`, `rating` FROM `ratings`;--> statement-breakpoint
DROP TABLE `ratings`;--> statement-breakpoint
ALTER TABLE `__new_ratings` RENAME TO `ratings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;