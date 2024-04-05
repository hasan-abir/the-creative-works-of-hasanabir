"use client";

import CustomRichTextBody from "@/components/CustomRichTextBody";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef, useState, useMemo } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

interface Props {
  body: any[];
}

const NewLinesList = ({ body }: Props) => {
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [animOnMobile, setAnimOnMobile] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);
  const lineEls = useRef<HTMLParagraphElement[]>([]);
  const baseDuration = useRef<number>(0.3);

  const fullTWConfig = useMemo(() => {
    return resolveConfig(tailwindConfig);
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      lineEls.current = Array.from(document.querySelectorAll(".line"));

      const mm = gsap.matchMedia();

      mm.add(
        { isMobile: "(max-width: 639px)", isDesktop: "(min-width: 640px)" },
        (ctx) => {
          const { isMobile } = ctx.conditions as { isMobile: boolean };
          setAnimOnMobile(isMobile);
        }
      );

      goToLine();
    },
    { scope: container, dependencies: [animOnMobile] }
  );

  const goToLine = useCallback(
    contextSafe((next?: boolean, prev?: boolean) => {
      const goForward = next && !prev;
      const goBackward = !next && prev;
      let index = lineIndex;
      if (goForward) {
        index++;
      } else if (goBackward) {
        index--;
      }
      if (index > lineEls.current.length - 1 || index < 0) return null;
      const currentLineEl = lineEls.current[index];
      const prevLineEl = lineEls.current[index - 1];
      const prevPrevLineEl = lineEls.current[index - 2];
      const nextLineEl = lineEls.current[index + 1];

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (goForward && prevPrevLineEl) {
        tl.to(prevPrevLineEl, {
          height: 0,
          marginTop: 0,
          duration: baseDuration.current / 2,
        }).set(prevPrevLineEl, {
          display: "none",
        });
      }

      if (prevLineEl) {
        if (!prevLineEl.checkVisibility()) {
          tl.set(prevLineEl, {
            display: "block",
          }).to(
            prevLineEl,
            {
              height: "auto",
              opacity: 0.5,
              fontSize: animOnMobile
                ? fullTWConfig.theme.fontSize["xl"][0]
                : fullTWConfig.theme.fontSize["2xl"][0],
              duration: baseDuration.current / 2,
            },
            "<+0.1"
          );
        } else {
          tl.to(prevLineEl, {
            opacity: 0.5,
            fontSize: animOnMobile
              ? fullTWConfig.theme.fontSize["xl"][0]
              : fullTWConfig.theme.fontSize["2xl"][0],
            duration: baseDuration.current / 2,
          });
        }
      }

      if (goBackward && nextLineEl)
        tl.to(nextLineEl, {
          height: 0,
          marginTop: 0,
          duration: baseDuration.current / 2,
        }).set(nextLineEl, {
          display: "none",
        });

      if (currentLineEl) {
        if (!currentLineEl.checkVisibility()) {
          tl.set(currentLineEl, {
            display: "block",
            fontSize: animOnMobile
              ? fullTWConfig.theme.fontSize["2xl"][0]
              : fullTWConfig.theme.fontSize["4xl"][0],
          }).to(
            currentLineEl,
            {
              height: "auto",
              marginTop: index > 0 ? "0.5rem" : 0,
            },
            "<+0.1"
          );
        } else {
          tl.to(currentLineEl, {
            marginTop: index > 0 ? "0.5rem" : 0,
            opacity: 1,
            fontSize: animOnMobile
              ? fullTWConfig.theme.fontSize["2xl"][0]
              : fullTWConfig.theme.fontSize["4xl"][0],
          });
        }
      }

      if (index !== lineIndex) setLineIndex(index);
    }),
    [lineIndex, animOnMobile]
  );

  return (
    <section className="flex-1 flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-center py-4 ">
        <div ref={container} className="max-h-[60vh] overflow-x-hidden">
          <CustomRichTextBody
            body={body}
            classList={
              "line overflow-y-hidden leading-normal sm:leading-normal h-0 hidden transition-[font-size]" +
              " duration-" +
              (baseDuration.current / 2) * 1000
            }
          />
        </div>
      </div>
      <button
        onClick={() => {
          goToLine(false, true);
        }}
      >
        Go to previous line
      </button>
      <button
        onClick={() => {
          goToLine(true);
        }}
      >
        Go to next line
      </button>
    </section>
  );
};

export default NewLinesList;
