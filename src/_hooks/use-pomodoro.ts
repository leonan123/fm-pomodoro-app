import type { Step } from '@/_components/ui/tabs'
import { playNotification } from '@/_utils/notification'
import { useEffect, useState } from 'react'

export function usePomodoro() {
  const [cycle, setCyle] = useState<Step[]>([])
  const [activeTab, setActiveTab] = useState<Step>('pomodoro-timer')

  function handleTimerFinish(step: Step) {
    playNotification()
    setCyle((prev) => [...prev, step])
  }

  useEffect(() => {
    const lastStep = cycle.at(-1)

    if (!lastStep) {
      setActiveTab('pomodoro-timer')
      return
    }

    const countPomodoro = cycle.filter(
      (step) => step === 'pomodoro-timer',
    ).length

    switch (lastStep) {
      case 'pomodoro-timer':
        if (countPomodoro >= 4) {
          setActiveTab('long-break')
        } else {
          setActiveTab('short-break')
        }
        break

      case 'short-break':
        setActiveTab('pomodoro-timer')
        break

      case 'long-break':
        setActiveTab('pomodoro-timer')
        setCyle([])
        break
    }
  }, [cycle])

  return {
    cycle,
    activeTab,
    setActiveTab,
    handleTimerFinish,
  }
}
