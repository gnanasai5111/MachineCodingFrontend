import { useEffect, useRef, useState } from "react";
import "./styles.less";

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [showPause, setShowPause] = useState(false);
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startHandler = () => {
    if (intervalRef.current) return;
    let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    setShowPause(true);

    intervalRef.current = setInterval(() => {
      totalSeconds -= 1;
      if (totalSeconds <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setShowPause(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds - h * 3600) / 60);
      const s = totalSeconds - h * 3600 - m * 60;
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);
  };

  const resetHandler = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setShowPause(false);
  };

  const pauseHandler = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setShowPause(false);
  };

  const isDisabled = hours === 0 && minutes === 0 && seconds === 0;

  return (
    <div className="container">
      <h1 className="main-heading">Timer</h1>
      <div className="timer-input-container">
        <input
          type="number"
          value={hours}
          min={0}
          placeholder="HH"
          onChange={(e) => setHours(parseInt(e.target.value) || 0)}
          disabled={showPause}
        />
        <input
          type="number"
          value={minutes}
          placeholder="MM"
          min={0}
          onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
          disabled={showPause}
        />
        <input
          type="number"
          value={seconds}
          placeholder="SS"
          min={0}
          onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
          disabled={showPause}
        />

        <div className="button-container">
          {showPause ? (
            <button onClick={pauseHandler}>Pause</button>
          ) : (
            <button onClick={startHandler} disabled={isDisabled}>
              Start
            </button>
          )}
          <button onClick={resetHandler} disabled={isDisabled}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
