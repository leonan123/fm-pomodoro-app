'use client'

import * as RadixTabs from '@radix-ui/react-tabs'
import Image from 'next/image'
import { Timer } from '../timer'
import { TABS } from '@/app/_constants/app'
import { usePomodoro } from '@/_hooks/use-pomodoro'

export type Step = 'pomodoro-timer' | 'short-break' | 'long-break'

export function Tabs() {
  const { handleTimerFinish, activeTab, setActiveTab } = usePomodoro()

  return (
    <RadixTabs.Root
      defaultValue="pomodoro-timer"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as Step)}
      className="flex h-full flex-col items-center gap-10 sm:gap-20"
    >
      <RadixTabs.List className="relative z-10 flex h-[63px] w-full max-w-[373px] items-center rounded-full bg-muted p-2 text-foreground/40">
        {TABS.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            className="h-full w-[120px] rounded-full text-center text-sm font-bold transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:hover:text-foreground"
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      {TABS.map((tab) => {
        const timeByStepMap = {
          'pomodoro-timer': 0.05,
          'short-break': 0.05,
          'long-break': 0.05,
        }

        const timeByStap = timeByStepMap[tab.value as Step]

        return (
          <RadixTabs.Content
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:grid data-[state=active]:w-full data-[state=active]:flex-1 data-[state=active]:place-items-center"
          >
            <Timer
              timeInMinutes={timeByStap}
              onTimerFinish={handleTimerFinish}
              step={tab.value as Step}
            />
          </RadixTabs.Content>
        )
      })}

      <div className="pb-6 sm:pb-32">
        <button className="relative size-7 opacity-50 transition-opacity hover:opacity-100">
          <span className="sr-only">Open settings</span>
          <Image src="icon-settings.svg" alt="" fill />
        </button>
      </div>
    </RadixTabs.Root>
  )
}
