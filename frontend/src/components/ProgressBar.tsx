interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-zinc-300 dark:bg-zinc-800 rounded-full overflow-x-hidden">
      <div
        data-testid="progress-bar"
        className="w-full h-1 bg-sky-800 dark:bg-amber-300 transition-transform origin-left scale-0"
        style={{
          transform: `scaleX(${progress}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
