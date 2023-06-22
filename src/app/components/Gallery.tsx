import Link from "next/link";
import { db } from "../../../db/drizzle";
import { images } from "../../../db/schema";
import { desc, isNotNull } from "drizzle-orm";

const getImages = async () => {
  const allImages = await db
    .select()
    .from(images)
    .where(isNotNull(images.url))
    .orderBy(desc(images.createdAt))
    .all();
  return allImages;
};

export const revalidate = 60;

export default async function Gallery() {
  const images = await getImages();

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-2 md:grid-cols-3 lg:gap-4">
      {images.map(({ id, url }) => {
        return (
          <Link key={id} href={`/photos/${id}`}>
            <div>
              <img
                src={url as string}
                className="aspect-square w-full object-cover"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
