import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const images = sqliteTable("images", {
  id: integer("id").primaryKey(),
  url: text("url"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const tagsToImages = sqliteTable("tags_to_images", {
  tagId: text("tag_id")
    .notNull()
    .references(() => tags.id),
  imageId: integer("image_id")
    .notNull()
    .references(() => images.id),
});
