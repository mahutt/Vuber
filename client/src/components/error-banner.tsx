export default function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className={`bg-red-500/20 border-2 border-red-500 rounded-lg text-red-500 p-4`}
    >
      {message}
    </div>
  )
}
