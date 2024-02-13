"use client";

import { useGSAP } from "@gsap/react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import gsap from "gsap";
import { useState, useRef } from "react";
import {
  FastArrowDown,
  FastArrowRight,
  FastArrowLeft,
  Plus,
  Minus,
} from "iconoir-react";
import Link from "next/link";

interface Props {
  body: any[];
  prevUrl: string;
  nextUrl: string;
  firstPage: boolean;
  lastPage: boolean;
}

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
          i++;
        }

        lines = text.match(/(?<!\S)[^.?!]*(?:[.?!](?!\S)|$)/g) || [];
      }

      const replaceMarkCharsIntoTags = (
        line: string
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
          return /[.?!]$/.test(line) === false
            ? line + "—"
            : /^[A-Z]/.test(line) === false
            ? "—" + line
            : line;
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
                {replaceMarkCharsIntoTags(line)}
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
  nextUrl,
  firstPage,
  lastPage,
}: Props) => {
  const [pageRead, setPageRead] = useState<boolean>(false);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    (context, contextSafe) => {
      let timeline = gsap.timeline({ paused: true });
      let currentIndex = 0;

      const targets: NodeListOf<HTMLElement> =
        document.querySelectorAll(".line");

      const triggerEl = document.querySelector(
        ".next-line-btn"
      ) as HTMLButtonElement;
      const expandBtn = document.querySelector(
        ".expand-text-btn"
      ) as HTMLButtonElement;

      let i = 0;

      while (i < targets.length) {
        const targetEl = targets[i];

        timeline = timeline.add(`el-${i}`).to(targetEl, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "ease.out",
          onComplete: () => {
            timeline.pause();
            targetEl.style.willChange = "auto";
          },
        });

        i++;
      }

      const expandPrevLines = () => {
        let prevLine = currentIndex - 3 < 0 ? 0 : currentIndex - 3;

        gsap.to(container.current, {
          height:
            targets[prevLine].offsetHeight +
            targets[prevLine + 1].offsetHeight +
            targets[prevLine + 2].offsetHeight,
          duration: 0.2,
          onComplete: () => {
            container.current?.scrollTo({
              top: targets[prevLine].offsetTop - container.current?.offsetTop,
              behavior: "smooth",
            });
          },
        });
      };

      const goToLine = (i: number) => {
        targets[i].style.display = "block";
        gsap.to(container.current, {
          height: targets[i].offsetHeight,
          duration: 0.2,
          onComplete: () => {
            container.current?.scrollTo({
              top: targets[i].offsetTop - container.current?.offsetTop,
              behavior: "smooth",
            });

            timeline.play(`el-${i}`);
          },
        });
      };

      goToLine(currentIndex);
      currentIndex++;

      let onNextLine: (e: MouseEvent | KeyboardEvent) => void = () => {};
      let onExpandText: (e: MouseEvent | KeyboardEvent) => void = () => {};

      let textExpanded = false;

      if (contextSafe) {
        onNextLine = contextSafe((e) => {
          if ((e as KeyboardEvent).key && (e as KeyboardEvent).key !== "Enter")
            return null;

          goToLine(currentIndex);

          if (currentIndex < targets.length - 1) {
            currentIndex++;
          } else {
            setPageRead(true);
            document.body.removeEventListener("keyup", onNextLine);
            currentIndex++;
          }

          if (textExpanded) {
            expandBtn.textContent = "Expand";
            textExpanded = false;
          }
        });

        onExpandText = contextSafe((e) => {
          if (
            (e as KeyboardEvent).key &&
            (e as KeyboardEvent).key !== "Backspace"
          )
            return null;

          if (textExpanded) {
            goToLine(currentIndex - 1);

            expandBtn.textContent = "Expand";

            textExpanded = false;
          } else {
            expandPrevLines();

            textExpanded = true;
            expandBtn.textContent = "Shrink";
          }
        });
      }

      triggerEl.addEventListener("click", onNextLine);
      document.body.addEventListener("keyup", onNextLine);
      expandBtn.addEventListener("click", onExpandText);
      document.body.addEventListener("keyup", onExpandText);

      return () => {
        triggerEl.removeEventListener("click", onNextLine);
        document.body.removeEventListener("keyup", onNextLine);
        expandBtn.removeEventListener("click", onExpandText);
        document.body.removeEventListener("keyup", onExpandText);
      };
    },
    { scope: container }
  );

  return (
    <div className="flex-1 flex flex-col justify-center items-start  relative">
      <div
        className="rich-text-container overflow-x-hidden h-12 w-full resize-y mb-24"
        ref={container}
      >
        <PortableText value={body} components={portableTextComponents} />
      </div>
      <div className="w-full absolute bottom-0 mt-4">
        <button className="expand-text-btn flex justify-center w-full underline flex-1 mb-2">
          Expand
        </button>
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
            <button className="next-line-btn underline flex-1 flex justify-center">
              <FastArrowDown className="w-10 h-10" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedRichText;
