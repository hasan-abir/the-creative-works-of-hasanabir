"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LineInMemory } from "@/components/LinesList";

interface Props {
  basePath: string;
  classList: string | undefined;
}

const ContinueReading = ({ basePath, classList }: Props) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const params = useParams<{ slug: string }>();

  useEffect(() => {
    const memoryOfPagesRead: LineInMemory = JSON.parse(
      localStorage.getItem(`${basePath}/${params.slug}`) || "{}"
    );

    let highestPageNumber = 1;

    let i = 0;

    while (i < Object.keys(memoryOfPagesRead).length) {
      const currentKey = parseInt(Object.keys(memoryOfPagesRead)[i]);

      if (currentKey > highestPageNumber) {
        highestPageNumber = currentKey;
      }

      i++;
    }

    setPageNumber(highestPageNumber);
  }, []);
  return (
    <Link
      className={classList}
      href={`${basePath}/${params.slug}/${pageNumber}`}
    >
      {pageNumber > 1 ? "Continue reading" : "Start reading"}
    </Link>
  );
};

export default ContinueReading;
