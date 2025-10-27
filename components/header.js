"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "./theme-provider"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { name: "LIVE", href: "/" },
    { name: "SETTING", href: "/setting" },
    { name: "ABOUT", href: "https://github.com/leyen-me/nof2", external: true },
  ]

  return (
    <header 
      className="h-14 border-b flex items-center justify-between px-6"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-xl font-semibold hover:opacity-80 transition-opacity">
          NOF2
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = item.external 
            ? false 
            : pathname === item.href

          if (item.external) {
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-60 transition-opacity"
                style={{ color: "var(--secondary)" }}
              >
                {item.name}
              </a>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm transition-opacity hover:opacity-60",
                isActive 
                  ? "font-medium" 
                  : ""
              )}
              style={{ 
                color: isActive ? "var(--foreground)" : "var(--secondary)" 
              }}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 hover:opacity-60 transition-opacity"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5" style={{ color: "var(--foreground)" }} />
        ) : (
          <Moon className="w-5 h-5" style={{ color: "var(--foreground)" }} />
        )}
      </button>
    </header>
  )
}
