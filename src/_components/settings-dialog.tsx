'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { InputNumber } from './input-number'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { THEME_COLORS, THEME_FONTS } from '@/app/_constants/theme'
import { useRef } from 'react'

const settingsFormSchema = z.object({
  timer: z.object({
    pomodoroTime: z.number(),
    shortBreakTime: z.number(),
    longBreakTime: z.number(),
  }),
  theme: z.object({
    font: z.string(),
    color: z.string(),
  }),
})

type SettingsForm = z.infer<typeof settingsFormSchema>

export function SettingsDialog() {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const { register, control, handleSubmit } = useForm<SettingsForm>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      timer: {
        pomodoroTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
      },
      theme: {
        font: THEME_FONTS['kumbh-sans'],
        color: Object.keys(THEME_COLORS)[0],
      },
    },
  })

  function onSettingsSubmit(values: SettingsForm) {
    document.documentElement.className = values.theme.color
    document.documentElement.style.setProperty(
      '--font-base',
      `var(--font-${values.theme.font})`,
    )

    closeButtonRef.current?.click()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/40 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show" />

      <Dialog.Content className="fixed left-1/2 top-1/2 z-20 w-full max-w-[540px] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-white pb-16 pt-8 text-secondary-foreground data-[state=closed]:animate-hide-dialog data-[state=open]:animate-show-dialog">
        <div className="flex items-center justify-between px-10">
          <Dialog.Title className="text-3xl font-bold">Settings</Dialog.Title>

          <Dialog.Close
            className="relative size-4 opacity-60 transition-opacity hover:opacity-100"
            ref={closeButtonRef}
          >
            <span className="sr-only">Close settings</span>
            <Image src="icon-close.svg" alt="Close" fill />
          </Dialog.Close>
        </div>

        <div className="my-6 h-px w-full bg-[#E3E1E1]"></div>

        <div className="px-10">
          <form
            onSubmit={handleSubmit(onSettingsSubmit)}
            className="space-y-[50px]"
          >
            <div className="space-y-5">
              <h3 className="text-sm font-bold tracking-[5px]">
                TIME (MINUTES)
              </h3>

              <div className="flex items-center gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="pomodoro-time"
                    className="text-sm font-bold text-primary-foreground/40"
                  >
                    pomodoro
                  </label>

                  <Controller
                    control={control}
                    name="timer.pomodoroTime"
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="pomodoro-time"
                    className="text-sm font-bold text-primary-foreground/40"
                  >
                    short break
                  </label>

                  <Controller
                    control={control}
                    name="timer.shortBreakTime"
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="pomodoro-time"
                    className="text-sm font-bold text-primary-foreground/40"
                  >
                    long break
                  </label>

                  <Controller
                    control={control}
                    name="timer.longBreakTime"
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-[5px]">FONT</h3>

              <div className="flex items-center gap-4">
                {Object.keys(THEME_FONTS).map((key) => (
                  <label
                    key={key}
                    className="group flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-muted/15 has-[input:checked]:bg-muted has-[input:checked]:text-white hover:has-[input:checked]:bg-muted"
                    style={{
                      fontFamily: `var(--font-${key})`,
                    }}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      {...register('theme.font')}
                      value={key}
                    />
                    <span className="font-bold opacity-75 group-has-[input:checked]:opacity-100">
                      Aa
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-[5px]">COLOR</h3>

              <div className="flex items-center gap-4">
                {Object.keys(THEME_COLORS).map((key) => (
                  <label
                    key={key}
                    className={`${key} group flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary/75 hover:has-[input:checked]:bg-primary`}
                    style={{
                      fontFamily: `var(--font-${key})`,
                    }}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      {...register('theme.color')}
                      value={key}
                    />
                    <span className="hidden group-has-[input:checked]:block">
                      <Image
                        src="/icon-check.svg"
                        alt="Check"
                        width={16}
                        height={16}
                      />
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 left-1/2 h-[53px] w-[140px] -translate-x-1/2 rounded-full bg-white">
              <button className="size-full rounded-full bg-primary font-bold text-primary-foreground transition-colors hover:bg-primary/75">
                Apply
              </button>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
