"use client";
import React from "react";
import { useDropzone } from "react-dropzone";

export default function ImageSelect() {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/webp": [],
      },
    });

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name} className="text-[#EA9AA8]">
      {`Datei abgelehnt: `}
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));
  console.log(files);
  return (
    <section className="flex h-[250px] flex-col items-center rounded-sm bg-darkgrey p-6">
      <div
        {...getRootProps({
          className:
            "border border-dashed border-white rounded-sm h-[150px] p-4 ",
        })}
      >
        <input {...getInputProps()} />
        <h3 className="  text-center text-white ">
          Drag 'n' drop oder klicke, um Datei auszuwählen
        </h3>
        <p className="text-center text-sm text-lightgrey">
          Unterstützte Dateitypen: png, jpeg, webp
        </p>
      </div>
      <aside className="mt-4 text-center text-white">
        {!fileRejectionItems.length && acceptedFiles.length > 0 && (
          <>
            <h4>Bildname</h4>
            <ul>{files}</ul>
          </>
        )}
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}
