import Image from 'next/image'
import { useEffect, useState, type ComponentProps } from 'react'

type InputNumberProps = ComponentProps<'input'> & {
  onValueChange?: (value: number) => void
}

export function InputNumber({
  onValueChange,
  value,
  ...props
}: InputNumberProps) {
  const [inputValue, setInputValue] = useState<number>(Number(value) || 0)

  function handleButtonClick(type: 'increase' | 'decrease') {
    if (type === 'increase') {
      setInputValue((prev) => prev + 1)
    } else {
      setInputValue((prev) => (prev - 1 === 0 ? 0 : prev - 1))
    }
  }

  useEffect(() => {
    onValueChange?.(inputValue)
  }, [inputValue])

  return (
    <div className="flex h-12 w-full appearance-none items-center justify-center px-4">
      <input
        type="number"
        className="size-full bg-transparent text-sm font-bold outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        {...props}
      />

      <div className="flex flex-col items-center gap-1">
        <button
          className="relative size-4 opacity-25 transition-opacity hover:opacity-100"
          type="button"
          onClick={() => handleButtonClick('increase')}
        >
          <span className="sr-only">Increase</span>
          <Image
            src="icon-arrow-up.svg"
            alt="Increase"
            fill
            className="object-contain"
          />
        </button>

        <button
          className="relative size-4 opacity-25 transition-opacity hover:opacity-100"
          type="button"
          onClick={() => handleButtonClick('decrease')}
        >
          <span className="sr-only">Decrease</span>
          <Image
            src="icon-arrow-down.svg"
            alt="Decrease"
            fill
            className="object-contain"
          />
        </button>
      </div>
    </div>
  )
}
