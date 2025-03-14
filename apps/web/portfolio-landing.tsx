import {
  ArrowRight,
  Code,
  Github,
  Linkedin,
  Mail,
  Monitor,
  Server,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        {/* Navigation */}
        <nav className="p-4 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] flex justify-between items-center mb-16">
          <div className="font-semibold text-xl text-gray-700">
            dev.portfolio
          </div>
          <div className="flex gap-8">
            <Link
              href="#about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#skills"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mb-20">
          <div className="p-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Jane Developer
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Full Stack Developer specializing in modern web applications
              </p>
              <div className="flex gap-4">
                <Link
                  href="#contact"
                  className="px-6 py-3 bg-gray-700 text-white rounded-xl flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-shadow"
                >
                  Contact Me <ArrowRight size={18} />
                </Link>
                <Link
                  href="#projects"
                  className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-shadow"
                >
                  View Projects
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-60 h-60 bg-gray-200 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center">
                <User size={80} className="text-gray-500" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">About Me</h2>
          <div className="p-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
            <p className="text-gray-600 mb-6">
              I'm a passionate Full Stack Developer with 5 years of experience
              building modern web applications. I specialize in React, Next.js,
              and Node.js, creating performant and accessible user experiences.
            </p>
            <p className="text-gray-600 mb-6">
              After graduating with a degree in Computer Science, I've worked
              with startups and established companies to deliver high-quality
              software solutions across various industries.
            </p>
            <p className="text-gray-600">
              When I'm not coding, you can find me hiking, reading, or
              experimenting with new technologies to stay at the forefront of
              web development.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] overflow-hidden transition-transform hover:translate-y-[-5px]"
              >
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900"
                  >
                    View Project <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <Monitor size={32} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Frontend
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>React & Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>HTML & CSS</li>
                <li>UI/UX Design</li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <Server size={32} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Backend
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Node.js & Express</li>
                <li>PostgreSQL & MongoDB</li>
                <li>GraphQL</li>
                <li>REST API Design</li>
                <li>Authentication & Security</li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <Code size={32} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Tools & Others
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Git & GitHub</li>
                <li>Docker</li>
                <li>CI/CD</li>
                <li>Testing (Jest, Cypress)</li>
                <li>AWS & Vercel</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Get In Touch
          </h2>
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Send Me a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:outline-none transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:outline-none transition"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-200 focus:outline-none transition"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gray-700 text-white rounded-xl flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-shadow"
                  >
                    Send Message <ArrowRight size={18} />
                  </button>
                </form>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <Mail size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-gray-700">jane@developer.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <Linkedin size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">LinkedIn</div>
                      <div className="text-gray-700">
                        linkedin.com/in/janedeveloper
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <Github size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">GitHub</div>
                      <div className="text-gray-700">
                        github.com/janedeveloper
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto p-6 text-center text-gray-600">
        <p>
          © {new Date().getFullYear()} Jane Developer. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

// Sample project data
const projects = [
  {
    title: 'E-commerce Platform',
    description:
      'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    image: '/placeholder.svg?height=400&width=600',
    link: '#',
  },
  {
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team functionality.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    image: '/placeholder.svg?height=400&width=600',
    link: '#',
  },
  {
    title: 'Finance Dashboard',
    description:
      'Interactive dashboard for financial data visualization with customizable reports.',
    technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
    image: '/placeholder.svg?height=400&width=600',
    link: '#',
  },
  {
    title: 'Social Media Platform',
    description:
      'A social networking platform with user profiles, posts, and direct messaging.',
    technologies: ['Next.js', 'GraphQL', 'Prisma', 'AWS'],
    image: '/placeholder.svg?height=400&width=600',
    link: '#',
  },
]
