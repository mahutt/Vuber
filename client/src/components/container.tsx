import { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-16 h-full">
      {children}
    </div>
  )
}