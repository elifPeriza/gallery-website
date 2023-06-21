import Modal from "@/app/components/Modal";
import { db } from "../../../../../db/drizzle";
import { and, eq, isNotNull } from "drizzle-orm";
import { images } from "../../../../../db/schema";

const getImage = async (id: string) => {
  const imageWithTags = await db.query.images.findFirst({
    where: and(eq(images.id, parseInt(id, 10)), isNotNull(images.url)),
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

export default async function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  const image = await getImage(params.id);

  return <Modal src={image?.url as string} tags={image?.tagsToImages} />;
}
