import Header from "@/app/components/Header";
import { db } from "../../../../db/drizzle";
import { images } from "../../../../db/schema";
import { eq } from "drizzle-orm";

import ImageFrame from "@/app/components/ImageFrame";

const getImage = async (id: string) => {
  const imageWithTags = await db.query.images.findFirst({
    where: eq(images.id, parseInt(id, 10)),
    with: {
      tagsToImages: {
        columns: {},
        with: { tag: { columns: { name: true, id: true } } },
      },
    },
  });

  return imageWithTags;
};


export const revalidate = 60;

export default async function Page({ params }: { params: { id: string } }) {
  const image = await getImage(params.id);

  return (
    <>
      <Header withButton={true} />

      {image && <ImageFrame image={image} />}

      
    </>
  );
}
