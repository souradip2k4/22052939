"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isActive = (path: string) => {
    return pathname === path ? "font-bold text-blue-600" : "text-gray-600 hover:text-blue-600"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span>Social Analytics</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/top-users" className={isActive("/top-users")}>
            Top Users
          </Link>
          <Link href="/trending-posts" className={isActive("/trending-posts")}>
            Trending Posts
          </Link>
          <Link href="/feed" className={isActive("/feed")}>
            Feed
          </Link>
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-100 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </button>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMenuOpen(false)}>
            <div
              className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button onClick={() => setIsMenuOpen(false)} className="rounded-md p-1 text-gray-600 hover:bg-gray-100">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/top-users" className={`text-lg ${isActive("/top-users")}`}>
                  Top Users
                </Link>
                <Link href="/trending-posts" className={`text-lg ${isActive("/trending-posts")}`}>
                  Trending Posts
                </Link>
                <Link href="/feed" className={`text-lg ${isActive("/feed")}`}>
                  Feed
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

