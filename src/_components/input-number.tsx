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
  const [inputValue, setInputValue] = useState<string>(String(value))

  function handleButtonClick(type: 'increase' | 'decrease') {
    if (type === 'increase') {
      setInputValue((prev) => String(+prev + 1))
    } else {
      setInputValue((prev) => (+prev - 1 === 0 ? '0' : String(+prev - 1)))
    }
  }

  useEffect(() => {
    onValueChange?.(Number(inputValue))
  }, [inputValue])

  return (
    <div className="flex h-12 w-full appearance-none items-center justify-center px-4">
      <input
        type="number"
        min={1}
        className="size-full bg-transparent text-sm font-bold outline-none"
        {...props}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
