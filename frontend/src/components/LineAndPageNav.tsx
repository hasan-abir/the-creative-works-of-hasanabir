import ProgressBar from "@/components/ProgressBar";
import {
  ArrowLeft,
  ArrowRight,
  FastArrowUp,
  FastArrowDown,
  Pause,
  Play,
} from "iconoir-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Props {
  basePath: string;
  firstPage: boolean;
  lastPage: boolean;
  currentIndex: number;
  linesLength: number;
  currentText: string;
  goToLine: (next?: boolean, prev?: boolean, storedIndex?: number) => void;
}

const LineAndPageNav = ({
  basePath,
  firstPage,
  lastPage,
  currentIndex,
  linesLength,
  currentText,
  goToLine,
}: Props) => {
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | null>(null);

  const params = useParams<{ slug: string; page: string }>();

  const toggleAutoPlay = useCallback(() => {
    const updatedAutoPlay = !autoPlay;
    if (updatedAutoPlay === false && timeOutId) {
      clearTimeout(timeOutId);
    }
    setAutoPlay(updatedAutoPlay);
  }, [autoPlay, timeOutId]);

  useEffect(() => {
    if (
      autoPlay &&
      currentIndex < (linesLength - 1 < 0 ? 1 : linesLength - 1)
    ) {
      const words = currentText.split(" ");
      let msToWait = (words.length / 150) * 80000;
      msToWait = msToWait < 2000 ? 2000 : msToWait;

      const autoPlaytimeOut = setTimeout(() => {
        goToLine(true);
      }, msToWait);

      setTimeOutId(autoPlaytimeOut);
    } else {
      setAutoPlay(false);
    }
  }, [autoPlay, currentIndex, linesLength, goToLine, currentText]);

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <ProgressBar progress={currentIndex / (linesLength - 1)} />
      <div className="flex justify-between items-center mt-6 sm:mt-8">
        {firstPage ? (
          <p className="text-center text-sm sm:text-base">The Start</p>
        ) : (
          <Link
            data-testid="prev-page-link"
            aria-label="Go to previous page"
            title="Go to previous page"
            prefetch={false}
            href={`${basePath}/${params.slug}/${parseInt(params.page) - 1}`}
            className="underline flex justify-center"
          >
            <ArrowLeft className="w-8 h-8" />
          </Link>
        )}
        <button
          data-testid="prev-line-btn"
          className="underline flex justify-center"
          aria-label="Go to previous line"
          title="Go to previous line"
          onClick={() => {
            if (autoPlay) {
              toggleAutoPlay();
            }
            goToLine(false, true);
          }}
        >
          <FastArrowUp className="w-8 h-8" />
        </button>
        <button
          className="underline"
          data-testid="autoplay-btn"
          aria-label="Auto play"
          title="Auto play"
          onClick={toggleAutoPlay}
        >
          {autoPlay ? (
            <Pause data-testid="autoplay-pause-icon" className="w-8 h-8" />
          ) : (
            <Play data-testid="autoplay-icon" className="w-8 h-8" />
          )}
        </button>
        <button
          data-testid="next-line-btn"
          className="underline flex justify-center"
          aria-label="Go to next line"
          title="Go to next line"
          onClick={() => {
            if (autoPlay) {
              toggleAutoPlay();
            }
            goToLine(true);
          }}
        >
          <FastArrowDown className="w-8 h-8" />
        </button>
        {lastPage ? (
          <p className="text-center text-sm sm:text-base">The End</p>
        ) : (
          <Link
            data-testid="next-page-link"
            aria-label="Go to next page"
            title="Go to next page"
            prefetch={false}
            href={`${basePath}/${params.slug}/${parseInt(params.page) + 1}`}
            className="underline flex justify-center"
          >
            <ArrowRight className="w-8 h-8" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default LineAndPageNav;
