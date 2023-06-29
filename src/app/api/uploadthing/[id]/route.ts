import { NextResponse } from "next/server";
import { db } from "../../../../../db/drizzle";
import { images, tagsToImages } from "../../../../../db/schema";
import { eq } from "drizzle-orm";
import { utapi } from "uploadthing/server";
import { revalidatePath } from "next/cache";

export async function DELETE(request: Request) {
  try {
    const { pathname } = new URL(request.url);
    const imageId = parseInt(pathname.split("/").pop() || "0");
    
    if (imageId === 0) throw new Error("Image Id not found");

    const image = await db
      .select({
        imageURL: images.url,
      })
      .from(images)
      .where(eq(images.id, imageId))
      .all();

    const { imageURL } = image[0];
    if (!imageURL || !imageURL?.includes("/"))
      throw new Error("Image has no proper URL");
    
    const fileKey = decodeURI(imageURL.split("/").pop() as string);
  

    if (fileKey) {
      await utapi.deleteFiles(fileKey);
    } else {
      throw new Error("File key is undefined or empty");
    }
  
    await db
      .delete(tagsToImages)
      .where(eq(tagsToImages.imageId, imageId))
      .run();

    await db.delete(images).where(eq(images.id, imageId)).run();

    revalidatePath("/");

    return NextResponse.json({
      message: `image with filekey ${fileKey} successfully deleted including relations`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
