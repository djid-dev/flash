'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === 'dark' : true

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Change theme"
      className="p-1 cursor-pointer rounded-full transition-colors duration-300 hover:bg-foreground text-foreground hover:text-[color:var(--inverted-foreground)] group"
    >
      {isDark ? (
        <Moon className="w-6 h-6 transition-transform duration-300 rotate-0 group-hover:rotate-14" />
      ) : (
        <Sun className="w-6 h-6 transition-transform duration-300 rotate-0 group-hover:-rotate-14" />
      )}
    </button>
  )
}
