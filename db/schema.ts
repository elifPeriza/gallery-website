import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferModel, relations, sql } from "drizzle-orm";

export const images = sqliteTable("images", {
  id: integer("id").primaryKey(),
  url: text("url"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const imagesRelations = relations(images, ({ many }) => ({
  tagsToImages: many(tagsToImages),
}));

export type Image = InferModel<typeof images, "select">;

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  tagsToImages: many(tagsToImages),
}));

export type Tag = InferModel<typeof tags, "select">;

export const tagsToImages = sqliteTable("tags_to_images", {
  tagId: text("tag_id")
    .notNull()
    .references(() => tags.id),
  imageId: integer("image_id")
    .notNull()
    .references(() => images.id),
});

export const tagsToImagesRelations = relations(tagsToImages, ({ one }) => ({
  tag: one(tags, {
    fields: [tagsToImages.tagId],
    references: [tags.id],
  }),
  image: one(images, {
    fields: [tagsToImages.imageId],
    references: [images.id],
  }),
}));
