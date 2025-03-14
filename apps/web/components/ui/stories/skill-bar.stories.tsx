import type { Meta, StoryObj } from '@storybook/react'
import { SkillBar } from '@workspace/ui/components/skill-bar'

const meta: Meta<typeof SkillBar> = {
  title: 'UI/SkillBar',
  component: SkillBar,
  tags: ['autodocs'],
  argTypes: {
    skill: {
      control: 'text',
      description: 'Name of the skill',
    },
    level: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Skill level percentage (0-100)',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Whether to show the percentage number',
    },
  },
}

export default meta
type Story = StoryObj<typeof SkillBar>

export const Default: Story = {
  args: {
    skill: 'React',
    level: 85,
    showPercentage: true,
  },
}

export const WithoutPercentage: Story = {
  args: {
    skill: 'TypeScript',
    level: 90,
    showPercentage: false,
  },
}

export const LowLevel: Story = {
  args: {
    skill: 'Beginner Skill',
    level: 25,
    showPercentage: true,
  },
}

export const MidLevel: Story = {
  args: {
    skill: 'Intermediate Skill',
    level: 50,
    showPercentage: true,
  },
}

export const HighLevel: Story = {
  args: {
    skill: 'Expert Skill',
    level: 95,
    showPercentage: true,
  },
}

export const MultipleSkills = {
  render: () => (
    <div className="space-y-4">
      <SkillBar skill="JavaScript" level={90} />
      <SkillBar skill="CSS" level={85} />
      <SkillBar skill="HTML" level={95} />
      <SkillBar skill="Node.js" level={80} />
    </div>
  ),
}
