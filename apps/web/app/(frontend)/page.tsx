import { ArrowRight, Code, Database, Server } from 'lucide-react'
import TechStack from '@/components/tech-stack'
import { NeuContainer } from '@workspace/ui/components/neu-container'
import { Heading, Text } from '@workspace/ui/components/typography'
import { NeuButton } from '@workspace/ui/components/neu-button'
import RotatingTechBadge from '@/components/rotating-tech-badge'

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
                dataSectionTitle="Senior Software Developer"
                className="mb-4"
              >
                Senior Software Developer
              </Heading>
              <Text size="lg" className="mb-6">
                With over 15 years of experience building modern web
                applications and scalable systems
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
            <RotatingTechBadge
              textOptions={['JS', 'TS', 'DB', 'GQL', 'API', 'AI']}
            />
          </div>
        </NeuContainer>
      </section>

      {/* Skills Overview */}
      <section data-section-title="Technical Expertise" className="section">
        <Heading level="h2" dataSectionTitle="Technical Expertise">
          Technical Expertise
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Frontend Development',
              icon: (
                <Code className="text-gray-700 dark:text-gray-300" size={24} />
              ),
              skills: [
                'React & Next.js Expert',
                'JavaScript/TypeScript',
                'GraphQL Integration',
                'Angular & jQuery',
                'Responsive UI/UX Design',
              ],
            },
            {
              title: 'Backend Development',
              icon: (
                <Server
                  className="text-gray-700 dark:text-gray-300"
                  size={24}
                />
              ),
              skills: [
                'Node.js & Express',
                'GraphQL API Design',
                'RESTful Services',
                'Meteor Framework',
                'Serverless Architecture',
              ],
            },
            {
              title: 'DevOps & Cloud',
              icon: (
                <Database
                  className="text-gray-700 dark:text-gray-300"
                  size={24}
                />
              ),
              skills: [
                'Google Cloud Platform',
                'Kubernetes Orchestration',
                'Cloud Run Deployments',
                'CI/CD Pipeline Setup',
                'Infrastructure as Code',
              ],
            },
          ].map((category, index) => (
            <NeuContainer key={index} variant="flat" size="lg">
              <div className="w-14 h-14 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center mb-4">
                {category.icon}
              </div>
              <Heading
                level="h3"
                dataSectionTitle={category.title}
                className="mb-3"
              >
                {category.title}
              </Heading>
              <ul className="space-y-2 body-text">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </NeuContainer>
          ))}
        </div>
      </section>

      {/* Technology Timeline */}
      <section data-section-title="Technology Journey" className="section">
        <Heading level="h2" dataSectionTitle="Technology Journey">
          Technology Journey
        </Heading>
        <NeuContainer variant="flat" size="lg">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-900"></div>

            {[
              {
                year: '2008-2010',
                tech: 'JavaScript & jQuery',
                description:
                  'Started career with JavaScript and jQuery development',
              },
              {
                year: '2011-2013',
                tech: 'Flash & Early SPA',
                description:
                  'Worked with Flash and early single-page applications',
              },
              {
                year: '2014-2016',
                tech: 'Angular & React',
                description:
                  'Transitioned to Angular, then became an early React adopter',
              },
              {
                year: '2017-2019',
                tech: 'React & Meteor',
                description:
                  'Specialized in React with Meteor for full-stack JavaScript',
              },
              {
                year: '2020-2022',
                tech: 'GraphQL & Next.js',
                description:
                  'Early adoption of GraphQL and Next.js for modern web apps',
              },
              {
                year: '2023-Present',
                tech: 'Cloud & DevOps',
                description: 'Focus on Google Cloud, Kubernetes, and Cloud Run',
              },
            ].map((item, index) => (
              <div key={index} className="relative pl-10 pb-8">
                <div className="absolute left-2 top-1 w-5 h-5 rounded-full neu-circle dark:dark-neu-circle flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <div className="mb-1 text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {item.year}
                </div>
                <Heading
                  level="h3"
                  dataSectionTitle={item.tech}
                  className="mb-1"
                >
                  {item.tech}
                </Heading>
                <Text>{item.description}</Text>
              </div>
            ))}
          </div>
        </NeuContainer>
      </section>

      {/* Tech Stack */}
      <section data-section-title="Technology Stack">
        <Heading level="h2" dataSectionTitle="Technology Stack">
          Technology Stack
        </Heading>
        <TechStack />
      </section>
    </div>
  )
}
