"use client";

import lineInMemory from "@/utils/lineInMemory";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CTALink from "@/components/CTALink";

interface Props {
  basePath: string;
}

const ContinueReading = ({ basePath }: Props) => {
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
    <CTALink
      text={pageNumber > 1 ? "Continue Reading" : "Read Here"}
      href={`${basePath}/${params.slug}/${pageNumber}`}
      extraClasses="mb-4 sm:mb-6"
    />
  );
};

export default ContinueReading;
