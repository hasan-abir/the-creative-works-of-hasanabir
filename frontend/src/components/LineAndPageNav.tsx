"use client";
import gsap from "gsap";
import { ContextSafeFunc } from "@gsap/react";
import {
  FastArrowDown,
  ArrowLeft,
  ArrowRight,
  LongArrowUpRight,
  ArrowSeparateVertical,
  ArrowUnionVertical,
} from "iconoir-react";
import { LineInMemory } from "@/components/LinesList";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";

interface Props {
  lines: HTMLParagraphElement[];
  container: HTMLDivElement | null;
  textExpanded: boolean;
  currentIndex: number;
  basePath: string;
  firstPage: boolean;
  lastPage: boolean;
  pageRead: boolean;
  contextSafe: ContextSafeFunc;
  setTextExpanded: Dispatch<SetStateAction<boolean>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setPageRead: Dispatch<SetStateAction<boolean>>;
  goToLine: (i: number, smoothScroll?: boolean, playLineAnim?: boolean) => void;
}

const LineAndPageNav = ({
  basePath,
  firstPage,
  lastPage,
  pageRead,
  lines,
  container,
  textExpanded,
  currentIndex,
  setTextExpanded,
  setCurrentIndex,
  setPageRead,
  contextSafe,
  goToLine,
}: Props) => {
  const params = useParams<{ slug: string; page: string }>();
  const memoryOfLine = useRef<LineInMemory | null>(null);

  const onNextLine = contextSafe(() => {
    if (textExpanded) {
      setTextExpanded(false);
    }

    goToLine(currentIndex);

    const totalNoOfLines: number = lines.length || 0;

    setCurrentIndex(currentIndex + 1);

    if (currentIndex > totalNoOfLines - 2) {
      setPageRead(true);
    }
  });

  const onExpandText = contextSafe(() => {
    if (textExpanded) {
      setTextExpanded(false);

      goToLine(currentIndex - 1, false);
    } else {
      gsap.to(container, {
        height: "auto",
      });

      setTextExpanded(true);
    }
  });

  const onToTop = contextSafe(() => {
    if (textExpanded) {
      setTextExpanded(false);
    }

    let i = 0;
    while (i < lines.length) {
      lines[i].style.display = "none";

      i++;
    }
    lines[0].removeAttribute("style");
    goToLine(0);
    setCurrentIndex(1);
    setPageRead(false);
    localStorage.setItem(
      `${basePath}/${params.slug}`,
      JSON.stringify({
        ...memoryOfLine.current,
        [params.page]: 0,
      })
    );
  });

  useEffect(() => {
    memoryOfLine.current = JSON.parse(
      localStorage.getItem(`${basePath}/${params.slug}`) || "{}"
    );

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onNextLine();
      }

      if (e.key === " ") {
        onExpandText();
      }
    };

    document.body.addEventListener("keyup", onKeyUp);

    return () => {
      document.body.removeEventListener("keyup", onKeyUp);
    };
  }, [
    basePath,
    params.slug,
    onExpandText,
    onNextLine,
    currentIndex,
    textExpanded,
  ]);

  return (
    <div className="w-full pb-6 sm:pb-8">
      <ProgressBar progress={currentIndex / lines.length} />
      <div className="flex justify-between items-center mt-6 sm:mt-8">
        {firstPage ? (
          <p className="text-center text-xs sm:text-sm">The Start</p>
        ) : (
          <Link
            data-testid="prev-page-link"
            href={`${basePath}/${params.slug}/${parseInt(params.page) - 1}`}
            className="underline flex justify-center"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        )}

        <button
          className="underline"
          data-testid="to-top-btn"
          onClick={() => onToTop()}
        >
          <LongArrowUpRight className="w-6 h-6" />
        </button>
        <button
          className="underline"
          data-testid="expand-text-btn"
          onClick={() => onExpandText()}
        >
          {textExpanded ? (
            <ArrowUnionVertical
              className="w-6 h-6"
              data-testid="text-expanded-icon"
            />
          ) : (
            <ArrowSeparateVertical
              className="w-6 h-6"
              data-testid="text-not-expanded-icon"
            />
          )}
        </button>

        {pageRead ? (
          lastPage ? (
            <p className="text-center text-xs sm:text-sm">The End</p>
          ) : (
            <Link
              data-testid="next-page-link"
              href={`${basePath}/${params.slug}/${parseInt(params.page) + 1}`}
              className="underline flex justify-center"
            >
              <ArrowRight className="w-6 h-6" />
            </Link>
          )
        ) : (
          <button
            data-testid="next-line-btn"
            className="underline flex justify-center"
            onClick={() => onNextLine()}
          >
            <FastArrowDown className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LineAndPageNav;
