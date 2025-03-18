'use client'

import { useState, useEffect } from 'react'
import { Check, Code, Layers } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NeuButton } from '@workspace/ui/components/neu-button'

export default function TabNavigation() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get('tab') || 'projects'

  const setTab = (newTab: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', newTab)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      {[
        { id: 'projects', label: 'Projects', icon: <Layers size={18} /> },
        { id: 'code', label: 'Code Samples', icon: <Code size={18} /> },
        {
          id: 'skills',
          label: 'Technical Skills',
          icon: <Check size={18} />,
        },
      ].map((tabItem) => (
        <NeuButton
          key={tabItem.id}
          variant={tab === tabItem.id ? 'pressed' : 'default'}
          className={cn(
            'flex items-center gap-2',
            tab === tabItem.id && 'text-purple-600 dark:text-purple-400',
          )}
          onClick={() => setTab(tabItem.id)}
        >
          {tabItem.icon}
          {tabItem.label}
        </NeuButton>
      ))}
    </div>
  )
}
