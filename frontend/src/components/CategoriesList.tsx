"use client";

import React, { useCallback, useState } from "react";

enum Categories {
  Highlight = "highlight",
  Books = "books",
  Paintings = "paintings",
  Songs = "songs",
}

interface Props {
  onSelectCat?: (cat: Categories) => void;
}

const CategoriesList = ({ onSelectCat }: Props) => {
  const [selectedCat, setCategory] = useState<Categories>(Categories.Highlight);

  const selectCat = useCallback((cat: Categories) => {
    setCategory(cat);
    if (onSelectCat) {
      onSelectCat(cat);
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {Object.values(Categories).map((cat, index, arr) => {
        const isHighlight = cat === Categories.Highlight;
        const isActive = selectedCat === cat;
        const lastCat = index === arr.length - 1;

        return (
          <React.Fragment key={cat}>
            <div
              className={
                isHighlight
                  ? "w-full flex-shrink-0 flex justify-center"
                  : undefined
              }
            >
              <button
                className={`${isActive ? "bg-dark-50 text-light-50 " : ""}capitalize px-1 py-pxs`}
                onClick={() => selectCat(cat)}
              >
                {isHighlight ? "today's highlight" : cat}
              </button>
            </div>
            {!lastCat ? (
              isHighlight ? (
                <div className=" w-full flex-shrink-0 flex justify-center my-2">
                  <span className="square-icon"></span>
                </div>
              ) : (
                <span className="square-icon mx-4"></span>
              )
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CategoriesList;
