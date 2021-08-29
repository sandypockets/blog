export default function HoverHighlight({ children }) {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-pink-600 dark:via-red-500 dark:to-yellow-500">
      {children}
    </span>
  )
}