"use client";
import NewLineAndPageNav from "@/components/LineAndPageNav";
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
                className="line overflow-y-hidden mb-[1px] text-xl md:text-2xl opacity-0 hidden h-0 origin-[100%_0%] translate-x-[10rem] skew-x-[60deg] transition-[font-size] transition-[line-height] max-h-fit"
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

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [pageRead, setPageRead] = useState<boolean>(false);
  const [textExpanded, setTextExpanded] = useState<boolean>(false);
  const defaultDuration = useRef<number>(0.4);
  const container = useRef<HTMLDivElement>(null);
  const memoryOfLine = useRef<LineInMemory | null>(null);
  const tlRef = useRef<GSAPTimeline | null>(null);
  const elsOfLinesRef = useRef<NodeListOf<HTMLParagraphElement> | null>(null);

  const appendAndPrependToIncompleteLines = useCallback(() => {
    if (elsOfLinesRef.current) {
      const firstLine = Array.from(elsOfLinesRef.current)[0].textContent;
      const lastLine = Array.from(elsOfLinesRef.current)[
        elsOfLinesRef.current.length - 1
      ].textContent;
      const firstLineBeginsCompletely = /^[A-Z—]/.test(firstLine || "");
      const lastLineEndsCompletely = /[—.!?]$/.test(lastLine || "");

      if (!lastLineEndsCompletely) {
        Array.from(elsOfLinesRef.current)[
          elsOfLinesRef.current.length - 1
        ].textContent = `${lastLine}—` || "";
      }

      if (!firstLineBeginsCompletely) {
        Array.from(elsOfLinesRef.current)[0].textContent =
          `—${firstLine}` || "";
      }
    }
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      let timeline = gsap.timeline({
        paused: true,
        defaults: { duration: defaultDuration.current },
      });
      const elsOfLines: NodeListOf<HTMLParagraphElement> =
        document.querySelectorAll(".line");

      let i = 0;
      while (i < elsOfLines.length) {
        const lineEl = elsOfLines[i];
        const prevEl = elsOfLines[i - 1];

        if (i < 1) {
          timeline.add(`el-${i}`);
        }

        timeline
          .to(
            lineEl,
            {
              display: "block",
            },
            "<"
          )
          .to(
            lineEl,
            {
              height: "auto",
              delay: 0.1,
            },
            "<"
          )
          .to(lineEl, {
            x: 0,
            skewX: 0,
            opacity: 1,
            onComplete: () => {
              timeline.pause();
            },
          })
          .add(`el-${i + 1}`);

        if (prevEl) {
          timeline.to(prevEl, {
            height: 0,
            onComplete: () => {
              prevEl.style.display = "none";
            },
          });
        }

        timeline.to(
          lineEl,
          {
            opacity: 0.6,
            fontSize: "1rem",
            lineHeight: "1.5rem",
            duration: 0.2,
          },
          prevEl ? "<" : ">"
        );

        i++;
      }

      tlRef.current = timeline;
      elsOfLinesRef.current = elsOfLines;

      appendAndPrependToIncompleteLines();

      let initialIndex = 0;

      try {
        const objStored: LineInMemory = JSON.parse(
          localStorage.getItem(`${basePath}/${params.slug}`) || "{}"
        );
        memoryOfLine.current = objStored;
        const indexFromStorage = objStored && objStored[parseInt(params.page)];

        initialIndex =
          indexFromStorage && indexFromStorage >= 0 ? indexFromStorage : 0;
      } catch (error) {
        localStorage.removeItem(`${basePath}/${params.slug}`);
      }

      goToLine(initialIndex);
    },
    { scope: container }
  );

  const onExpandText = contextSafe(
    useCallback(
      (index: number) => {
        if (elsOfLinesRef.current) {
          const numberOfEls = index - 1 < 0 ? 0 : index - 1;

          const elsToAnimate = Array.from(elsOfLinesRef.current).slice(
            0,
            numberOfEls
          );

          if (elsToAnimate.length > 0) {
            if (textExpanded) {
              gsap.to(elsToAnimate, {
                height: 0,
                duration: defaultDuration.current,
              });
              gsap.to(elsToAnimate, { display: "none" });
            } else {
              gsap.to(elsToAnimate, { display: "block" });
              gsap.to(elsToAnimate, {
                height: "auto",
                duration: defaultDuration.current,
              });
            }
          }

          setTextExpanded(!textExpanded);
        }
      },
      [textExpanded]
    )
  );

  const goToLine = contextSafe(
    useCallback(
      (index: number) => {
        if (textExpanded) {
          onExpandText(index);
        }

        if (
          elsOfLinesRef.current &&
          index >= elsOfLinesRef.current.length - 1
        ) {
          setPageRead(true);
        }

        tlRef.current && tlRef.current.play(`el-${index}`);
        localStorage.setItem(
          `${basePath}/${params.slug}`,
          JSON.stringify({
            ...memoryOfLine.current,
            [params.page]: index,
          })
        );
        setCurrentIndex(index);
      },
      [textExpanded, basePath, onExpandText, params.page, params.slug]
    )
  );

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-center py-4 ">
        <div ref={container} className="max-h-[60vh] overflow-x-hidden">
          <PortableText value={body} components={portableTextComponents} />
        </div>
      </div>
      <NewLineAndPageNav
        lines={Array.from(elsOfLinesRef.current || [])}
        textExpanded={textExpanded}
        currentIndex={currentIndex}
        basePath={basePath}
        firstPage={firstPage}
        lastPage={lastPage}
        pageRead={pageRead}
        goToLine={goToLine}
        onExpandText={onExpandText}
        setPageRead={setPageRead}
      />
    </div>
  );
};

export default LinesList;
