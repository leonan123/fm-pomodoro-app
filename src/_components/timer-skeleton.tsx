export function TimerSkeleton() {
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
          strokeDashoffset={(283 * (100 - 25 * 60)) / 100}
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[95px] w-[300px] animate-pulse rounded-lg bg-background text-center text-8xl font-bold"></div>

        <div className="flex gap-4">
          <button className="mt-2 w-full text-center font-bold tracking-[15px] transition-colors hover:text-primary">
            START
          </button>

          <span className="mt-2 text-4xl leading-none">|</span>

          <button className="ml-4 mt-2 w-full text-center font-bold tracking-[15px] transition-colors hover:text-primary">
            RESET
          </button>
        </div>
      </div>
    </div>
  )
}
