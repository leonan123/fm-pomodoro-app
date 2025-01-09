import { Tabs } from '@/_components/ui/tabs'

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex flex-col gap-6 sm:gap-14 h-full">
        <header className="pt-6 sm:pt-12 text-center">
          <h1 className="font-bold text-3xl">pomodoro</h1>
        </header>

        <Tabs />
      </div>
    </div>
  )
}
