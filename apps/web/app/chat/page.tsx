'use client'

import { useRef, useEffect } from 'react'
import { Bot, Send, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import ReactMarkdown from 'react-markdown'

export default function ChatPage() {
  // Use a stable ID to prevent re-initialization
  const chatId = useRef(
    'portfolio-chat-' + Math.random().toString(36).substring(2, 9),
  ).current
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simplified useChat with minimal options
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      id: chatId,
      initialMessages: [
        {
          id: '1',
          role: 'assistant',
          content:
            "Hi there! I'm an AI assistant that can answer questions about this developer's experience and skills. What would you like to know?",
        },
      ],
      // Add throttling to reduce update frequency
      experimental_throttle: 50,
    })

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messagesEndRef]) //Corrected dependency

  return (
    <div className="fixed inset-0 pt-20 pb-0 px-4 md:px-8 lg:px-12">
      <div className="h-full max-w-4xl mx-auto flex flex-col neu-flat dark:dark-neu-flat rounded-[30px] overflow-hidden">
        {/* Messages Area - Scrollable */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6">
          {messages.map((message) => (
            <div
              key={
                message.id ||
                `msg-${Math.random().toString(36).substring(2, 9)}`
              }
              className={cn(
                'mb-4 max-w-[70%]',
                message.role === 'user' ? 'ml-auto' : 'mr-auto',
              )}
            >
              <div
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    message.role === 'user'
                      ? 'neu-circle dark:dark-neu-circle'
                      : 'neu-circle dark:dark-neu-circle bg-purple-100 dark:bg-purple-900',
                  )}
                >
                  {message.role === 'user' ? (
                    <User
                      size={16}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  ) : (
                    <Bot
                      size={16}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  )}
                </div>
                <div
                  className={cn(
                    'p-4 rounded-[20px]',
                    message.role === 'user'
                      ? 'neu-flat dark:dark-neu-flat'
                      : 'neu-pressed dark:dark-neu-pressed',
                  )}
                >
                  <div className="text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none">
                    {message.role === 'user' ? (
                      <p>{message.content}</p>
                    ) : (
                      <div className="w-full overflow-hidden">
                        <ReactMarkdown
                          className="break-words"
                          components={{
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                className="text-purple-600 dark:text-purple-400 hover:underline break-words"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p {...props} className="mb-2 break-words" />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul {...props} className="list-disc pl-4 mb-2" />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                {...props}
                                className="list-decimal pl-4 mb-2"
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li {...props} className="mb-1" />
                            ),
                            pre: ({ node, ...props }) => (
                              <pre
                                {...props}
                                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm"
                              />
                            ),
                            code: ({ node, ...props }) => (
                              <code
                                {...props}
                                className="block bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded text-sm overflow-x-auto w-full"
                              />
                            ),
                            img: ({ node, ...props }) => (
                              <img {...props} className="max-w-full h-auto" />
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Simple loading indicator */}
          {isLoading && (
            <div className="mb-4 max-w-[80%] mr-auto">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 neu-circle dark:dark-neu-circle bg-purple-100 dark:bg-purple-900">
                  <Bot
                    size={16}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
                <div className="p-3 rounded-xl neu-inset dark:dark-neu-inset">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form - Fixed at bottom */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 p-4 border-t border-gray-200 dark:border-gray-800 bg-neu-background dark:bg-dark-neu-background"
        >
          <div className="flex-1 neu-pressed dark:dark-neu-pressed rounded-[20px] overflow-hidden">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="w-full py-3 px-4 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="neu-button dark:dark-neu-button p-4 rounded-[20px] text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:scale-105 active:scale-95"
            disabled={isLoading || input.trim() === ''}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
