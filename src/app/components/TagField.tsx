"use client";
import React, { useState } from "react";
import Tag from "./Tag";
import { roboto_flex } from "../fonts";

type Tags = string[];

export default function TagField() {
  const [tags, setTags] = useState<Tags>([]);
  const [tagInput, setTagInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-5    ">
          {tags.map((tag, i) => (
            <Tag key={i} onTagClose={onTagClose} tagIndex={i} tag={tag} />
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
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus={true}
              className={`${roboto_flex.variable} rounded-lg border-2 border-purple bg-darkgrey px-4 py-1 font-sans font-medium text-white`}
            ></input>
            <button
              className={`absolute -right-2 -top-2 flex h-[24px] w-[24px] cursor-pointer 
            items-center justify-center rounded-full bg-red text-sm font-semibold`}
              onClick={() => setShowInput(false)}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
