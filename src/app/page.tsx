import { desc, isNotNull } from "drizzle-orm";
import { images } from "../../db/schema";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import { db } from "../../db/drizzle";

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

export default async function Home() {
  const images = await getImages();

  return (
    <>
      <Header withButton={true} />
      <Gallery images={images} />
    </>
  );
}
