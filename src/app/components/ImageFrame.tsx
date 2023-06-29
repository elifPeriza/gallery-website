"use client";

import { useState } from "react";
import DeleteButton from "./DeleteButton";
import TagDisplay from "./TagDisplay";
import { Dialog } from "@headlessui/react";
import Button from "./Button";
import { useRouter } from "next/navigation";

type ImageFrameProps = {
  image?: {
    id: number;
    url: string | null;
    createdAt: string | null;
    tagsToImages: {
      tag: {
        id: string;
        name: string | null;
      };
    }[];
  };
};

type DeleteStatus =
  | "isDeleting"
  | "deletionCompleted"
  | "deletionError"
  | "noDeletionProcess";

const deleteStatusMessages = {
  isDeleting: "Das Bild wird gelöscht...",
  deletionCompleted: "Das Bild wurde gelöscht.",
  deletionError:
    "Oops, da ist was schiefgelaufen, das Bild konnte nicht gelöscht werden.",
  noDeletionProcess: "Bist du dir sicher, dass du das Bild löschen möchtest?",
};

export default function ImageFrame({ image }: ImageFrameProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStatus, setDeleteStatus] =
    useState<DeleteStatus>("noDeletionProcess");

  const router = useRouter();

  const handleDelete = async (imageId: number) => {
    try {
      setDeleteStatus("isDeleting");
      const response = await fetch(
        `http://localhost:3000/api/uploadthing/${imageId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        setDeleteStatus("deletionError");
        console.error("Failed to delete image");
      } else {
        setDeleteStatus("deletionCompleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" mx-auto mt-16 flex max-w-screen-lg flex-col items-center gap-3">
      <div className="relative">
        <img
          src={image?.url as string}
          className="mb-2 max-h-[70vh] object-contain "
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {image?.tagsToImages &&
          image.tagsToImages.length > 0 &&
          image.tagsToImages.map(({ tag }) => (
            <TagDisplay
              key={tag.name}
              name={tag.name as string}
              href={`/tags/${tag.name}`}
            />
          ))}
      </div>

      <DeleteButton onClickDelete={() => setShowDeleteModal(true)} />

      {image && showDeleteModal && (
        <Dialog
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-white/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="flex min-h-[200px] min-w-[450px] flex-col items-center gap-6 rounded-sm bg-black p-8 font-sans text-white ">
              <Dialog.Title className="text-lg font-semibold">
                Bild löschen
              </Dialog.Title>

              <p>{deleteStatusMessages[deleteStatus]}</p>
              {(deleteStatus === "noDeletionProcess" ||
                deleteStatus === "deletionError") && (
                <div className="mt-4 flex w-full flex-row justify-evenly">
                  <Button
                    variant="turquoise"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Abbrechen
                  </Button>
                  <Button
                    variant="transparent"
                    onClick={() => {
                      (async () => {
                        await handleDelete(image?.id);
                      })();
                    }}
                  >
                    {deleteStatus === "deletionError"
                      ? "Erneut versuchen"
                      : `Löschen`}
                  </Button>
                </div>
              )}

              {deleteStatus === "isDeleting" && <></>}
              {deleteStatus === "deletionCompleted" && (
                <Button variant="turquoise" onClick={() => router.push("/")}>
                  Zurück zur Gallerie
                </Button>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
}
