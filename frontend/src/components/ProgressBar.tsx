interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-light-50 dark:bg-dark-200 rounded-full overflow-x-hidden  border-2 border-dark-300 dark:border-dark-50">
      <div
        data-testid="progress-bar"
        className={
          "h-1 bg-primary-50 transition-[width]" +
          (progress < 1 &&
            progress > 0 &&
            " border-r-2 border-dark-300 dark:border-dark-50")
        }
        style={{
          width: `${100 * progress}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
