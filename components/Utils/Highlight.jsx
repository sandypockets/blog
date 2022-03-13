export default function HoverHighlight({ children }) {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 dark:from-pink-700 dark:via-red-500 dark:to-yellow-500">
      {children}
    </span>
  );
}
