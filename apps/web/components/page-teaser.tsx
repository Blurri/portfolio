'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Code,
  Layers,
  MessageSquare,
  Settings,
  User,
} from 'lucide-react'

// Define teaser content for each page
const teaserContent = {
  '/': {
    title: 'Welcome',
    description: 'Senior developer with 15+ years of experience',
    icon: <Code className="w-10 h-10 text-purple-500" />,
    color: 'from-purple-500 to-indigo-500',
  },
  '/about': {
    title: 'About Me',
    description: 'My journey through tech and career highlights',
    icon: <User className="w-10 h-10 text-amber-500" />,
    color: 'from-amber-500 to-red-500',
  },
  '/features': {
    title: 'Features',
    description: 'Explore my projects and technical capabilities',
    icon: <Layers className="w-10 h-10 text-blue-500" />,
    color: 'from-blue-500 to-purple-500',
  },
  '/chat': {
    title: 'Chat',
    description: 'Ask me anything about my work and experience',
    icon: <MessageSquare className="w-10 h-10 text-green-500" />,
    color: 'from-green-500 to-teal-500',
  },
  '/settings': {
    title: 'Settings',
    description: 'Customize your experience on this site',
    icon: <Settings className="w-10 h-10 text-gray-500" />,
    color: 'from-gray-500 to-blue-500',
  },
}

export default function PageTeaser() {
  const pathname = usePathname()
  const [previousPath, setPreviousPath] = useState(pathname)
  const [isChanging, setIsChanging] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Get current teaser content or default to home
  const currentTeaser =
    teaserContent[pathname as keyof typeof teaserContent] || teaserContent['/']
  const previousTeaser =
    teaserContent[previousPath as keyof typeof teaserContent] ||
    teaserContent['/']

  useEffect(() => {
    if (pathname !== previousPath) {
      setIsChanging(true)

      // After animation completes, update previous path
      const timer = setTimeout(() => {
        setPreviousPath(pathname)
        setIsChanging(false)
      }, 600) // Match animation duration

      return () => clearTimeout(timer)
    }
  }, [pathname, previousPath])

  return (
    <div className="neu-flat dark:dark-neu-flat rounded-[30px] p-6 md:p-8 mb-8 overflow-hidden relative">
      {/* Background gradient that morphs */}
      <motion.div
        className={`absolute inset-0 opacity-10 rounded-[30px] bg-gradient-to-r ${currentTeaser.color}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      />

      <div className="relative z-10 flex items-center gap-6">
        {/* Icon with morphing animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            className="neu-circle dark:dark-neu-circle w-16 h-16 rounded-full flex items-center justify-center"
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 1.2, rotate: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {currentTeaser.icon}
          </motion.div>
        </AnimatePresence>

        {/* Text content with morphing animation */}
        <div className="flex-1" ref={contentRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {currentTeaser.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {currentTeaser.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative element that morphs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            className={`hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${currentTeaser.color}`}
            initial={{ scale: 0, borderRadius: '50%' }}
            animate={{ scale: 1, borderRadius: '30%' }}
            exit={{ scale: 0, borderRadius: '50%' }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <ArrowRight className="text-white" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Morphing blob decoration */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            className={`w-full h-full rounded-full bg-gradient-to-r ${currentTeaser.color} opacity-10 blur-2xl`}
            initial={{ scale: 0.5, x: 20, y: 20 }}
            animate={{ scale: 1, x: 0, y: 0 }}
            exit={{ scale: 0.5, x: -20, y: -20 }}
            transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}
