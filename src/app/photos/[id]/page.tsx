import Header from "@/app/components/Header";
import photos from "../../../../photos";

// params => { params: { id: '1' }, searchParams: {} }
export default function Page({ params }: { params: { id: string } }) {
  const photo = photos.find((photo) => photo.id === params.id);

  return (
    <div className="mx-auto max-w-[1600px] px-[5%]">
      <Header />
      <div className=" mx-auto mt-20 flex max-w-screen-md flex-col items-center gap-6">
        <img
          src={photo?.imageSrc}
          className="max-h-[650px] object-contain md:max-h-[750px]"
        />
        <p className="text-white">tag tag tag</p>
      </div>
    </div>
  );
}
