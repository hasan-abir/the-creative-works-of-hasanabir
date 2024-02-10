"use client";

import { useGSAP } from "@gsap/react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import gsap from "gsap";
import { useRef } from "react";

interface Props {
  body: any[];
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
            text += `°~${childBlock.text}~°`;
          } else {
            text += childBlock.text;
          }
          i++;
        }

        lines = text.match(/\S[^.?!]*[.?!]/g) || [];
      }

      return (
        <div className="mb-4">
          {lines.map((line, i) => {
            return (
              <p
                key={i}
                className="line mr-[0.2rem] text-xl opacity-0 translate-x-[3rem] will-change-transform"
              >
                {(line.includes("°") &&
                  line.match(/[^°]+/g)?.map((phrase, j) => {
                    if (phrase.includes("~")) {
                      let sanitizedPhrase = phrase;
                      sanitizedPhrase = sanitizedPhrase.replaceAll("~", "");

                      return <em key={j}>{sanitizedPhrase}</em>;
                    }
                    return phrase;
                  })) ||
                  line}
              </p>
            );
          })}
        </div>
      );
    },
  },
};

const AnimatedRichText = ({ body }: Props) => {
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
          duration: 1,
          ease: "expo.out",
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
        gsap.to(container.current, {
          height: targets[i].offsetHeight,
          duration: 0.2,
          onComplete: () => {
            container.current?.scrollTo({
              top: targets[i].offsetTop - container.current?.offsetTop,
              behavior: "smooth",
            });
          },
        });

        timeline.play(`el-${i}`);
      };

      goToLine(currentIndex);
      currentIndex++;

      let onNextLine: (e: MouseEvent | KeyboardEvent) => void = () => {};
      let onExpandText: (e: MouseEvent | KeyboardEvent) => void = () => {};

      if (contextSafe) {
        onNextLine = contextSafe((e) => {
          if ((e as KeyboardEvent).key && (e as KeyboardEvent).key !== "Enter")
            return null;

          goToLine(currentIndex);

          if (currentIndex < targets.length - 1) {
            currentIndex++;
          } else {
            triggerEl.textContent = "Next page";
            triggerEl.disabled = true;
            document.body.removeEventListener("keyup", onNextLine);
            currentIndex++;
          }
        });

        onExpandText = contextSafe((e) => {
          if (
            (e as KeyboardEvent).key &&
            (e as KeyboardEvent).key !== "Backspace"
          )
            return null;

          expandPrevLines();
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
    <div className="flex-1 flex flex-col justify-center items-start">
      <div
        className="rich-text-container overflow-x-hidden h-12 resize-y"
        ref={container}
      >
        <PortableText value={body} components={portableTextComponents} />
      </div>
      <div className="flex mt-4">
        <button className="next-line-btn underline mr-4">Next line</button>
        <button className="expand-text-btn underline">Expand</button>
      </div>
    </div>
  );
};

export default AnimatedRichText;
