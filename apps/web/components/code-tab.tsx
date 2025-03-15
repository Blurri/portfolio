'use client'

import { useSearchParams } from 'next/navigation'
import { Heading } from '@workspace/ui/components/typography'
import { NeuContainer } from '@workspace/ui/components/neu-container'
import CodeSnippet from './code-snippet'

export default function CodeTab() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'projects'

  if (tab !== 'code') return null

  return (
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
  )
}
