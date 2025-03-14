import type { Meta, StoryObj } from '@storybook/react'
import { NeuButton } from '@workspace/ui/components/neu-button'

const meta: Meta<typeof NeuButton> = {
  title: 'UI/NeuButton',
  component: NeuButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'pressed', 'circle', 'circle-sm'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon', 'icon-lg'],
    },
    isActive: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof NeuButton>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
}

export const Pressed: Story = {
  args: {
    children: 'Pressed Button',
    variant: 'pressed',
    size: 'md',
  },
}

export const Circle: Story = {
  args: {
    children: '○',
    variant: 'circle',
    size: 'icon',
  },
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'default',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'default',
    size: 'lg',
  },
}

export const Active: Story = {
  args: {
    children: 'Active Button',
    variant: 'default',
    size: 'md',
    isActive: true,
  },
}

export const WithLink: Story = {
  args: {
    children: 'Link Button',
    variant: 'default',
    size: 'md',
    href: '#',
  },
}
