interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-x-hidden">
      <div
        data-testid="progress-bar"
        className="w-full h-1 bg-blue-500 transition-transform origin-left scale-0"
        style={{
          transform: `scaleX(${progress}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
