import Modal from "@/app/components/Modal";
import photos from "../../../../../photos";

export default function PhotoModal({ params }: { params: { id: string } }) {
  const photo = photos.find((photo) => photo.id === params.id);

  return <Modal src={photo?.imageSrc} />;
}
