"use client";

import LineAndPageNav from "@/components/LineAndPageNav";
import splitBlockIntoLines from "@/utils/splitBlockIntoLines";
import { useGSAP } from "@gsap/react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import gsap from "gsap";
import { useParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";

interface Props {
  body: any[];
  basePath: string;
  firstPage: boolean;
  lastPage: boolean;
}

export type LineInMemory = Record<number, number>;

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children, value }) => {
      let lines: string[] = [];
      if (children) {
        let text = "";

        let i = 0;
        while (i < value.children.length) {
          const childBlock = value.children[i];

          if (childBlock.marks.includes("em")) {
            text += `#italic#em${childBlock.text}#em#italic`;
          } else if (childBlock.marks.includes("strong")) {
            text += `#bold#strong${childBlock.text}#strong#bold`;
          } else {
            text += childBlock.text;
          }

          if (i === value.children.length - 1) {
            text = text.trimEnd();
          }

          i++;
        }

        lines = splitBlockIntoLines(text);
      }

      const replaceMarkCharsIntoTags = (
        line: string,
        index: number
      ): string | (string | JSX.Element)[] => {
        const hasItalic = line.includes("#italic");
        const hasBold = line.includes("#bold");

        if (hasItalic || hasBold) {
          return line.split(/#(?:italic|bold)/)?.map((phrase, j) => {
            if (phrase.match(/#em.*#em/i)) {
              return <em key={j}>{phrase.replaceAll("#em", "")}</em>;
            }
            if (phrase.match(/#strong.*#strong/i)) {
              return (
                <strong key={j}>{phrase.replaceAll("#strong", "")}</strong>
              );
            }
            return phrase;
          });
        } else {
          return line;
        }
      };

      return (
        <div>
          {lines.map((line, i) => {
            return (
              <p
                key={i}
                className="line text-xl opacity-0 hidden translate-x-[10rem] will-change-transform"
              >
                {replaceMarkCharsIntoTags(line, i)}
              </p>
            );
          })}
        </div>
      );
    },
  },
};

const LinesList = ({ body, basePath, firstPage, lastPage }: Props) => {
  const params = useParams<{
    slug: string;
    page: string;
  }>();

  const [pageRead, setPageRead] = useState<boolean>(false);
  const [textExpanded, setTextExpanded] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);
  const lines = useRef<NodeListOf<HTMLParagraphElement> | null>(null);
  const timeline = useRef<GSAPTimeline | null>(null);
  const memoryOfLine = useRef<LineInMemory | null>(null);

  const appendAndPrependToIncompleteLines = useCallback(() => {
    if (lines.current) {
      const firstLine = Array.from(lines.current)[0].textContent;
      const lastLine = Array.from(lines.current)[lines.current.length - 1]
        .textContent;
      const firstLineBeginsCompletely = /^[A-Z—]/.test(firstLine || "");
      const lastLineEndsCompletely = /[—.!?]$/.test(lastLine || "");

      if (!lastLineEndsCompletely) {
        Array.from(lines.current)[lines.current.length - 1].textContent =
          `${lastLine}—` || "";
      }

      if (!firstLineBeginsCompletely) {
        Array.from(lines.current)[0].textContent = `—${firstLine}` || "";
      }
    }
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      timeline.current = gsap.timeline({ paused: true });

      lines.current = document.querySelectorAll(".line");

      if (lines.current) {
        let i = 0;

        while (i < lines.current.length) {
          const lineEl = Array.from(lines.current)[i];

          timeline.current = timeline.current.add(`el-${i}`).to(lineEl, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "ease.out",
            onComplete: () => {
              timeline.current?.pause();
              lineEl.style.willChange = "auto";
            },
          });

          i++;
        }

        appendAndPrependToIncompleteLines();

        let initialIndex = currentIndex;

        const objStored: LineInMemory = JSON.parse(
          localStorage.getItem(`${basePath}/${params.slug}`) || "{}"
        );
        memoryOfLine.current = objStored;
        const indexFromStorage = objStored && objStored[parseInt(params.page)];

        initialIndex =
          indexFromStorage && indexFromStorage >= 0 ? indexFromStorage : 0;

        goToLine(initialIndex);
        if (initialIndex > 0 && initialIndex < lines.current.length) {
          let j = 0;

          while (j < initialIndex) {
            Array.from(lines.current)[j].style.display = "block";

            j++;
          }
        }
        setCurrentIndex(initialIndex + 1);
        if (initialIndex > lines.current.length - 2) {
          setPageRead(true);
        }
      }
    },
    { scope: container }
  );

  const goToLine = contextSafe((i: number, playLineAnim: boolean = true) => {
    const nextLine = Array.from(lines.current || [])[i];

    if (nextLine) {
      nextLine.style.display = "block";
      gsap.to(container.current, {
        height: nextLine.offsetHeight,
        duration: 0.2,
        onComplete: () => {
          container.current?.scrollTo({
            top: nextLine.offsetTop - container.current?.offsetTop,
            behavior: "smooth",
          });

          if (playLineAnim) {
            timeline.current?.play(`el-${i}`);
          }

          if (i > 0) {
            localStorage.setItem(
              `${basePath}/${params.slug}`,
              JSON.stringify({
                ...memoryOfLine.current,
                [params.page]: i,
              })
            );
          }
        },
      });
    }
  });

  return (
    <div className="flex-1 flex flex-col justify-center items-start outline-0 relative">
      <div
        className="rich-text-container overflow-x-hidden h-12 w-full resize-y mb-32"
        ref={container}
      >
        <PortableText value={body} components={portableTextComponents} />
      </div>
      <LineAndPageNav
        lines={Array.from(lines.current || [])}
        container={container.current}
        textExpanded={textExpanded}
        currentIndex={currentIndex}
        basePath={basePath}
        firstPage={firstPage}
        lastPage={lastPage}
        pageRead={pageRead}
        goToLine={goToLine}
        contextSafe={contextSafe}
        setTextExpanded={setTextExpanded}
        setCurrentIndex={setCurrentIndex}
        setPageRead={setPageRead}
      />
    </div>
  );
};

export default LinesList;
