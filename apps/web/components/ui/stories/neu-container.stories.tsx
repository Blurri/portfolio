import type { Meta, StoryObj } from '@storybook/react'
import { NeuContainer } from '@workspace/ui/components/neu-container'

const meta: Meta<typeof NeuContainer> = {
  title: 'UI/NeuContainer',
  component: NeuContainer,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'pressed', 'inset'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
    dataSectionTitle: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof NeuContainer>

export const Default: Story = {
  args: {
    children: 'This is a container',
    variant: 'flat',
    size: 'lg',
  },
}

export const Pressed: Story = {
  args: {
    children: 'This is a pressed container',
    variant: 'pressed',
    size: 'lg',
  },
}

export const Inset: Story = {
  args: {
    children: 'This is an inset container',
    variant: 'inset',
    size: 'lg',
  },
}

export const Small: Story = {
  args: {
    children: 'Small container',
    variant: 'flat',
    size: 'sm',
  },
}

export const ExtraLarge: Story = {
  args: {
    children: 'Extra large container',
    variant: 'flat',
    size: '2xl',
  },
}

export const WithSectionTitle: Story = {
  args: {
    children: 'Container with section title',
    variant: 'flat',
    size: 'lg',
    dataSectionTitle: 'Section Title',
  },
}

export const WithContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Complex Content</h2>
        <p>This container can hold any content you want to display.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Click me
        </button>
      </div>
    ),
    variant: 'flat',
    size: 'xl',
  },
}
