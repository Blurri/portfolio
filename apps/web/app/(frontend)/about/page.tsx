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
            I'm a senior software developer with over 15 years of experience
            building web applications and systems. My journey began with
            JavaScript and has evolved through various technologies and
            frameworks, always staying at the forefront of web development.
          </Text>
          <Text>
            Throughout my career, I've focused on delivering high-quality
            applications that solve real business problems. I've worked in agile
            environments, leading teams and mentoring junior developers while
            maintaining a hands-on approach to coding and architecture.
          </Text>
          <Text>
            My technical expertise spans the entire stack, from frontend
            development with React and Next.js to backend systems with Node.js,
            and DevOps with Google Cloud Platform and Kubernetes.
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
