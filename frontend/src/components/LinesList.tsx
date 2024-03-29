"use client";
import CustomRichTextBody from "@/components/CustomRichTextBody";
import NewLineAndPageNav from "@/components/LineAndPageNav";
import lineInMemory, { LineInMemory } from "@/utils/lineInMemory";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";

interface Props {
  body: any[];
  basePath: string;
  firstPage: boolean;
  lastPage: boolean;
}

const LinesList = ({ body, basePath, firstPage, lastPage }: Props) => {
  const params = useParams<{
    slug: string;
    page: string;
  }>();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [pageRead, setPageRead] = useState<boolean>(false);
  const [textExpanded, setTextExpanded] = useState<boolean>(false);
  const defaultDuration = useRef<number>(0.3);
  const container = useRef<HTMLDivElement>(null);
  const memoryOfLine = useRef<LineInMemory | null>(null);
  const tlRef = useRef<GSAPTimeline | null>(null);
  const elsOfLinesRef = useRef<NodeListOf<HTMLParagraphElement> | null>(null);

  const appendAndPrependToIncompleteLines = useCallback(() => {
    if (elsOfLinesRef.current) {
      const firstLine = Array.from(elsOfLinesRef.current)[0];
      const lastLine = Array.from(elsOfLinesRef.current)[
        elsOfLinesRef.current.length - 1
      ];
      const firstLineBeginsCompletely = firstLine.textContent
        ? /^[A-Z—[]/.test(firstLine.textContent || "")
        : true;
      const lastLineEndsCompletely = lastLine.textContent
        ? /[-—:\].!?…]$/.test(lastLine.textContent || "")
        : true;

      if (!lastLineEndsCompletely) {
        Array.from(elsOfLinesRef.current)[
          elsOfLinesRef.current.length - 1
        ].innerHTML = `${lastLine.innerHTML}—` || "";
      }

      if (!firstLineBeginsCompletely) {
        Array.from(elsOfLinesRef.current)[0].innerHTML =
          `—${firstLine.innerHTML}` || "";
      }
    }
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      let timeline = gsap.timeline({
        paused: true,
        defaults: { duration: defaultDuration.current, ease: "circ.out" },
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
              willChange: "transform",
            },
            "<"
          )
          .to(
            lineEl,
            {
              height: "auto",
              marginTop: "0.5rem",
              delay: 0.1,
              onStart: () => {
                lineEl.style.maxHeight = `${lineEl.scrollHeight}px`;
              },
            },
            "<"
          )
          .to(lineEl, {
            x: 0,
            skewX: 0,
            opacity: 1,
          })
          .to(lineEl, {
            willChange: "auto",
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
            marginTop: 0,
            fontSize: "1rem",
            lineHeight: "1.5rem",
            duration: defaultDuration.current / 4,
          },
          prevEl ? "<" : ">"
        );

        i++;
      }

      tlRef.current = timeline;
      elsOfLinesRef.current = elsOfLines;

      appendAndPrependToIncompleteLines();

      let initialIndex = 0;

      const objStored = lineInMemory.get(basePath, params.slug);

      if (objStored) {
        memoryOfLine.current = objStored;
        const indexFromStorage = objStored && objStored[parseInt(params.page)];

        initialIndex =
          indexFromStorage && indexFromStorage >= 0 ? indexFromStorage : 0;
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
            let i = 0;
            while (i < elsToAnimate.length) {
              if (textExpanded) {
                gsap
                  .timeline({
                    defaults: { duration: defaultDuration.current / 1.5 },
                  })
                  .to(elsToAnimate[i], {
                    height: 0,
                    delay: 0 + 0.03 * i,
                  })
                  .to(elsToAnimate[i].parentElement, { marginTop: 0 }, "<")
                  .to(elsToAnimate[i], { display: "none" });
              } else {
                const timeline = gsap
                  .timeline({
                    defaults: { duration: defaultDuration.current / 1.5 },
                  })
                  .to(elsToAnimate[i], { display: "block", duration: 0 })
                  .to(
                    elsToAnimate[i],
                    {
                      height: "auto",
                      delay: 0 + 0.03 * i,
                    },
                    "<"
                  );

                if (
                  i > 1 &&
                  elsToAnimate[i - 1] &&
                  elsToAnimate[i - 1].parentElement !==
                    elsToAnimate[i].parentElement
                ) {
                  timeline.to(
                    elsToAnimate[i].parentElement,
                    { marginTop: "2rem" },
                    "<"
                  );
                }
              }
              i++;
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
        lineInMemory.set(
          basePath,
          params.slug,
          params.page,
          index,
          memoryOfLine.current
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
          <CustomRichTextBody
            body={body}
            classList="line overflow-y-hidden text-xl md:text-2xl opacity-0 hidden h-0 origin-[100%_0%] translate-x-[10rem] skew-x-[60deg] transition-[font-size] transition-[line-height]"
          />
        </div>
      </div>
      <NewLineAndPageNav
        linesLength={Array.from(elsOfLinesRef.current || []).length}
        textExpanded={textExpanded}
        currentIndex={currentIndex}
        currentText={
          (Array.from(elsOfLinesRef.current || [])[currentIndex] &&
            Array.from(elsOfLinesRef.current || [])[currentIndex]
              .textContent) ||
          ""
        }
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
