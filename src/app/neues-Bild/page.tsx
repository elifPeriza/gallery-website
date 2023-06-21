import Button from "@/app/components/Button";
import Header from "@/app/components/Header";
import { roboto_flex } from "@/app/fonts";
import ImageSelect from "../components/ImageSelect";

import TagCreateContainer from "../components/TagCreateContainer";

export default function ImageUploadPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-[5%]">
      <Header withButton={false} />
      <div className="mx-auto flex max-w-[600px] flex-col gap-6 p-3">
        <h2
          className={`${roboto_flex.variable} self-center font-sans text-base font-semibold text-white`}
        >
          Neues Bild
        </h2>
        <ImageSelect />
        <div>
          <TagCreateContainer />
        </div>
        <div className="flex h-[150px] flex-col justify-evenly gap-6 rounded-sm bg-darkgrey px-6 py-4">
          <div>
            <p className="pb-1 text-white">Bildname.png</p>
            <div className="h-4 bg-[#f5f5f5]"></div>
          </div>

          <div className="flex flex-row justify-between">
            <Button variant="transparent">Abbrechen</Button>
            <Button variant="turquoise">Bild veröffentlichen</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
