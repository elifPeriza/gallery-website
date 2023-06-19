"use client";
import React from "react";
import { useDropzone } from "react-dropzone";

export default function ImageSelect() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));

  return (
    <section className="flex h-[250px] flex-col items-center rounded-sm bg-darkgrey p-6">
      <div
        {...getRootProps({
          className:
            "border border-dashed border-white rounded-sm h-[100px] p-4 ",
        })}
      >
        <input {...getInputProps()} />
        <p className="  text-white">
          Drag 'n' drop oder klicke, um Datei auszuwählen
        </p>
      </div>
      <aside className="mt-4 text-center text-white">
        <h4>Bildname</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
