interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full mb-4 bg-neutral-300 dark:bg-neutral-800 rounded-full overflow-x-hidden opacity-25">
      <div
        className="w-full h-2 bg-neutral-600 transition-transform origin-left"
        style={{
          transform: `scaleX(${progress}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
