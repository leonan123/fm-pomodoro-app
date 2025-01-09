'use client'

import { calculatePercentage, secondsToMinutes } from '@/_utils/timer'
import { useEffect, useState } from 'react'

export function PomodoroTimer() {
  const [timerInSeconds, setTimerInSeconds] = useState(60 * 25)
  const [isRunning, setIsRunning] = useState(false)

  function handlePomodoro() {
    setIsRunning(!isRunning)
  }

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimerInSeconds((prevTimer) => prevTimer - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isRunning])

  const percentage = calculatePercentage(timerInSeconds, 60 * 25)

  useEffect(() => {
    if (timerInSeconds === 0) {
      setIsRunning(false)
      setTimerInSeconds(60 * 25)
      document.title = 'Pomodoro'
    }

    document.title = `${secondsToMinutes(timerInSeconds)} - pomodoro`
  }, [timerInSeconds])

  return (
    <button
      className="group progress-container p-4 w-11/12 max-w-[480px] max-h-[480px] aspect-square rounded-full relative flex-1"
      onClick={handlePomodoro}
    >
      <svg
        className="bg-muted rounded-full p-1 -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          className="fill-none stroke-primary stroke-[4px]"
          style={{
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 1s ease 0s',
          }}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray="283" // Circumference of the circle (2 * π * radius)
          strokeDashoffset={(283 * (100 - percentage)) / 100}
        />
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="font-bold text-8xl text-center">
          {secondsToMinutes(timerInSeconds)}
        </h2>
        <p className="text-center font-bold mt-2 w-full tracking-[15px] group-hover:text-primary transition-colors">
          {isRunning ? 'PAUSE' : 'START'}
        </p>
      </div>
    </button>
  )
}
