import { openai } from '@ai-sdk/openai'
import { createDataStreamResponse, streamText } from 'ai'

export const maxDuration = 30 // Allow responses up to 30 seconds

export async function POST(req: Request) {
  const { messages } = await req.json()

  return createDataStreamResponse({
    execute: async (dataStream) => {
      // Send initial status
      dataStream.writeData({ status: 'thinking' })

      const result = streamText({
        model: openai('gpt-4o-mini'),
        system:
          "You are an AI assistant for a senior developer's portfolio website. Provide helpful, concise information about the developer's skills, experience, and projects. The developer has 15+ years of experience with expertise in React, Next.js, Node.js, GraphQL, and cloud technologies like Google Cloud Platform and Kubernetes.",
        messages,
        onChunk: () => {
          // Update status to generating when we start receiving chunks
          dataStream.writeData({ status: 'generating' })
        },
        onFinish: () => {
          // Send completion status and any additional metadata
          dataStream.writeData({
            status: 'complete',
            metadata: {
              responseTime: new Date().toISOString(),
              model: 'gpt-4o-mini',
            },
          })
        },
      })

      // Merge the text stream into our data stream
      result.mergeIntoDataStream(dataStream)
    },
    onError: (error) => {
      console.error('Error in chat API:', error)
      return 'An error occurred while processing your request. Please try again.'
    },
  })
}
