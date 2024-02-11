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
            text += `#italic#${childBlock.text}##italic`;
          } else {
            text += childBlock.text;
          }
          i++;
        }

        lines = text.match(/\S[^.?!]*[.?!]/g) || [];
      }

      return (
        <div>
          {lines.map((line, i) => {
            return (
              <p
                key={i}
                className="line text-xl opacity-0 hidden translate-x-[10rem] will-change-transform"
              >
                {(line.includes("#italic#") &&
                  line.split("#italic")?.map((phrase, j) => {
                    if (phrase.match(/#.*#/i)) {
                      let sanitizedPhrase = phrase;
                      sanitizedPhrase = sanitizedPhrase.replaceAll("#", "");

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
            triggerEl.textContent = "Next page";
            triggerEl.disabled = true;
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
        className="rich-text-container overflow-x-hidden h-12 w-full resize-y mb-10"
        ref={container}
      >
        <PortableText value={body} components={portableTextComponents} />
      </div>
      <div className="w-full flex justify-between absolute bottom-0 mt-4">
        <button className="expand-text-btn underline flex-1">Expand</button>
        <button className="next-line-btn underline flex-1">Next line</button>
      </div>
    </div>
  );
};

export default AnimatedRichText;
