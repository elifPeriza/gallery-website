"use client";
import { Dialog } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import TagDisplay from "./TagDisplay";
import Button from "./Button";

export default function Modal({
  src,
  tags,
  imageId,
}: {
  src: string;
  tags?: { tag: { id: string; name: string | null } }[];
  imageId: string;
}) {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  const path = usePathname();

  return (
    <Dialog
      open={path.startsWith("/photos")}
      onClose={handleClose}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div
        data-testid="modalbackdrop"
        className="fixed inset-0 bg-white/30"
        aria-hidden="true"
      />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel>
          <div className="absolute left-1/2 top-1/2 w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-black sm:w-10/12 md:w-8/12 lg:w-1/2">
            <div>
              <img
                src={src}
                className="mx-auto aspect-square max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="border border-t-darkgrey bg-black px-3 py-4 md:px-6">
              <div className="flex flex-row justify-between">
                <div className="flex flex-wrap gap-3">
                  {tags &&
                    tags.length > 0 &&
                    tags.map(({ tag }) => (
                      <TagDisplay
                        key={tag.id}
                        name={tag.name as string}
                        href={`/tags/${tag.name}`}
                      />
                    ))}
                </div>
                <div className="ml-2 min-w-[85px] self-end">
                  <a href={`/photos/${imageId}`}>
                    <Button variant="transparent">Zum Bild</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
