"use client";
import gsap from "gsap";
import { ContextSafeFunc } from "@gsap/react";
import {
  FastArrowDown,
  FastArrowLeft,
  FastArrowRight,
  Minus,
  Plus,
  LongArrowUpRight,
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
  goToLine: (i: number, playLineAnim?: boolean) => void;
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
      goToLine(currentIndex - 1, false);

      setTextExpanded(false);
    } else {
      let prevLineIndex = currentIndex - 3 < 0 ? 0 : currentIndex - 3;

      const scrollToLine = Array.from(lines)[prevLineIndex];
      const prevLine = Array.from(lines)[prevLineIndex + 1];
      const currentLine = Array.from(lines)[prevLineIndex + 2];

      gsap.to(container, {
        height:
          (scrollToLine?.offsetHeight || 0) +
          (prevLine?.offsetHeight || 0) +
          (currentLine?.offsetHeight || 0),
        duration: 0.2,
        onComplete: () => {
          container?.scrollTo({
            top: (scrollToLine?.offsetTop || 0) - container?.offsetTop,
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

    let i = 0;
    while (i < lines.length) {
      lines[i].style.display = "none";

      i++;
    }
    goToLine(0, false);
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
  }, [currentIndex, textExpanded]);

  return (
    <div>
      <div className="w-full absolute bottom-0 mt-4">
        <div className="flex justify-between items-center mb-2">
          <button
            className="flex justify-center w-full underline flex-1"
            data-testid="to-top-btn"
            onClick={() => onToTop()}
          >
            <LongArrowUpRight className="w-10 h-10" />
          </button>
          <button
            className="flex justify-center w-full underline flex-1"
            data-testid="expand-text-btn"
            onClick={() => onExpandText()}
          >
            {textExpanded ? (
              <Minus className="w-10 h-10" data-testid="text-expanded-icon" />
            ) : (
              <Plus
                className="w-10 h-10"
                data-testid="text-not-expanded-icon"
              />
            )}
          </button>
        </div>
        <div className="flex justify-between items-center">
          {firstPage ? (
            <p className="text-center flex-1">The Start</p>
          ) : (
            <Link
              data-testid="prev-page-link"
              href={`${basePath}/${params.slug}/${parseInt(params.page) - 1}`}
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
                data-testid="next-page-link"
                href={`${basePath}/${params.slug}/${parseInt(params.page) + 1}`}
                className="underline flex-1 flex justify-center"
              >
                <FastArrowRight className="w-10 h-10" />
              </Link>
            )
          ) : (
            <button
              data-testid="next-line-btn"
              className="underline flex-1 flex justify-center"
              onClick={() => onNextLine()}
            >
              <FastArrowDown className="w-10 h-10" />
            </button>
          )}
        </div>
        <ProgressBar progress={currentIndex / lines.length} />
      </div>
    </div>
  );
};

export default LineAndPageNav;
