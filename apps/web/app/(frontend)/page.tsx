import { ArrowRight } from 'lucide-react'
import TechStack from '@/components/tech-stack'
import { NeuContainer } from '@workspace/ui/components/neu-container'
import { Heading, Text } from '@workspace/ui/components/typography'
import { NeuButton } from '@workspace/ui/components/neu-button'
import RotatingTechBadge from '@/components/rotating-tech-badge'
import TechnicalExpertise from '@/components/technical-expertise'
import TechnologyJourney from '@/components/technology-journey'

export default function Home() {
  return (
    <div className="container-lg">
      {/* Hero Section */}
      <section data-section-title="Welcome" className="section">
        <NeuContainer variant="flat" size="2xl" dataSectionTitle="Welcome">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1">
              <Heading
                level="h1"
                dataSectionTitle="Senior Software Engineer"
                className="mb-4"
              >
                Senior Software Engineer
              </Heading>
              <Text size="lg" className="mb-6">
                Senior Software Engineer specializing in React, GraphQL, and
                Cloud Architecture.
              </Text>
              <div className="flex flex-wrap gap-4">
                <NeuButton href="/about" className="flex items-center gap-2">
                  Learn More <ArrowRight size={18} />
                </NeuButton>
                <NeuButton href="/features" variant="secondary">
                  View Projects
                </NeuButton>
              </div>
            </div>

            {/* Rotating tech badge component */}
            <RotatingTechBadge textOptions={['TS', 'DB', 'GQL', 'API', 'AI']} />
          </div>
        </NeuContainer>
      </section>

      {/* Skills Overview */}
      <section data-section-title="Technical Expertise" className="section">
        <TechnicalExpertise />
      </section>

      {/* Technology Timeline */}
      <section data-section-title="Technology Journey" className="section">
        <TechnologyJourney />
      </section>

      {/* Tech Stack */}
      <section data-section-title="Technology Stack">
        <TechStack />
      </section>
    </div>
  )
}
