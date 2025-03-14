import type { Meta, StoryObj } from '@storybook/react'
import { Text, Heading } from '@workspace/ui/components/typography'

const meta: Meta = {
  title: 'UI/Typography',
  tags: ['autodocs'],
}

export default meta

export const AllTypography = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading level="h1">Heading 1</Heading>
        <Text variant="muted" size="sm">
          The largest heading style
        </Text>
      </div>

      <div>
        <Heading level="h2">Heading 2</Heading>
        <Text variant="muted" size="sm">
          Used for section headers
        </Text>
      </div>

      <div>
        <Heading level="h3">Heading 3</Heading>
        <Text variant="muted" size="sm">
          Used for subsection headers
        </Text>
      </div>

      <div>
        <Heading level="h4">Heading 4</Heading>
        <Text variant="muted" size="sm">
          Used for smaller section headers
        </Text>
      </div>

      <div>
        <Text size="lg">
          This is large body text. Use this for important paragraphs or when you
          need slightly larger text than the default body text.
        </Text>
        <Text variant="muted" size="sm">
          Large body text
        </Text>
      </div>

      <div>
        <Text>
          This is regular body text. This is the default text style used for
          paragraphs and general content. It has good readability and
          comfortable line height.
        </Text>
        <Text variant="muted" size="sm">
          Regular body text
        </Text>
      </div>

      <div>
        <Text size="sm">
          This is small body text. Use this for less important information,
          captions, or when space is limited.
        </Text>
        <Text variant="muted" size="sm">
          Small body text
        </Text>
      </div>

      <div>
        <Text variant="muted">
          This is muted text. Use this for secondary information, metadata, or
          any text that should be less prominent.
        </Text>
        <Text variant="muted" size="sm">
          Muted text
        </Text>
      </div>
    </div>
  ),
}

type HeadingStory = StoryObj<typeof Heading>
type BodyStory = StoryObj<typeof Text>

export const Heading1Example: HeadingStory = {
  render: () => <Heading level="h1">This is a Heading 1</Heading>,
}

export const Heading2Example: HeadingStory = {
  render: () => <Heading level="h2">This is a Heading 2</Heading>,
}

export const Heading3Example: HeadingStory = {
  render: () => <Heading level="h3">This is a Heading 3</Heading>,
}

export const Heading4Example: HeadingStory = {
  render: () => <Heading level="h4">This is a Heading 4</Heading>,
}

export const BodyTextExample: BodyStory = {
  render: () => (
    <Text>
      This is regular body text. This is the default text style used for
      paragraphs and general content.
    </Text>
  ),
}

export const BodyTextLargeExample: BodyStory = {
  render: () => (
    <Text size="lg">
      This is large body text. Use this for important paragraphs or when you
      need slightly larger text.
    </Text>
  ),
}

export const BodyTextSmallExample: BodyStory = {
  render: () => (
    <Text size="sm">
      This is small body text. Use this for less important information or
      captions.
    </Text>
  ),
}

export const MutedTextExample: BodyStory = {
  render: () => (
    <Text variant="muted">
      This is muted text. Use this for secondary information or metadata.
    </Text>
  ),
}

export const WithSectionTitle: HeadingStory = {
  render: () => (
    <Heading level="h2" dataSectionTitle="Important Section">
      This is a section with a title
    </Heading>
  ),
}
