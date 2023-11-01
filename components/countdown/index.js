import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { calculateTimeDiff } from "./utils";

const defaultremainigTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

export default function Countdown({ date }) {
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState(defaultremainigTime);
  console.log("ramianing time", remainingTime);
  useEffect(() => {
    setTimeInMs(date.getTime());
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeInMs]);
  const updateRemainingTime = (timeInMs) => {
    setRemainingTime(calculateTimeDiff(timeInMs));
  };

  return (
    <div className={styles.countdown}>
      <span>1</span>

      <span>2</span>
      <b>:</b>
      <span>4</span>
      <span>5</span>
      <b>:</b>
      <span>1</span>
      <span>0</span>
      <b>:</b>
      <span>1</span>
      <span>0</span>
    </div>
  );
}
