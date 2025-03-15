import { NeuContainer } from '@workspace/ui/components/neu-container'
import { Heading } from '@workspace/ui/components/typography'
import { Code, Database, Server } from 'lucide-react'

export default async function TechnicalExpertise() {
  return (
    <>
      <Heading level="h2" dataSectionTitle="Technical Expertise">
        Technical Expertise
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Data.map((category, index) => (
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
    </>
  )
}

const Data = [
  {
    title: 'Frontend Development',
    icon: <Code className="text-gray-700 dark:text-gray-300" size={24} />,
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
    icon: <Server className="text-gray-700 dark:text-gray-300" size={24} />,
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
    icon: <Database className="text-gray-700 dark:text-gray-300" size={24} />,
    skills: [
      'Google Cloud Platform',
      'Kubernetes Orchestration',
      'Cloud Run Deployments',
      'CI/CD Pipeline Setup',
      'Infrastructure as Code',
    ],
  },
]
