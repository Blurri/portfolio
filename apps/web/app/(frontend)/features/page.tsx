'use client'

import { useState } from 'react'
import { Check, Code, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import ProjectCard from '@/components/project-card'
import CodeSnippet from '@/components/code-snippet'
import { NeuContainer } from '@workspace/ui/components/neu-container'
import { NeuButton } from '@workspace/ui/components/neu-button'
import { Heading, Text } from '@workspace/ui/components/typography'
import { SkillBar } from '@workspace/ui/components/skill-bar'

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <div className="container-lg">
      <NeuContainer
        variant="flat"
        size="2xl"
        dataSectionTitle="Features Showcase"
        className="mb-12"
      >
        <Heading dataSectionTitle="Features Showcase" className="mb-6">
          Features Showcase
        </Heading>
        <Text size="lg">
          Explore my projects, technical capabilities, and development approach
          through interactive examples.
        </Text>
      </NeuContainer>

      {/* Tabs Navigation */}
      <div className="mb-8 flex flex-wrap gap-4">
        {[
          { id: 'projects', label: 'Projects', icon: <Layers size={18} /> },
          { id: 'code', label: 'Code Samples', icon: <Code size={18} /> },
          {
            id: 'skills',
            label: 'Technical Skills',
            icon: <Check size={18} />,
          },
        ].map((tab) => (
          <NeuButton
            key={tab.id}
            variant={activeTab === tab.id ? 'pressed' : 'default'}
            className={cn(
              'flex items-center gap-2',
              activeTab === tab.id && 'text-purple-600 dark:text-purple-400',
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </NeuButton>
        ))}
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="E-Commerce Platform"
              description="A full-featured e-commerce solution built with Next.js, GraphQL, and Stripe integration."
              technologies={[
                'Next.js',
                'GraphQL',
                'Node.js',
                'Stripe',
                'MongoDB',
              ]}
              image="/placeholder.svg?height=300&width=600"
              demoUrl="#"
              githubUrl="#"
            />

            <ProjectCard
              title="Real-time Dashboard"
              description="Interactive analytics dashboard with real-time data visualization for business metrics."
              technologies={[
                'React',
                'D3.js',
                'Socket.io',
                'Express',
                'PostgreSQL',
              ]}
              image="/placeholder.svg?height=300&width=600"
              demoUrl="#"
              githubUrl="#"
            />

            <ProjectCard
              title="Cloud-native CMS"
              description="Content management system built on Google Cloud with Kubernetes for scalability."
              technologies={[
                'React',
                'Node.js',
                'GCP',
                'Kubernetes',
                'MongoDB',
              ]}
              image="/placeholder.svg?height=300&width=600"
              demoUrl="#"
              githubUrl="#"
            />

            <ProjectCard
              title="AI-powered Chat App"
              description="Chat application with AI integration for automated responses and content moderation."
              technologies={['Next.js', 'OpenAI API', 'WebSockets', 'Firebase']}
              image="/placeholder.svg?height=300&width=600"
              demoUrl="#"
              githubUrl="#"
            />
          </div>

          <div data-section-title="Development Approach">
            <Heading
              level="h2"
              dataSectionTitle="Development Approach"
              className="mb-4"
            >
              Development Approach
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'User-Centered Design',
                  description:
                    'I start with user needs and work backwards, ensuring intuitive interfaces and smooth experiences.',
                },
                {
                  title: 'Agile Methodology',
                  description:
                    'I work in sprints with regular deliverables, adapting to changing requirements and priorities.',
                },
                {
                  title: 'Performance Optimization',
                  description:
                    'I focus on speed and efficiency, using techniques like code splitting and lazy loading.',
                },
              ].map((approach, index) => (
                <NeuContainer key={index} variant="pressed" size="md">
                  <Heading
                    level="h3"
                    dataSectionTitle={approach.title}
                    className="mb-2"
                  >
                    {approach.title}
                  </Heading>
                  <Text>{approach.description}</Text>
                </NeuContainer>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Code Samples Tab */}
      {activeTab === 'code' && (
        <div className="space-y-8">
          <NeuContainer
            variant="flat"
            size="lg"
            dataSectionTitle="React Hooks Example"
          >
            <Heading
              level="h3"
              dataSectionTitle="React Hooks Example"
              className="mb-4"
            >
              React Hooks Example
            </Heading>
            <CodeSnippet
              code={`import { useState, useEffect } from 'react';

// Custom hook for fetching data with loading and error states
function useDataFetching(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Example usage
function ProductList() {
  const { data, loading, error } = useDataFetching('/api/products');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {data.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}`}
              language="javascript"
            />
          </NeuContainer>

          <NeuContainer
            variant="flat"
            size="lg"
            dataSectionTitle="GraphQL API Example"
          >
            <Heading
              level="h3"
              dataSectionTitle="GraphQL API Example"
              className="mb-4"
            >
              GraphQL API Example
            </Heading>
            <CodeSnippet
              code={`// GraphQL Schema Definition
const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
    publishPost(id: ID!): Post!
  }
\`;

// Resolver Implementation
const resolvers = {
  Query: {
    users: () => db.users.findMany(),
    user: (_, { id }) => db.users.findUnique({ where: { id } }),
    posts: () => db.posts.findMany({ where: { published: true } }),
    post: (_, { id }) => db.posts.findUnique({ where: { id } })
  },
  
  Mutation: {
    createUser: (_, { name, email }) => {
      return db.users.create({
        data: { name, email }
      });
    },
    createPost: (_, { title, content, authorId }) => {
      return db.posts.create({
        data: {
          title,
          content,
          published: false,
          author: { connect: { id: authorId } }
        }
      });
    },
    publishPost: (_, { id }) => {
      return db.posts.update({
        where: { id },
        data: { published: true }
      });
    }
  },
  
  User: {
    posts: (parent) => db.posts.findMany({ 
      where: { authorId: parent.id } 
    })
  },
  
  Post: {
    author: (parent) => db.users.findUnique({ 
      where: { id: parent.authorId } 
    })
  }
};`}
              language="javascript"
            />
          </NeuContainer>
        </div>
      )}

      {/* Technical Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeuContainer
              variant="flat"
              size="lg"
              dataSectionTitle="Frontend Development"
            >
              <Heading
                level="h3"
                dataSectionTitle="Frontend Development"
                className="mb-4"
              >
                Frontend Development
              </Heading>
              <div className="space-y-4">
                {[
                  { skill: 'React & Next.js', level: 95 },
                  { skill: 'TypeScript', level: 90 },
                  { skill: 'GraphQL Client', level: 85 },
                  { skill: 'Redux/Context API', level: 90 },
                  { skill: 'CSS/SCSS/Tailwind', level: 85 },
                  { skill: 'Responsive Design', level: 90 },
                ].map((skill, index) => (
                  <SkillBar
                    key={index}
                    skill={skill.skill}
                    level={skill.level}
                  />
                ))}
              </div>
            </NeuContainer>

            <NeuContainer
              variant="flat"
              size="lg"
              dataSectionTitle="Backend Development"
            >
              <Heading
                level="h3"
                dataSectionTitle="Backend Development"
                className="mb-4"
              >
                Backend Development
              </Heading>
              <div className="space-y-4">
                {[
                  { skill: 'Node.js', level: 90 },
                  { skill: 'GraphQL API', level: 85 },
                  { skill: 'REST API Design', level: 95 },
                  { skill: 'Authentication/Security', level: 85 },
                  { skill: 'Database Design', level: 80 },
                  { skill: 'Microservices', level: 75 },
                ].map((skill, index) => (
                  <SkillBar
                    key={index}
                    skill={skill.skill}
                    level={skill.level}
                  />
                ))}
              </div>
            </NeuContainer>
          </div>
        </div>
      )}
    </div>
  )
}
