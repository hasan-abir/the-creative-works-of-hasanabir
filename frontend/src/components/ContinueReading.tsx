"use client";

import lineInMemory from "@/utils/lineInMemory";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  basePath: string;
  classList: string | undefined;
}

const ContinueReading = ({ basePath, classList }: Props) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const params = useParams<{ slug: string }>();

  useEffect(() => {
    const memoryOfPagesRead = lineInMemory.get(basePath, params.slug);

    let highestPageNumber = 1;
    if (memoryOfPagesRead) {
      let i = 0;

      while (i < Object.keys(memoryOfPagesRead).length) {
        const currentKey = parseInt(Object.keys(memoryOfPagesRead)[i]);

        if (currentKey > highestPageNumber) {
          highestPageNumber = currentKey;
        }

        i++;
      }
    }

    setPageNumber(highestPageNumber);
  }, [basePath, params.slug]);
  return (
    <Link
      className={classList}
      href={`${basePath}/${params.slug}/${pageNumber}`}
    >
      {pageNumber > 1 ? "Continue Reading" : "Read Here"}
    </Link>
  );
};

export default ContinueReading;
