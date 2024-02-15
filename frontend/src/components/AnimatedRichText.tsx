"use client";

import { useGSAP } from "@gsap/react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import gsap from "gsap";
import {
  FastArrowDown,
  FastArrowLeft,
  FastArrowRight,
  Minus,
  Plus,
  LongArrowUpRight,
} from "iconoir-react";
import Link from "next/link";
import { useRef, useState } from "react";

interface Props {
  body: any[];
  prevUrl: string;
  slug: string;
  page: number;
  nextUrl: string;
  firstPage: boolean;
  lastPage: boolean;
}

type LineInMemory = Record<number, number>;

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

        lines = text.match(/(?<!\S)[^.?!]*(?:[.?!](?!\S)|$)/g) || [];
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

const AnimatedRichText = ({
  body,
  prevUrl,
  page,
  slug,
  nextUrl,
  firstPage,
  lastPage,
}: Props) => {
  const [pageRead, setPageRead] = useState<boolean>(false);
  const [textExpanded, setTextExpanded] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);
  const memoryOfLine = useRef<LineInMemory | null>(null);
  const lines = useRef<NodeListOf<HTMLParagraphElement> | null>(null);
  const timeline = useRef<GSAPTimeline | null>(null);

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

        let initialIndex = currentIndex;

        const objStored: LineInMemory = JSON.parse(
          localStorage.getItem(slug) || "{}"
        );
        memoryOfLine.current = objStored;
        const indexFromStorage = objStored && objStored[page];

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
              slug,
              JSON.stringify({
                ...memoryOfLine.current,
                [page]: i,
              })
            );
          }
        },
      });
    }
  });

  const onNextLine = contextSafe(() => {
    if (textExpanded) {
      setTextExpanded(false);
    }

    goToLine(currentIndex);

    const totalNoOfLines: number = lines.current?.length || 0;

    setCurrentIndex(currentIndex + 1);

    if (currentIndex > totalNoOfLines - 2) {
      setPageRead(true);
    }
  });

  const onExpandText = contextSafe(() => {
    if (textExpanded) {
      goToLine(currentIndex - 1, false);

      setTextExpanded(false);
    } else {
      let prevLineIndex = currentIndex - 3 < 0 ? 0 : currentIndex - 3;

      const scrollToLine = Array.from(lines.current || [])[prevLineIndex];
      const prevLine = Array.from(lines.current || [])[prevLineIndex + 1];
      const currentLine = Array.from(lines.current || [])[prevLineIndex + 2];

      gsap.to(container.current, {
        height:
          (scrollToLine?.offsetHeight || 0) +
          (prevLine?.offsetHeight || 0) +
          (currentLine?.offsetHeight || 0),
        duration: 0.2,
        onComplete: () => {
          container.current?.scrollTo({
            top: (scrollToLine?.offsetTop || 0) - container.current?.offsetTop,
            behavior: "smooth",
          });
        },
      });

      setTextExpanded(true);
    }
  });

  const onToTop = contextSafe(() => {
    if (textExpanded) {
      setTextExpanded(false);
    }

    if (lines.current) {
      let i = 0;
      while (i < lines.current?.length) {
        Array.from(lines.current)[i].style.display = "none";

        i++;
      }
    }
    goToLine(0, false);
    setCurrentIndex(1);
    setPageRead(false);
    localStorage.setItem(
      slug,
      JSON.stringify({
        ...memoryOfLine.current,
        [page]: 0,
      })
    );
  });

  return (
    <div
      className="flex-1 flex flex-col justify-center items-start outline-0 relative"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onNextLine();
        }

        if (e.key === " ") {
          onExpandText();
        }
      }}
      tabIndex={0}
    >
      <div className="w-full mb-4 bg-neutral-300 dark:bg-neutral-800 rounded-full overflow-x-hidden opacity-25">
        <div
          className="w-full h-2 bg-neutral-600 transition-transform origin-left"
          style={{
            transform: `scaleX(${currentIndex / (lines.current?.length || 1)}`,
          }}
        ></div>
      </div>
      <div
        className="rich-text-container overflow-x-hidden h-12 w-full resize-y mb-24"
        ref={container}
      >
        <PortableText value={body} components={portableTextComponents} />
      </div>
      <div className="w-full absolute bottom-0 mt-4">
        <div className="flex justify-between items-center mb-2">
          <button
            className="flex justify-center w-full underline flex-1"
            onClick={() => onToTop()}
          >
            <LongArrowUpRight className="w-10 h-10" />
          </button>
          <button
            className="flex justify-center w-full underline flex-1"
            onClick={() => onExpandText()}
          >
            {textExpanded ? (
              <Minus className="w-10 h-10" />
            ) : (
              <Plus className="w-10 h-10" />
            )}
          </button>
        </div>
        <div className="flex justify-between items-center">
          {firstPage ? (
            <p className="text-center flex-1">The Start</p>
          ) : (
            <Link
              href={prevUrl}
              className="underline flex-1 flex justify-center"
            >
              <FastArrowLeft className="w-10 h-10" />
            </Link>
          )}

          {pageRead ? (
            lastPage ? (
              <p className="text-center flex-1">The End</p>
            ) : (
              <Link
                href={nextUrl}
                className="underline flex-1 flex justify-center"
              >
                <FastArrowRight className="w-10 h-10" />
              </Link>
            )
          ) : (
            <button
              className="underline flex-1 flex justify-center"
              onClick={() => onNextLine()}
            >
              <FastArrowDown className="w-10 h-10" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedRichText;
