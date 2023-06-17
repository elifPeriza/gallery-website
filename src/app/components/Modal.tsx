"use client";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Modal({ src }: { src: string | undefined }) {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onClose={handleClose} className="relative z-50">
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
              <p className="text-white">tag tag tag</p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
