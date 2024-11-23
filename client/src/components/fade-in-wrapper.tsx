import { useEffect, useState } from 'react'

const FadeInWrapper = ({
  children,
  className,
  delay = 0,
  control = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  control?: boolean
}) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <div
      className={`transform transition-all duration-700 ease-out ${
        isVisible && control
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default FadeInWrapper
