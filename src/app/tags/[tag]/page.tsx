import { eq } from "drizzle-orm";
import { db } from "../../../../db/drizzle";
import { tagsToImages } from "../../../../db/schema";
import Gallery from "@/app/components/Gallery";
import Header from "@/app/components/Header";

const getImagesByTagId = async (tag: string) => {
  const tagExists = await db.query.tagsToImages.findFirst({
    where: eq(tagsToImages.tagId, tag),
  });

  if (!tagExists) {
    throw new Error("No such tag");
  }

  const imagesbyTagID = await db.query.tagsToImages.findMany({
    where: eq(tagsToImages.tagId, tag),
    with: {
      image: {
        columns: { id: true, url: true, createdAt: true },
      },
    },
  });

  return imagesbyTagID
    .map((imageByTagID) => imageByTagID.image)
    .sort((a, b) =>
      a.createdAt && b.createdAt && a.createdAt < b.createdAt ? 1 : -1
    );
};

export const revalidate = 60;

export default async function Page({ params }: { params: { tag: string } }) {
  const imagesByTag = await getImagesByTagId(params.tag);

  return (
    <div>
      <Header withButton={true} />
      <div className=" text-right font-serif text-[5rem] font-extrabold text-white md:text-[7rem]">
        {params.tag}
      </div>
      <Gallery images={imagesByTag} />
    </div>
  );
}
