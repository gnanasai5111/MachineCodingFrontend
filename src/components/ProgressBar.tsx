import { useEffect, useRef, useState } from "react";

function ProgressBar({
  item,
  onComplete,
}: {
  item: { id: number; delay: number };
  onComplete: (id: number) => void;
}) {
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const ms = 100;
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 * ms) / (item.delay * 1000);
        if (next >= 100) {
          clearInterval(timerRef.current);
          onComplete(item.id);
          return 100;
        }
        return next;
      });
    }, ms);
    return () => clearInterval(timerRef.current);
  }, [item, onComplete]);

  const getColorClass = (value: number) => {
    if (value < 40) return "low";
    if (value < 80) return "medium";
    return "high";
  };

  return (
    <div className="progress-label">
      <label>Progress: {Math.round(progress)}%</label>
      <progress
        id="file"
        value={progress}
        max={100}
        className={`progress-bar ${getColorClass(progress)}`}
      >
        {progress}
      </progress>
    </div>
  );
}

export default ProgressBar;
