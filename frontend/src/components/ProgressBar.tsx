interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-light-50 dark:bg-dark-200 rounded-full overflow-x-hidden  border-2 border-dark-300 dark:border-dark-50">
      <div
        data-testid="progress-bar"
        className={
          "w-full h-1 bg-primary-50 transition-transform origin-left scale-0" +
          (progress < 1 && " border-r-2 border-dark-300 dark:border-dark-50")
        }
        style={{
          transform: `scaleX(${progress}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
