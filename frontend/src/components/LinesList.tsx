"use client";

import CustomRichTextBody from "@/components/CustomRichTextBody";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef, useState, useMemo } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import LineAndPageNav from "@/components/LineAndPageNav";
import tailwindConfig from "../../tailwind.config";
import lineInMemory from "@/utils/lineInMemory";
import { useParams, useRouter } from "next/navigation";

interface Props {
  basePath: string;
  firstPage: boolean;
  lastPage: boolean;
  body: any[];
}

const LinesList = ({ body, basePath, firstPage, lastPage }: Props) => {
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [animOnMobile, setAnimOnMobile] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);
  const lineEls = useRef<HTMLParagraphElement[]>([]);
  const baseDuration = useRef<number>(0.3);

  const params = useParams<{
    slug: string;
    page: string;
  }>();
  const router = useRouter();
  const fullTWConfig = useMemo(() => {
    return resolveConfig(tailwindConfig);
  }, []);

  const appendAndPrependToIncompleteLines = useCallback(() => {
    const firstLine = lineEls.current[0];
    const lastLine = lineEls.current[lineEls.current.length - 1];
    const firstLineBeginsCompletely = firstLine.textContent
      ? /^[A-Z—←[]/.test(firstLine.textContent || "")
      : true;
    const lastLineEndsCompletely = lastLine.textContent
      ? /[-—→:\].!?…]$/.test(lastLine.textContent || "")
      : true;

    if (!lastLineEndsCompletely) {
      lineEls.current[lineEls.current.length - 1].children[0].innerHTML =
        `${lastLine.children[0].innerHTML} &rarr;` || "";
    }

    if (!firstLineBeginsCompletely) {
      lineEls.current[0].children[0].innerHTML =
        `&larr; ${firstLine.children[0].innerHTML}` || "";
    }
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

      appendAndPrependToIncompleteLines();

      const objStored = lineInMemory.get(basePath, params.slug);

      let initialIndex = 0;

      if (objStored) {
        const indexFromStorage = objStored && objStored[parseInt(params.page)];

        indexFromStorage && indexFromStorage >= 0
          ? (initialIndex = indexFromStorage)
          : 0;
      }

      goToLine(false, false, initialIndex);
    },
    { scope: container, dependencies: [animOnMobile] }
  );

  const goToLine = contextSafe(
    useCallback(
      (next?: boolean, prev?: boolean, storedIndex?: number) => {
        const curtain = document.querySelector<HTMLDivElement>(".curtain");
        if (curtain && curtain.style.display !== "none") {
          gsap
            .timeline()
            .to(".curtain", {
              yPercent: -100,
              duration: baseDuration.current * 3,
              ease: "expo.inOut",
            })
            .set(".curtain", { display: "none" });
        }

        const goForward = next && !prev;
        const goBackward = !next && prev;
        let index = storedIndex || lineIndex;
        if (goForward) {
          index++;
        } else if (goBackward) {
          index--;
        }
        // Navigate to the prev and next page here

        if (index > lineEls.current.length - 1) {
          if (!lastPage) {
            router.push(
              `${basePath}/${params.slug}/${parseInt(params.page) + 1}`
            );
          }
          return null;
        }

        if (index < 0) {
          if (!firstPage) {
            router.push(
              `${basePath}/${params.slug}/${parseInt(params.page) - 1}`
            );
          }
          return null;
        }

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
          if (prevLineEl.style.display !== "block") {
            tl.set(prevLineEl, {
              display: "block",
            }).to(
              prevLineEl,
              {
                height: "auto",
                opacity: 0.6,
                fontSize: animOnMobile
                  ? fullTWConfig.theme.fontSize["base"][0]
                  : fullTWConfig.theme.fontSize["xl"][0],
                duration: baseDuration.current / 2,
              },
              "<+0.1"
            );
          } else {
            tl.to(prevLineEl, {
              opacity: 0.6,
              fontSize: animOnMobile
                ? fullTWConfig.theme.fontSize["base"][0]
                : fullTWConfig.theme.fontSize["xl"][0],
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
          if (currentLineEl.style.display !== "block") {
            tl.set(currentLineEl, {
              display: "block",
              fontSize: animOnMobile
                ? "1.75rem"
                : fullTWConfig.theme.fontSize["4xl"][0],
            })
              .to(
                currentLineEl,
                {
                  height: "auto",
                  marginTop: index > 0 ? "0.5rem" : 0,
                },
                "<+0.1"
              )
              .from(
                currentLineEl.querySelector("span"),
                {
                  yPercent: 100,
                  duration: baseDuration.current * 2,
                },
                "<"
              );
          } else {
            tl.to(currentLineEl, {
              marginTop: index > 0 ? "0.5rem" : 0,
              opacity: 1,
              fontSize: animOnMobile
                ? "1.75rem"
                : fullTWConfig.theme.fontSize["4xl"][0],
            });
          }
        }

        if (index !== lineIndex) {
          lineInMemory.set(basePath, params.slug, params.page, index);
          setLineIndex(index);
        }
      },
      [lineIndex, animOnMobile, fullTWConfig, basePath, params]
    )
  );

  return (
    <section className="flex-1 overflow-y-auto flex flex-col justify-between items-center">
      <div
        ref={container}
        className="flex-1 w-full max-w-[700px] overflow-y-auto flex flex-col justify-center py-4"
      >
        <div className="curtain absolute top-0 left-0 z-[1000] w-full h-screen bg-light-50 dark:bg-dark-100 border-b-8 border-light-100 dark:border-dark-50 origin-top flex items-center justify-center">
          <h1 className="font-bold uppercase text-[2rem] sm:text-4xl opacity-60">
            Flipping page
          </h1>
        </div>
        <div className="sm:my-8 overflow-y-auto rich-text-container">
          <CustomRichTextBody
            body={body}
            classList={"line overflow-y-hidden leading-snug h-0 hidden"}
          />
        </div>
      </div>
      <LineAndPageNav
        linesLength={lineEls.current.length}
        currentIndex={lineIndex}
        currentText={
          (lineEls.current[lineIndex] &&
            lineEls.current[lineIndex].textContent) ||
          ""
        }
        basePath={basePath}
        firstPage={firstPage}
        lastPage={lastPage}
        goToLine={goToLine}
      />
    </section>
  );
};

export default LinesList;
