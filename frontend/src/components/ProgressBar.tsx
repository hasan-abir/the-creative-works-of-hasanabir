interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-dark-200 rounded-full overflow-x-hidden  border-2 border-dark-200">
      <div
        data-testid="progress-bar"
        className={
          "rounded-xl h-1 bg-primary-50 transition-transform origin-left"
        }
        style={{
          transform: `scaleX(${progress})`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
