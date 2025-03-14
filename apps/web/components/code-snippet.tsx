'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  tomorrow,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'

interface CodeSnippetProps {
  code: string
  language: string
}

export default function CodeSnippet({ code, language }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="neu-inset dark:dark-neu-inset rounded-xl overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={isDark ? tomorrow : oneLight}
          customStyle={{
            background: 'transparent',
            backgroundColor: 'transparent',
            padding: '1rem',
            margin: 0,
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
          }}
          codeTagProps={{
            style: {
              backgroundColor: 'transparent',
            },
          }}
          wrapLongLines={true}
          PreTag={({ children, ...props }) => (
            <pre
              {...props}
              style={{
                ...props.style,
                backgroundColor: 'transparent',
                background: 'transparent',
              }}
            >
              {children}
            </pre>
          )}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 neu-button dark:dark-neu-button p-2 rounded-lg text-gray-700 dark:text-gray-300"
        aria-label="Copy code"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  )
}
