import {
  BookOpen,
  Briefcase,
  Code,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Server,
} from 'lucide-react'
import { Heading, Text } from '@workspace/ui/components/typography'
import { Section } from '@workspace/ui/components/section'
import ExperienceList from '@/components/experience'

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div
        data-section-title="About Me"
        className="neu-flat dark:dark-neu-flat rounded-3xl p-8 md:p-12 mb-12"
      >
        <Heading level="h1" dataSectionTitle="About Me">
          About Me
        </Heading>
        <div className="space-y-6">
          <Text size="lg">
            From wielding metal to wielding code - I started my journey as a
            certified metalworker before discovering my true passion in software
            development. Turns out, crafting elegant code solutions is just as
            satisfying as crafting metal, just with fewer sparks flying around!
          </Text>
          <Text>
            When I'm not geeking out over the latest tech, you'll find me diving
            into fascinating projects like building 3D galleries, creating
            virtual reality experiences, or helping save the planet with CO2
            tracking apps. I love turning complex problems into elegant
            solutions, preferably with a good cup of coffee in hand and some AI
            tools as my trusty sidekicks.
          </Text>
          <Text>
            These days, I spend my time crafting web applications, experimenting
            with AI tools, and occasionally disappearing into VR worlds I help
            create. I believe in writing code that not only works great but is
            also a joy to work with - because life's too short for messy
            codebases! Whether it's mentoring fellow developers or building the
            next cool feature, I bring both expertise and enthusiasm to
            everything I do.
          </Text>
        </div>
      </div>

      {/* Career Journey */}
      <Section title="Career Journey" size="sm">
        <ExperienceList />
      </Section>

      {/* Technical Philosophy */}
      <Section title="Technical Philosophy" size="sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6">
            <div className="w-12 h-12 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center mb-4">
              <Code className="text-gray-700 dark:text-gray-300" size={20} />
            </div>
            <Heading level="h3">Clean, Maintainable Code</Heading>
            <Text>
              I believe in writing clean, well-documented code that's easy to
              maintain and extend. I follow best practices like SOLID principles
              and design patterns to create robust applications.
            </Text>
          </div>

          <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6">
            <div className="w-12 h-12 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center mb-4">
              <GitBranch
                className="text-gray-700 dark:text-gray-300"
                size={20}
              />
            </div>
            <Heading level="h3">Agile Development</Heading>
            <Text>
              I thrive in agile environments, delivering value in short sprints
              and adapting to changing requirements. I emphasize collaboration,
              continuous integration, and regular feedback.
            </Text>
          </div>

          <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6">
            <div className="w-12 h-12 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center mb-4">
              <Globe className="text-gray-700 dark:text-gray-300" size={20} />
            </div>
            <Heading level="h3">User-Centered Design</Heading>
            <Text>
              I focus on creating intuitive, accessible interfaces that provide
              excellent user experiences. I believe that technical excellence
              should always serve user needs.
            </Text>
          </div>

          <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6">
            <div className="w-12 h-12 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center mb-4">
              <BookOpen
                className="text-gray-700 dark:text-gray-300"
                size={20}
              />
            </div>
            <Heading level="h3">Continuous Learning</Heading>
            <Text>
              I'm committed to staying current with emerging technologies and
              best practices. I regularly experiment with new tools and
              approaches to improve my craft.
            </Text>
          </div>
        </div>
      </Section>

      {/* Core Skills */}
      <Section title="Core Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              category: 'Frontend',
              icon: <Cpu size={20} />,
              skills: [
                'React/Next.js',
                'TypeScript',
                'GraphQL Client',
                'Redux/Context',
                'CSS/SCSS',
                'Responsive Design',
              ],
            },
            {
              category: 'Backend',
              icon: <Server size={20} />,
              skills: [
                'Node.js',
                'Express',
                'GraphQL API',
                'REST API',
                'Authentication',
                'Microservices',
              ],
            },
            {
              category: 'Database',
              icon: <Database size={20} />,
              skills: [
                'MongoDB',
                'PostgreSQL',
                'Redis',
                'Firebase',
                'Data Modeling',
                'Query Optimization',
              ],
            },
            {
              category: 'DevOps',
              icon: <Briefcase size={20} />,
              skills: [
                'Google Cloud',
                'Kubernetes',
                'Docker',
                'CI/CD',
                'Terraform',
                'Monitoring',
              ],
            },
          ].map((skillSet, index) => (
            <div
              key={index}
              className="neu-flat dark:dark-neu-flat rounded-2xl p-6"
            >
              <div className="w-12 h-12 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center mb-4">
                {skillSet.icon}
              </div>
              <Heading level="h3">{skillSet.category}</Heading>
              <ul className="mt-4 space-y-2">
                {skillSet.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <Text>{skill}</Text>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
