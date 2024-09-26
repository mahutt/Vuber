import { forwardRef, useState } from 'react'
import { SewingPinIcon, SewingPinFilledIcon } from '@radix-ui/react-icons'

export interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  filled?: boolean
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
  ({ className, type, filled, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    return (
      <div
        className={`w-full flex flex-row items-center gap-2 bg-slate-100 p-4 rounded-2xl transition-all duration-300 ${
          focused ? 'ring-2 ring-primary-500' : ''
        }`}
      >
        <div className={focused ? 'text-blue-500' : 'text-black'}>
          {filled ? (
            <SewingPinFilledIcon className="w-4 h-4" />
          ) : (
            <SewingPinIcon className="w-4 h-4" />
          )}
        </div>
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="outline-none ring-0 focus:ring-0 focus:outline-none bg-inherit"
          type={type}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

export { LocationInput }
