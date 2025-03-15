import { NeuContainer } from '@workspace/ui/components/neu-container'
import { Heading, Text } from '@workspace/ui/components/typography'

export default function TechnologyJourney() {
  return (
    <>
      <Heading level="h2" dataSectionTitle="Technology Journey">
        Technology Journey
      </Heading>
      <NeuContainer variant="flat" size="lg">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-900"></div>

          {Data.map((item, index) => (
            <div key={index} className="relative pl-10 pb-8">
              <div className="absolute left-2 top-1 w-5 h-5 rounded-full neu-circle dark:dark-neu-circle flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div className="mb-1 text-sm text-purple-600 dark:text-purple-400 font-medium">
                {item.year}
              </div>
              <Heading level="h3" dataSectionTitle={item.tech} className="mb-1">
                {item.tech}
              </Heading>
              <Text>{item.description}</Text>
            </div>
          ))}
        </div>
      </NeuContainer>
    </>
  )
}

const Data = [
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
]
