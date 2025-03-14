'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Home,
  User,
  Layers,
  MessageSquare,
  Settings,
  Moon,
  Sun,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentSection, setCurrentSection] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Set up intersection observer to track visible sections
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0,
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTitle = entry.target.getAttribute('data-section-title')
          if (sectionTitle) {
            setCurrentSection(sectionTitle)
          }
        }
      })
    }

    observerRef.current = new IntersectionObserver(handleIntersect, options)

    // Observe all section elements with data-section-title attribute
    const sections = document.querySelectorAll('[data-section-title]')
    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    // Set initial page title based on pathname
    const getPageTitle = () => {
      switch (pathname) {
        case '/':
          return 'Home'
        case '/about':
          return 'About'
        case '/features':
          return 'Features'
        case '/chat':
          return 'Chat'
        case '/settings':
          return 'Settings'
        default:
          return 'Portfolio'
      }
    }

    // If no section is visible yet, show the page title
    if (!currentSection) {
      setCurrentSection(getPageTitle())
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [pathname, currentSection])

  useEffect(() => {
    const getPageTitle = () => {
      switch (pathname) {
        case '/':
          return 'Home'
        case '/about':
          return 'About'
        case '/features':
          return 'Features'
        case '/chat':
          return 'Chat'
        case '/settings':
          return 'Settings'
        default:
          return 'Portfolio'
      }
    }

    setCurrentSection(getPageTitle())
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navItems = [
    { href: '/', label: 'Home', icon: <Home size={18} /> },
    { href: '/about', label: 'About', icon: <User size={18} /> },
    { href: '/features', label: 'Features', icon: <Layers size={18} /> },
    { href: '/chat', label: 'Chat', icon: <MessageSquare size={18} /> },
    { href: '/settings', label: 'Settings', icon: <Settings size={18} /> },
  ]

  const getSectionGradient = (section: string) => {
    switch (section) {
      case 'Welcome':
        return 'linear-gradient(to right, #8b5cf6, #6366f1)' // Purple to indigo
      case 'Technical Expertise':
        return 'linear-gradient(to right, #ec4899, #8b5cf6)' // Pink to purple
      case 'Technology Journey':
        return 'linear-gradient(to right, #06b6d4, #3b82f6)' // Cyan to blue
      case 'Technology Stack':
        return 'linear-gradient(to right, #10b981, #3b82f6)' // Emerald to blue
      case 'About Me':
        return 'linear-gradient(to right, #f59e0b, #ef4444)' // Amber to red
      case 'Career Journey':
        return 'linear-gradient(to right, #f97316, #ec4899)' // Orange to pink
      case 'Technical Philosophy':
        return 'linear-gradient(to right, #6366f1, #8b5cf6)' // Indigo to purple
      case 'Core Skills':
        return 'linear-gradient(to right, #0ea5e9, #10b981)' // Sky to emerald
      case 'Features Showcase':
        return 'linear-gradient(to right, #8b5cf6, #ec4899)' // Purple to pink
      case 'Development Approach':
        return 'linear-gradient(to right, #f97316, #f59e0b)' // Orange to amber
      case 'React Hooks Example':
      case 'GraphQL API Example':
      case 'Next.js API Route Example':
        return 'linear-gradient(to right, #0ea5e9, #6366f1)' // Sky to indigo
      case 'Frontend Development':
      case 'Backend Development':
      case 'DevOps & Cloud':
      case 'Other Skills':
        return 'linear-gradient(to right, #10b981, #6366f1)' // Emerald to indigo
      case 'Technology Evolution':
        return 'linear-gradient(to right, #3b82f6, #8b5cf6)' // Blue to purple
      case 'Chat with AI Assistant':
        return 'linear-gradient(to right, #8b5cf6, #ec4899)' // Purple to pink
      case 'Settings':
        return 'linear-gradient(to right, #6366f1, #0ea5e9)' // Indigo to sky
      default:
        return 'linear-gradient(to right, #8b5cf6, #6366f1)' // Default purple to indigo
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neu-background/98 dark:bg-dark-neu-background/98 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Section Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
                  JS
                </span>
              </div>
            </Link>

            {/* Current Section Title with Animation */}
            {currentSection && (
              <div className="ml-3">
                <div className="h-8 overflow-hidden">
                  <div
                    key={currentSection}
                    className="text-lg font-basic animate-fadeIn"
                    style={{
                      background: getSectionGradient(currentSection),
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation:
                        'fadeIn 0.5s ease-in-out, pulse 2s infinite ease-in-out',
                      letterSpacing: '0.02em',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {currentSection}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="neu-flat dark:dark-neu-flat rounded-xl p-1 flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg flex items-center mx-1 font-basic',
                    pathname === item.href
                      ? 'neu-pressed dark:dark-neu-pressed text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="neu-button dark:dark-neu-button p-2 rounded-xl ml-3 text-gray-700 dark:text-gray-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden neu-button dark:dark-neu-button p-2 rounded-xl text-gray-700 dark:text-gray-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Section Title */}
        {currentSection && (
          <div className="md:hidden px-4 pb-2">
            <div className="h-6 overflow-hidden">
              <div
                key={currentSection}
                className="text-base font-basic animate-fadeIn"
                style={{
                  background: getSectionGradient(currentSection),
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation:
                    'fadeIn 0.5s ease-in-out, pulse 2s infinite ease-in-out',
                  letterSpacing: '0.02em',
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {currentSection}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden neu-flat dark:dark-neu-flat m-4 rounded-xl p-4">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-3 rounded-xl flex items-center font-basic',
                  pathname === item.href
                    ? 'neu-pressed dark:dark-neu-pressed text-purple-600 dark:text-purple-400'
                    : 'neu-flat dark:dark-neu-flat text-gray-700 dark:text-gray-300',
                )}
                onClick={closeMenu}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {mounted && (
              <button
                onClick={toggleTheme}
                className="neu-button dark:dark-neu-button px-4 py-3 rounded-xl flex items-center text-gray-700 dark:text-gray-300 font-basic"
              >
                <span className="mr-3">
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </span>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
