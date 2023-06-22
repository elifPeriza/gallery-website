"use client";
import { Dialog } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import TagDisplay from "./TagDisplay";

export default function Modal({
  src,
  tags,
}: {
  src: string;
  tags?: { tag: { id: string; name: string | null } }[];
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
      <div className="fixed inset-0 bg-white/30" aria-hidden="true" />

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

            <div className="border border-t-darkgrey bg-black px-6 py-4">
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
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
