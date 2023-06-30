"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "./Button";
import TagCreate from "./TagCreate";
import { useUploadThing } from "./UploadthingHelpers";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";

interface FileWithPreview extends File {
  preview: string;
}

type Tags = string[];

export default function ImageUpload() {
  const router = useRouter();
  const [tags, setTags] = useState<Tags>([]);
  const [tagInput, setTagInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [imageFile, setImageFile] = useState<FileWithPreview | null>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 10_000_000,
    onDropAccepted: ([acceptedFile]) => {
      setIsImageSelected(false);
      setImageFile(
        Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        })
      );
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleTagInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTagInput(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setTags((previousTags) => {
        const newTagArray = [...previousTags, tagInput];
        setTagInput("");
        setShowInput(false);
        return newTagArray;
      });
    }
  };

  const onTagClose = (tagIndex: number) => {
    setTags((previousTags) => previousTags.filter((_, i) => i !== tagIndex));
  };

  const handleUploadClick = () => {
    if (!imageFile) {
      setIsImageSelected(true);
      return;
    }

    imageFile && startUpload([imageFile], { tags: tagsObject });
    setIsOpen(true);
  };

  const errorMessages: Record<string, string> = {
    "file-too-large": "Die Datei ist zu groß. Maximale Größe: 10MB",
    "file-invalid-type": "Falscher Dateityp",
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name} className={` text-base text-[#EA9AA8]`}>
      {`Datei abgelehnt: `}
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{errorMessages[e.code]}</li>
        ))}
      </ul>
    </li>
  ));

  useEffect(() => {
    return () => {
      if (imageFile?.preview) {
        URL.revokeObjectURL(imageFile.preview);
      }
    };
  }, []);

  const tagsObject = tags.reduce((tagsObject, tag) => {
    return { ...tagsObject, [tag]: tag };
  }, {} as Record<string, string>);

  const { startUpload, isUploading } = useUploadThing("imageUpload", {
    onClientUploadComplete: () => {},
    onUploadError: () => {},
  });

  return (
    <>
      {!isOpen && (
        <>
          {/* Image Select */}
          <section
            className={`flex min-h-[250px] flex-col items-center rounded-sm bg-darkgrey p-6`}
          >
            {imageFile && (
              <div className="relative h-[350px] w-full md:h-[450px] ">
                <img
                  className=" h-full w-full object-cover"
                  src={imageFile.preview}
                ></img>
                <div className="to-[rgba(9, 49, 49, 0))] absolute inset-0 w-full bg-gradient-to-t from-[#101010] opacity-75"></div>

                <Button
                  variant="gray"
                  overlay={true}
                  onClick={() => setImageFile(null)}
                >
                  Bild ändern
                </Button>
              </div>
            )}
            {!imageFile && (
              <div
                {...getRootProps({
                  className:
                    "border border-dashed border-white rounded-sm h-[150px] p-4 ",
                })}
              >
                <input {...getInputProps()} />
                <h3 className={"text-center text-white "}>
                  Ziehe eine einzelne Bilddatei hierher oder klicke, um eine
                  auszuwählen
                </h3>
                <p className="text-center text-sm text-lightgrey">
                  Unterstützte Dateitypen: png, jpeg, webp
                </p>
              </div>
            )}
            <aside className="mt-4 text-center text-white">
              {imageFile && (
                <>
                  <h4>Bildname</h4>
                  <p className="italic">{imageFile.name}</p>
                </>
              )}
              {fileRejectionItems.length > 0 && <ul>{fileRejectionItems}</ul>}
            </aside>
          </section>
          {/* Tag Field */}
          <div>
            {tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-5    ">
                {tags.map((tag, i) => (
                  <TagCreate
                    key={i}
                    onTagClose={onTagClose}
                    tagIndex={i}
                    name={tag}
                  />
                ))}
              </div>
            )}

            {!showInput && (
              <button onClick={() => setShowInput(true)} className="text-white">
                + Tag hinzufügen
              </button>
            )}
            {showInput && (
              <div className="flex flex-row">
                <div className="relative">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleKeyDown}
                    autoFocus={true}
                    className={`rounded-lg border-2 border-purple bg-darkgrey px-4 py-1 font-medium text-white`}
                  ></input>
                  <button
                    className={`absolute -right-2 -top-2 flex h-[24px] w-[24px] cursor-pointer 
            items-center justify-center rounded-full bg-red text-sm font-semibold`}
                    onClick={() => {
                      setShowInput(false);
                      setTagInput("");
                    }}
                  >
                    x
                  </button>
                </div>
              </div>
            )}
          </div>

          {isImageSelected && (
            <p className="text-center text-lightred">
              Bitte wähle erst ein Bild aus.
            </p>
          )}
          <div className="flex h-[90px] flex-col justify-evenly gap-6 rounded-sm bg-darkgrey px-6 py-4">
            <div className="flex flex-row justify-between">
              <Button variant="transparent" href="/" target="_self">
                Abbrechen
              </Button>
              <Button
                disabled={isUploading}
                variant="turquoise"
                onClick={handleUploadClick}
              >
                Bild veröffentlichen
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Upload/Publish */}
      {imageFile && (
        <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-white/10" aria-hidden="true" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel>
              <div className="  absolute left-1/2 top-1/2  w-[50vw] -translate-x-1/2 -translate-y-1/2 bg-black sm:w-10/12 md:w-8/12 lg:w-1/2">
                <div className="relative ">
                  <img
                    src={imageFile?.preview}
                    className="mx-auto max-h-[60vh] object-contain  "
                  ></img>
                  <div className=" absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/50 font-sans text-lg font-semibold  text-white ">
                    {isUploading ? (
                      "Das Bild wird hochgeladen..."
                    ) : (
                      <>
                        <p>Super! Dein Bild ist jetzt in der Galerie.</p>
                        <Button
                          onClick={() => {
                            URL.revokeObjectURL(imageFile?.preview);
                            router.push("/");
                            router.refresh();
                          }}
                          variant="turquoise"
                        >
                          Zur Gallerie
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
}
