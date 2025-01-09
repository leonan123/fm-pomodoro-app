import * as RadixTabs from '@radix-ui/react-tabs'
import { ShortBreak } from '../short-break'
import { PomodoroTimer } from '../pomodoro-timer'
import { LongBreak } from '../long-break'
import Image from 'next/image'

export function Tabs() {
  return (
    <RadixTabs.Root
      defaultValue="pomodoro-timer"
      className="flex flex-col items-center gap-10 sm:gap-20 h-full"
    >
      <RadixTabs.List className="w-full max-w-[373px] h-[63px] p-2 rounded-full bg-muted flex items-center text-foreground/40 z-10 relative">
        <RadixTabs.Trigger
          value="pomodoro-timer"
          className="rounded-full data-[state=active]:bg-primary h-full w-[120px] text-center data-[state=active]:text-primary-foreground text-sm font-bold transition-colors data-[state=inactive]:hover:text-foreground"
        >
          pomodoro
        </RadixTabs.Trigger>
        <RadixTabs.Trigger
          value="short-break"
          className="rounded-full data-[state=active]:bg-primary h-full w-[120px] text-center data-[state=active]:text-primary-foreground text-sm font-bold transition-colors data-[state=inactive]:hover:text-foreground"
        >
          short break
        </RadixTabs.Trigger>
        <RadixTabs.Trigger
          value="long-break"
          className="rounded-full data-[state=active]:bg-primary h-full w-[120px] text-center data-[state=active]:text-primary-foreground text-sm font-bold transition-colors data-[state=inactive]:hover:text-foreground"
        >
          long break
        </RadixTabs.Trigger>
      </RadixTabs.List>

      <RadixTabs.Content
        value="pomodoro-timer"
        className="flex-1 w-full grid place-items-center"
      >
        <PomodoroTimer />
      </RadixTabs.Content>

      <RadixTabs.Content value="short-break">
        <ShortBreak />
      </RadixTabs.Content>

      <RadixTabs.Content value="long-break">
        <LongBreak />
      </RadixTabs.Content>

      <div className="pb-6 sm:pb-32">
        <button className="size-7 relative opacity-50 hover:opacity-100 transition-opacity">
          <span className="sr-only">Open settings</span>
          <Image src="icon-settings.svg" alt="" fill />
        </button>
      </div>
    </RadixTabs.Root>
  )
}
