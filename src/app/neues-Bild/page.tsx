import Header from "@/app/components/Header";

import ImageUpload from "../components/ImageUpload";

export default function ImageUploadPage() {
  return (
    <>
      <Header withButton={false} />
      <div className="mx-auto flex max-w-[600px] flex-col gap-6 p-3">
        <h2 className="self-center  text-base font-semibold text-white">
          Neues Bild
        </h2>
        <ImageUpload />
      </div>
    </>
  );
}
