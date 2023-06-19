"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { roboto_flex } from "../fonts";
import Button from "./Button";

interface FileWithPreview extends File {
  preview: string;
}

export default function ImageSelect() {
  const [imageFile, setImageFile] = useState<FileWithPreview | null>(null);
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
      setImageFile(
        Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        })
      );
    },
  });

  const errorMessages: Record<string, string> = {
    "file-too-large": "Die Datei ist zu groß. Maximale Größe: 10MB",
    "file-invalid-type": "Falscher Dateityp",
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li
      key={file.name}
      className={`${roboto_flex.variable} text-sans text-base text-[#EA9AA8]`}
    >
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

  return (
    <section
      className={`${roboto_flex.variable} text-sans flex min-h-[250px] flex-col items-center rounded-sm bg-darkgrey p-6`}
    >
      {imageFile && (
        <div className="relative h-[350px] w-full md:h-[450px] ">
          <img
            className=" h-full w-full object-cover"
            src={imageFile.preview}
            onLoad={() => {
              URL.revokeObjectURL(imageFile.preview);
            }}
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
  );
}
