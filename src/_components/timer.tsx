'use client'

import { calculatePercentage, secondsToMinutes } from '@/_utils/timer'
import { useEffect, useState } from 'react'
import type { Step } from './ui/tabs'

interface TimerProps {
  timeInMinutes: number
  step: Step
  onTimerFinish: (step: Step) => void
  onTimerStart?: (step: Step) => void
}

export function Timer({
  step,
  onTimerFinish,
  onTimerStart,
  timeInMinutes,
}: TimerProps) {
  console.log(timeInMinutes)
  const [timerInSeconds, setTimerInSeconds] = useState(timeInMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)

  function handleToggleTimer() {
    setIsRunning((prevIsRunning) => {
      if (!prevIsRunning) {
        onTimerStart && onTimerStart(step)
      }
      return !prevIsRunning
    })
  }

  function resetTimer() {
    setIsRunning(false)
    setTimerInSeconds(timeInMinutes * 60)
  }

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimerInSeconds((prevTimer) => prevTimer - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isRunning])

  useEffect(() => {
    if (timerInSeconds <= 0) {
      document.title = 'Pomodoro'
      resetTimer()
      onTimerFinish(step)
    }

    document.title = `${secondsToMinutes(timerInSeconds)} - pomodoro`
  }, [timerInSeconds])

  useEffect(() => {
    if (timeInMinutes !== timerInSeconds / 60) {
      setTimerInSeconds(timeInMinutes * 60)
    }
  }, [timeInMinutes])

  console.log('timerInSeconds', timerInSeconds)
  const percentage = calculatePercentage(timerInSeconds, timeInMinutes * 60)

  return (
    <div className="progress-container relative aspect-square max-h-[480px] w-11/12 max-w-[480px] flex-1 rounded-full p-4">
      <svg
        className="-rotate-90 rounded-full bg-muted p-1"
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

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-center text-8xl font-bold">
          {secondsToMinutes(timerInSeconds)}
        </h2>

        <div className="flex gap-4">
          <button
            onClick={handleToggleTimer}
            className="mt-2 w-full text-center font-bold tracking-[15px] transition-colors hover:text-primary"
          >
            {isRunning ? 'PAUSE' : 'START'}
          </button>

          <span className="mt-2 text-4xl leading-none">|</span>

          <button
            onClick={resetTimer}
            className="ml-4 mt-2 w-full text-center font-bold tracking-[15px] transition-colors hover:text-primary"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  )
}
