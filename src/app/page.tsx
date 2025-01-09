import { Tabs } from '@/_components/ui/tabs'

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex h-full flex-col gap-6 sm:gap-14">
        <header className="pt-6 text-center sm:pt-12">
          <h1 className="text-3xl font-bold">pomodoro</h1>
        </header>

        <Tabs />
      </div>
    </div>
  )
}
