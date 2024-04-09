interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-brown-100 dark:bg-light-50 rounded-full overflow-x-hidden ">
      <div
        data-testid="progress-bar"
        className="w-full h-1 bg-brown-50 dark:bg-brown-50 transition-transform origin-left scale-0"
        style={{
          transform: `scaleX(${progress}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
