import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'

export default function NumberInput({
  number,
  setNumber,
  placeholder,
  min,
}: {
  number: number
  setNumber: (number: number) => void
  placeholder?: string
  min?: number
  max?: number
}) {
  const [stringNumber, setStringNumber] = useState<string>(number.toString())
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/^([^.]*\.[^.]*)\./g, '$1')
      .replace(/^0+(?=\d)/, '')
    // We don't require a min check since you can't type min values
    setStringNumber(formatted)
  }
  const handleDecrement = () => {
    let n = parseFloat(stringNumber)
    if (isNaN(n)) {
      n = 0
    }
    preSetStringNumber(Math.ceil(n) - 1)
  }
  const handleIncrement = () => {
    let n = parseFloat(stringNumber)
    if (isNaN(n)) {
      n = 0
    }
    preSetStringNumber(Math.floor(n) + 1)
  }
  const handleBlur = () => {
    if (!stringNumber) {
      setStringNumber('0')
    }
  }
  const preSetStringNumber = (n: number) => {
    if (min && n < min) {
      n = min
    }
    setStringNumber(n.toString())
  }
  useEffect(() => {
    const float = parseFloat(stringNumber)
    setNumber(isNaN(float) ? 0 : float)
  }, [stringNumber])
  return (
    <div className="relative w-full">
      <input
        className={`text-center shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        placeholder={placeholder}
        value={stringNumber}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        onClick={handleDecrement}
        className="absolute left-2 top-2 bottom-2 p-2 rounded-md flex items-center hover:shadow active:shadow-none transition-shadow"
      >
        <MinusIcon />
      </button>
      <button
        onClick={handleIncrement}
        className="absolute right-2 top-2 bottom-2 p-2 rounded-md flex items-center hover:shadow active:shadow-none transition-shadow"
      >
        <PlusIcon />
      </button>
    </div>
  )
}
