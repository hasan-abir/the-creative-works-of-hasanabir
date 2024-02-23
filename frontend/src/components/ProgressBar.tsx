interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full mt-4 bg-neutral-300 dark:bg-neutral-500 rounded-full overflow-x-hidden opacity-25">
      <div
        data-testid="progress-bar"
        className="w-full h-2 bg-neutral-500 dark:bg-neutral-300 transition-transform origin-left"
        style={{
          transform: `scaleX(${progress}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
