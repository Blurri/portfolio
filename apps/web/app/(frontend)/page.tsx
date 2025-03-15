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
                dataSectionTitle="Senior Software Engineer"
                className="mb-4"
              >
                Senior Software Engineer
              </Heading>
              <Text size="lg" className="mb-6">
                Swiss-based fullstack developer with expertise in modern
                JavaScript frameworks and cloud technologies. Specializing in
                React ecosystems, GraphQL APIs, and DevOps practices with a
                proven track record of delivering scalable solutions at Panter
                AG and beyond.
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
                year: '2006-2010',
                tech: 'Career Transition',
                description:
                  'Started as a Certified Metalworker, building foundation for precision and attention to detail',
              },
              {
                year: '2011-2013',
                tech: 'Web & iOS Development',
                description:
                  'Began software development journey with WebObjects (Java) and iOS development at Rucotec',
              },
              {
                year: '2013-2014',
                tech: 'Enterprise Development',
                description:
                  'Worked with VB.Net and iOS development at DWA AG, focusing on enterprise solutions',
              },
              {
                year: '2014-2016',
                tech: 'Full Stack Development',
                description:
                  'Expanded skills to Java, PHP, JavaScript, and Swift at PM Medici, specializing in location-based iOS applications',
              },
              {
                year: '2016-2020',
                tech: 'Modern Web Frameworks',
                description:
                  'Mastered React, Vue.js, and Meteor.js at Panter AG, building scalable web applications',
              },
              {
                year: '2020-Present',
                tech: 'Cloud & Modern Stack',
                description:
                  'Advanced to Next.js, GraphQL, Kubernetes, and Google Cloud, leading complex fullstack projects',
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
        <TechStack />
      </section>
    </div>
  )
}
