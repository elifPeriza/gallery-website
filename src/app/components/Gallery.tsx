import Image from "next/image";
import Link from "next/link";
import photos from "../../../photos";

export default function Gallery() {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-2 md:grid-cols-3 lg:gap-4">
      {photos.map(({ id, imageSrc }) => {
        return (
          <Link key={id} href={`/photos/${id}`}>
            <img src={imageSrc} className="aspect-square object-cover" />
          </Link>
        );
      })}
    </div>
  );
}
