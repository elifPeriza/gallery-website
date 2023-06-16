import Image from "next/image";
import photos from "../../../photos";

export default function Gallery() {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-2 md:grid-cols-3 lg:gap-4">
      
      {photos.map(({ imageSrc }) => {
        return (
          <img
            src={imageSrc}
            className="aspect-square object-cover"
           
          />
        );
      })}
    </div>
  );
}
