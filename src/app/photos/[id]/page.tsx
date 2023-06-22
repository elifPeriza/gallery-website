import Header from "@/app/components/Header";
import { db } from "../../../../db/drizzle";
import { images } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import TagDisplay from "@/app/components/TagDisplay";

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
      <Header withButton={false} />
      <div className=" mx-auto mt-20 flex max-w-screen-lg flex-col items-center gap-6">
        <img
          src={image?.url as string}
          className="max-h-[70vh] object-contain "
        />
        <div className="flex flex-wrap gap-3">
          {image?.tagsToImages &&
            image.tagsToImages.length > 0 &&
            image.tagsToImages.map(({ tag }) => (
              <TagDisplay key={tag.name} name={tag.name as string} />
            ))}
        </div>
      </div>
    </>
  );
}
