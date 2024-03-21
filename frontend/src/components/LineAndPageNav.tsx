import ProgressBar from "@/components/ProgressBar";
import {
  ArrowLeft,
  ArrowRight,
  ArrowSeparateVertical,
  ArrowUnionVertical,
  FastArrowDown,
  LongArrowUpRight,
} from "iconoir-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";

interface Props {
  basePath: string;
  firstPage: boolean;
  lastPage: boolean;
  pageRead: boolean;
  currentIndex: number;
  textExpanded: boolean;
  lines: HTMLParagraphElement[];
  setPageRead: Dispatch<SetStateAction<boolean>>;
  onExpandText: (index: number) => void;
  goToLine: (index: number) => void;
}

const LineAndPageNav = ({
  basePath,
  firstPage,
  lastPage,
  pageRead,
  currentIndex,
  textExpanded,
  lines,
  setPageRead,
  onExpandText,
  goToLine,
}: Props) => {
  const params = useParams<{ slug: string; page: string }>();

  return (
    <div className="w-full pb-6 sm:pb-8">
      <ProgressBar progress={currentIndex / (lines.length - 1)} />

      <div className="flex justify-between items-center mt-6 sm:mt-8">
        {firstPage ? (
          <p className="text-center text-xs sm:text-sm">The Start</p>
        ) : (
          <Link
            data-testid="prev-page-link"
            aria-label="Go to previous page"
            title="Go to previous page"
            href={`${basePath}/${params.slug}/${parseInt(params.page) - 1}`}
            className="underline flex justify-center"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        )}

        <button
          className="underline"
          data-testid="to-top-btn"
          aria-label="Start from the top"
          title="Start from the top"
          onClick={() => {
            setPageRead(false);
            goToLine(0);
          }}
        >
          <LongArrowUpRight className="w-6 h-6" />
        </button>
        <button
          className="underline"
          data-testid="expand-text-btn"
          aria-label="Expand previous lines"
          title="Expand previous lines"
          onClick={() => onExpandText(currentIndex)}
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
              aria-label="Go to next page"
              title="Go to next page"
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
            aria-label="Go to next line"
            title="Go to next line"
            onClick={() => {
              goToLine(currentIndex + 1);
            }}
          >
            <FastArrowDown className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LineAndPageNav;
