import { withThemeByClassName } from '@storybook/addon-themes'
import React from 'react'

import type { Preview } from '@storybook/react'
import '@workspace/ui/globals.css'
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => {
      return React.createElement(
        'div',
        {
          className:
            'p-8 font-basic bg-neu-background dark:bg-dark-neu-background flex items-center justify-center',
        },
        React.createElement(Story),
      )
    },

    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
