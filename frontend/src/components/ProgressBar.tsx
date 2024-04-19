interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-light-100 dark:bg-dark-100 rounded-full overflow-x-hidden ">
      <div
        data-testid="progress-bar"
        className="w-full h-1 bg-dark-50 dark:bg-light-100 transition-transform origin-left scale-0"
        style={{
          transform: `scaleX(${progress}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
