'use client';

import { useEffect, useRef, useState } from 'react';

type UseCountdownTimerProps = {
  initialTime: number;
  onTimeout?: () => void;
};

const useTimer = ({ initialTime, onTimeout }: UseCountdownTimerProps) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            onTimeout?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remainingTime, onTimeout]);

  const startTimer = () => {
    setRemainingTime(initialTime);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setRemainingTime(initialTime);
    setIsRunning(false);
  };

  return {
    remainingTime,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useTimer;
