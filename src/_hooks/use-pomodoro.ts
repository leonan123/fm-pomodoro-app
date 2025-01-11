import type { SettingsForm } from '@/_components/settings-dialog'
import type { Step } from '@/_components/ui/tabs'
import { playNotification } from '@/_utils/notification'
import { changeTheme, THEME_COLORS, THEME_FONTS } from '@/app/_constants/theme'
import { useEffect, useState } from 'react'

export function usePomodoro() {
  const [cycle, setCyle] = useState<Step[]>([])
  const [activeTab, setActiveTab] = useState<Step>('pomodoro-timer')
  const [appSetings, setAppSetings] = useState<SettingsForm>(() => {
    if (typeof window !== 'undefined') {
      const storedAppSetings = localStorage.getItem('pomodoro-app@appSetings')

      if (storedAppSetings) {
        const parsedAppSetings = JSON.parse(storedAppSetings)
        changeTheme(parsedAppSetings.theme)
        return JSON.parse(storedAppSetings)
      }
    }

    return {
      timer: {
        pomodoroTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
      },
      theme: {
        font: Object.keys(THEME_FONTS)[0],
        color: Object.keys(THEME_COLORS)[0],
      },
    }
  })

  function handleTimerFinish(step: Step) {
    playNotification()
    setCyle((prev) => [...prev, step])
  }

  function handleAppSetingsChange(values: SettingsForm) {
    setAppSetings(values)
    localStorage.setItem('pomodoro-app@appSetings', JSON.stringify(values))
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
    tabs: {
      activeTab,
      setActiveTab,
    },
    timer: {
      handleTimerFinish,
    },
    cycle,
    appSetings,
    handleAppSetingsChange,
  }
}
