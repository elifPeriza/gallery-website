import * as z from "zod";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "../../../../db/drizzle";
import { images, tags, tagsToImages } from "../../../../db/schema";
import { revalidatePath } from "next/cache";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUpload: f({ image: { maxFileSize: "4MB" } })
    .input(
      z.object({
        tags: z.record(
          z.string().transform((val) => val.toLowerCase().trim()),
          z.string().transform((val) => val.toLowerCase().trim())
        ),
      })
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      // This code runs on your server before upload

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      //pass the validated input from the Zod schema to the onUploadComplete function,
      return { input };
    })
    //  function you use to do something with the uploaded file, here persist in database
    .onUploadComplete(async ({ metadata, file, ...rest }) => {
      // This code RUNS ON YOUR SERVER after upload
      // mapping the metadata.input.tags object to an array to use drizzle query

      const tagsToInsert = Object.values(metadata.input.tags).map((tag) => ({
        id: tag,
        name: tag,
      }));

      if (tagsToInsert.length === 0) {
        await db
          .insert(images)
          .values({ url: file.url })
          .returning({ id: images.id })
          .all();
        revalidatePath("/");
        return;
      }

      await db
        .insert(tags)
        .values(tagsToInsert)
        .onConflictDoNothing()
        .returning()
        .all();

      const imageDB = await db
        .insert(images)
        .values({ url: file.url })
        .returning({ id: images.id })
        .all();

      revalidatePath("/");

      tagsToInsert.forEach(({ name }) => revalidatePath(`/tags/${name}`));

      const tagsToImageToInsert = tagsToInsert.map((tagToInsert) => ({
        imageId: imageDB[0].id,
        tagId: tagToInsert.id,
      }));

      const tagsToImageDB = await db
        .insert(tagsToImages)
        .values(tagsToImageToInsert)
        .returning()
        .all();
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
