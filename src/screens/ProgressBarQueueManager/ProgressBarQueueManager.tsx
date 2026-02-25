import { useState } from "react";
import "./styles.less";
import ProgressBar from "../../components/ProgressBar";

type ProgressItem = { id: number; delay: number };

function ProgressBarQueueManager() {
  const [delay, setDelay] = useState(3);
  const [progressList, setProgressList] = useState<ProgressItem[]>([]);
  const [progressQueue, setProgressQueue] = useState<ProgressItem[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const appendHandler = () => {
    const newItem = { id: idCounter, delay };
    if (progressList.length < 5) {
      setProgressList((prev) => [...prev, newItem]);
    } else {
      setProgressQueue((prev) => [...prev, newItem]);
    }
    setIdCounter((prev) => prev + 1);
  };

  const onComplete = (itemId: number) => {
    let updatedProgressList = progressList.filter((item) => item.id !== itemId);
    if (progressQueue.length > 0) {
      const firstItem = progressQueue[0];
      const updatedProgressQueue = progressQueue.slice(1);
      setProgressQueue(updatedProgressQueue);
      updatedProgressList = [...updatedProgressList, firstItem];
    }
    setProgressList(updatedProgressList);
  };

  console.log(progressList, progressQueue);
  return (
    <div className="container">
      <h1 className="main-heading">ProgressBarQueueManager</h1>
      <div className="progress-bar-container">
        <div className="input-container">
          <input
            type="number"
            value={delay}
            min={0}
            placeholder="Enter Delay(in seconds)"
            onChange={(e) => setDelay(parseInt(e.target.value))}
          />
          <div className="btn-container">
            <button onClick={appendHandler}>Add {delay}s</button>
          </div>
        </div>
        <div className="progress-bar-wrapper">
          {progressList.map((item) => {
            return (
              <ProgressBar key={item.id} item={item} onComplete={onComplete} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressBarQueueManager;
