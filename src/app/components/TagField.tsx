"use client";
import React, { useState } from "react";
import Tag from "./Tag";

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
          <input
            type="text"
            value={tagInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus={true}
          ></input>
          <button
            className="bg-white px-2 py-1 text-black"
            onClick={() => setShowInput(false)}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
