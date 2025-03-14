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
        <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6 md:p-8">
          <div className="space-y-8">
            {[
              {
                period: '2020 - Present',
                role: 'Lead Full Stack Developer',
                company: 'Enterprise Solutions Inc.',
                description:
                  'Leading development of cloud-native applications using React, Next.js, GraphQL, and Google Cloud Platform. Implementing CI/CD pipelines and managing Kubernetes clusters for scalable deployments.',
                technologies: [
                  'React',
                  'Next.js',
                  'GraphQL',
                  'Node.js',
                  'GCP',
                  'Kubernetes',
                ],
              },
              {
                period: '2016 - 2020',
                role: 'Senior Frontend Developer',
                company: 'Web Innovations Ltd.',
                description:
                  "Developed complex single-page applications using React and Meteor. Implemented GraphQL APIs and contributed to the company's component library. Mentored junior developers and led frontend architecture decisions.",
                technologies: [
                  'React',
                  'Meteor',
                  'GraphQL',
                  'JavaScript',
                  'CSS3',
                  'MongoDB',
                ],
              },
              {
                period: '2012 - 2016',
                role: 'Frontend Developer',
                company: 'Digital Solutions Co.',
                description:
                  'Built responsive web applications using Angular and jQuery. Worked on transitioning legacy applications to modern frameworks and improved performance of existing systems.',
                technologies: [
                  'Angular',
                  'jQuery',
                  'JavaScript',
                  'HTML5',
                  'CSS3',
                  'REST APIs',
                ],
              },
              {
                period: '2008 - 2012',
                role: 'Web Developer',
                company: 'Creative Web Agency',
                description:
                  'Developed interactive websites using JavaScript, jQuery, and Flash. Created custom animations and user interfaces for various client projects.',
                technologies: [
                  'JavaScript',
                  'jQuery',
                  'Flash',
                  'HTML',
                  'CSS',
                  'PHP',
                ],
              },
            ].map((job, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="neu-pressed dark:dark-neu-pressed rounded-[20px] p-5">
                    <div className="text-purple-600 dark:text-purple-400 font-medium mb-1">
                      {job.period}
                    </div>
                    <Heading level="h3">{job.role}</Heading>
                    <Text variant="muted">{job.company}</Text>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <Text className="mb-4">{job.description}</Text>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="neu-button dark:dark-neu-button rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
              className="neu-pressed dark:dark-neu-pressed rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 neu-circle-sm dark:dark-neu-circle-sm rounded-full flex items-center justify-center">
                  {skillSet.icon}
                </div>
                <Heading level="h3" className="mb-0">
                  {skillSet.category}
                </Heading>
              </div>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                {skillSet.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    {skill}
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
