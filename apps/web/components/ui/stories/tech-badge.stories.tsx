import type { Meta, StoryObj } from '@storybook/react'
import { TechBadge } from '@workspace/ui/components/tech-badge'

const meta: Meta<typeof TechBadge> = {
  title: 'UI/TechBadge',
  component: TechBadge,
  tags: ['autodocs'],
  argTypes: {
    tech: {
      control: 'text',
      description: 'Technology name to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof TechBadge>

export const Default: Story = {
  args: {
    tech: 'React',
  },
}

export const WithCustomStyle: Story = {
  args: {
    tech: 'TypeScript',
    className: 'bg-blue-100 text-blue-800',
  },
}

export const LongName: Story = {
  args: {
    tech: 'Machine Learning',
  },
}

export const MultipleStacked = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <TechBadge tech="React" />
      <TechBadge tech="TypeScript" />
      <TechBadge tech="Node.js" />
      <TechBadge tech="Next.js" />
      <TechBadge tech="TailwindCSS" />
    </div>
  ),
}

export const WithCustomColors = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <TechBadge tech="React" className="bg-blue-100 text-blue-800" />
      <TechBadge tech="Vue" className="bg-green-100 text-green-800" />
      <TechBadge tech="Angular" className="bg-red-100 text-red-800" />
      <TechBadge tech="Svelte" className="bg-orange-100 text-orange-800" />
    </div>
  ),
}
