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
                className="line mr-[0.2rem] text-xl opacity-0 translate-x-[3rem]"
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

      let i = 0;

      while (i < targets.length) {
        const targetEl = targets[i];

        timeline = timeline.add(`el-${i}`).to(targetEl, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          onComplete: () => {
            timeline.pause();
          },
        });

        i++;
      }

      const scrollToLine = () => {
        container.current?.scrollTo(
          0,
          targets[currentIndex].offsetTop - container.current?.offsetTop
        );

        gsap.to(container.current, {
          height: targets[currentIndex].offsetHeight,
          duration: 0.2,
        });

        timeline.play(`el-${currentIndex}`);
        currentIndex++;
      };

      scrollToLine();

      let onClick: () => void = () => {};

      if (contextSafe) {
        onClick = contextSafe(() => {
          if (currentIndex < targets.length) {
            scrollToLine();
          }
          if (currentIndex === targets.length) {
            triggerEl.textContent = "Next page";
            triggerEl.disabled = true;
          }
        });
      }

      triggerEl.addEventListener("click", onClick);

      return () => {
        triggerEl.removeEventListener("click", onClick);
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
      <button className="next-line-btn mt-4 underline">Next line</button>
    </div>
  );
};

export default AnimatedRichText;
