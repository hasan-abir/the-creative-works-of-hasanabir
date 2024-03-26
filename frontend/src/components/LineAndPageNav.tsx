import ProgressBar from "@/components/ProgressBar";
import {
  ArrowLeft,
  ArrowRight,
  ArrowSeparateVertical,
  ArrowUnionVertical,
  FastArrowDown,
  LongArrowUpRight,
  Pause,
  Play,
} from "iconoir-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface Props {
  basePath: string;
  firstPage: boolean;
  lastPage: boolean;
  pageRead: boolean;
  currentIndex: number;
  textExpanded: boolean;
  linesLength: number;
  currentText: string;
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
  linesLength,
  currentText,
  setPageRead,
  onExpandText,
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
      const msToWait = (words.length / 200) * 60000;
      const autoPlaytimeOut = setTimeout(() => {
        goToLine(currentIndex + 1);
      }, msToWait);

      setTimeOutId(autoPlaytimeOut);
    } else {
      setAutoPlay(false);
    }
  }, [autoPlay, currentIndex, linesLength, goToLine, currentText]);

  return (
    <div className="w-full pb-6 sm:pb-8">
      <ProgressBar progress={currentIndex / (linesLength - 1)} />
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
            if (autoPlay) {
              toggleAutoPlay();
            }
            setPageRead(false);
            goToLine(0);
          }}
        >
          <LongArrowUpRight className="w-6 h-6" />
        </button>
        <button
          className="underline"
          data-testid="autoplay-btn"
          aria-label="Auto play"
          title="Auto play"
          onClick={toggleAutoPlay}
        >
          {autoPlay ? (
            <Pause data-testid="autoplay-pause-icon" className="w-6 h-6" />
          ) : (
            <Play data-testid="autoplay-icon" className="w-6 h-6" />
          )}
        </button>
        <button
          className="underline"
          data-testid="expand-text-btn"
          aria-label="Expand previous lines"
          title="Expand previous lines"
          onClick={() => {
            if (autoPlay) {
              toggleAutoPlay();
            }
            onExpandText(currentIndex);
          }}
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
              if (autoPlay) {
                toggleAutoPlay();
              }
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
