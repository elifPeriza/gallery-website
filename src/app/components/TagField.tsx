"use client";
import React, { useState } from "react";

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

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-5">
          {tags.map((tag) => (
            <p className="text-white" key={tag}>
              {tag}
            </p>
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
