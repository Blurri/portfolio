'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Heading, Text } from '@workspace/ui/components/typography'
import { NeuButton } from '@workspace/ui/components/neu-button'
import { NeuToggle } from '@workspace/ui/components/neu-toggle'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Check for saved animation preference
    const savedAnimPref = localStorage.getItem('animations-enabled')
    if (savedAnimPref !== null) {
      setAnimationsEnabled(savedAnimPref === 'true')
    }
  }, [])

  const toggleAnimations = () => {
    const newValue = !animationsEnabled
    setAnimationsEnabled(newValue)
    localStorage.setItem('animations-enabled', String(newValue))

    // Apply animation settings to document
    if (newValue) {
      document.documentElement.classList.remove('reduce-motion')
    } else {
      document.documentElement.classList.add('reduce-motion')
    }
  }

  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto">
      <div
        data-section-title="Settings"
        className="neu-flat dark:dark-neu-flat rounded-3xl p-8 md:p-12 mb-12"
      >
        <Heading level="h1" dataSectionTitle="Settings" className="mb-4">
          Settings
        </Heading>
        <Text variant="default">
          Customize your experience with these preferences
        </Text>
      </div>

      <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6 md:p-8 mb-8">
        <Heading level="h2" dataSectionTitle="Appearance" className="mb-6">
          Appearance
        </Heading>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Heading level="h3" dataSectionTitle="Theme" className="mb-1">
                Theme
              </Heading>
              <Text variant="muted" size="sm">
                Choose between light and dark mode
              </Text>
            </div>
            <div className="flex gap-3">
              <NeuButton
                onClick={() => setTheme('light')}
                variant={theme === 'light' ? 'pressed' : 'default'}
                size="icon-lg"
                className={
                  theme === 'light'
                    ? 'text-purple-600 dark:text-purple-400'
                    : ''
                }
                aria-label="Light mode"
              >
                <Sun size={20} />
              </NeuButton>
              <NeuButton
                onClick={() => setTheme('dark')}
                variant={theme === 'dark' ? 'pressed' : 'default'}
                size="icon-lg"
                className={
                  theme === 'dark' ? 'text-purple-600 dark:text-purple-400' : ''
                }
                aria-label="Dark mode"
              >
                <Moon size={20} />
              </NeuButton>
            </div>
          </div>

          {/* Animations Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Heading
                level="h3"
                dataSectionTitle="Animations"
                className="mb-1"
              >
                Animations
              </Heading>
              <Text variant="muted" size="sm">
                Enable or disable UI animations
              </Text>
            </div>
            <NeuToggle
              checked={animationsEnabled}
              onCheckedChange={toggleAnimations}
              aria-label="Toggle animations"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
