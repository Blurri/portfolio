import type React from 'react'
import type { Metadata } from 'next'
import '@workspace/ui/globals.css'
import Navigation from '@/components/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
  title: 'Senior Developer Portfolio',
  description:
    'Portfolio for a senior software developer with 15+ years of experience',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-basic">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          <div className="min-h-screen transition-colors duration-300 bg-neu-background dark:bg-dark-neu-background">
            <Navigation />
            <main className="pt-20 pb-10 px-4 md:px-8 lg:px-12">
              <NuqsAdapter>{children}</NuqsAdapter>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
