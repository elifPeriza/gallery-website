"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { roboto_flex } from "../fonts";

export default function ImageSelect() {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/webp": [],
      },
      maxFiles: 1,
      multiple: false,
      maxSize: 10_000_000,
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

  return (
    <section
      className={`${roboto_flex.variable} text-sans flex min-h-[250px] flex-col items-center rounded-sm bg-darkgrey p-6`}
    >
      <div
        {...getRootProps({
          className:
            "border border-dashed border-white rounded-sm h-[150px] p-4 ",
        })}
      >
        <input {...getInputProps()} />
        <h3 className={"text-center text-white "}>
          Ziehe eine einzelne Bilddatei hierher oder klicke, um eine auszuwählen
        </h3>
        <p className="text-center text-sm text-lightgrey">
          Unterstützte Dateitypen: png, jpeg, webp
        </p>
      </div>
      <aside className="mt-4 text-center text-white">
        {fileRejections.length === 0 && acceptedFiles.length > 0 && (
          <>
            <h4>Bildname</h4>
            <p>{acceptedFiles[0].name}</p>
          </>
        )}
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}
