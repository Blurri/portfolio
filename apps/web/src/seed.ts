import type { Payload } from 'payload'
import type { Category, Technology, Experience } from '../payload-types'
import { devUser } from './helpers/credentials'

/**
 * Seed function that populates the database with initial data
 * @param payload - The Payload instance
 * @param options - Options for seeding
 */
export const seed = async (
  payload: Payload,
  options: { reset?: boolean } = {},
) => {
  const { reset = false } = options

  // If reset is true, delete all existing data first
  if (reset) {
    console.log('🧹 Resetting database...')
    await resetDatabase(payload)
  }

  console.log('🌱 Seeding database...')

  // Seed user if it doesn't exist
  if (process.env.NODE_ENV === 'development') {
    await seedUser(payload)
  }

  // Define categories
  const categories = [
    { name: 'Frontend', order: 1 },
    { name: 'Backend', order: 2 },
    { name: 'DevOps & Cloud', order: 3 },
    { name: 'Mobile', order: 4 },
    { name: 'Databases', order: 5 },
    { name: 'Other', order: 6 },
  ]

  // Create categories and store them
  const createdCategories: Record<string, Category | null> = {}
  for (const category of categories) {
    const createdCategory = await seedCategory(
      payload,
      category.name,
      category.order,
    )
    if (createdCategory) {
      createdCategories[category.name] = createdCategory
    }
  }

  // Define technologies by category with years of experience
  const technologies: Record<
    string,
    Array<{ name: string; years: number; order: number }>
  > = {
    Frontend: [
      { name: 'React', years: 9, order: 1 },
      { name: 'Next.js', years: 5, order: 2 },
      { name: 'TypeScript', years: 7, order: 3 },
      { name: 'JavaScript', years: 10, order: 4 },
      { name: 'Vue.js', years: 1, order: 5 },
      { name: 'AngularJS', years: 1, order: 6 },
      { name: 'Tailwind CSS', years: 2, order: 7 },
      { name: 'Shadcn UI', years: 2, order: 8 },
      { name: 'React-Three-Fiber', years: 1, order: 9 },
    ],
    Backend: [
      { name: 'Node.js', years: 9, order: 1 },
      { name: 'GraphQL', years: 6, order: 2 },
      { name: 'Apollo', years: 5, order: 3 },
      { name: 'Pothos', years: 3, order: 4 },
      { name: 'Prisma ORM', years: 4, order: 5 },
      { name: 'Meteor.js', years: 7, order: 6 },
      { name: 'Elixir/Phoenix', years: 1, order: 7 },
    ],
    'DevOps & Cloud': [
      { name: 'Kubernetes', years: 5, order: 1 },
      { name: 'Google Cloud', years: 5, order: 2 },
      { name: 'Firebase', years: 5, order: 3 },
      { name: 'CI/CD Pipelines', years: 7, order: 4 },
      { name: 'Docker', years: 6, order: 5 },
    ],
    Mobile: [
      { name: 'React Native', years: 6, order: 1 },
      { name: 'iOS/Swift', years: 3, order: 2 },
      { name: 'Unity VR', years: 1, order: 3 },
    ],
    Databases: [
      { name: 'PostgreSQL', years: 9, order: 1 },
      { name: 'MongoDB', years: 7, order: 2 },
      { name: 'SQL', years: 11, order: 3 },
    ],
    Other: [
      { name: 'Agile Methodologies', years: 9, order: 1 },
      { name: 'Project Management', years: 9, order: 2 },
      { name: 'Blender', years: 1, order: 3 },
      { name: 'Java', years: 2, order: 4 },
      { name: 'PHP', years: 2, order: 5 },
    ],
  }

  // Seed technologies for each category
  for (const [categoryName, techs] of Object.entries(technologies)) {
    const category = createdCategories[categoryName]
    if (category && category.id) {
      const techIds = []

      for (const tech of techs) {
        const createdTech = await seedTechnology(
          payload,
          tech.name,
          tech.years,
          category.id,
          tech.order,
        )

        if (createdTech) {
          techIds.push(createdTech.id)
        }
      }

      // Update category with technology IDs
      if (techIds.length > 0) {
        await payload.update({
          collection: 'categories',
          id: category.id,
          data: {
            technologies: techIds,
          },
        })
      }
    }
  }

  // Seed work experience
  await seedWorkExperience(payload)

  // Seed projects
  await seedProjects(payload)

  console.log('✅ Database seeded successfully!')
}

/**
 * Reset the database by deleting all documents from all collections
 */
async function resetDatabase(payload: Payload): Promise<void> {
  // Define the order of collections to delete
  // Delete dependent collections first before their references
  const collectionOrder = [
    'testimonials',
    'contact',
    'social-links',
    'projects',
    'experience',
    'technologies',
    'media',
    'categories',
    'settings',
    'users',
  ] as const

  // Type to ensure we only use valid collection names
  type ValidCollection = (typeof collectionOrder)[number]

  // Delete collections in the specified order
  for (const collectionName of collectionOrder) {
    try {
      console.log(`🗑️  Deleting all documents from ${collectionName}...`)

      let hasMoreDocs = true
      let deletedCount = 0

      // Continue fetching and deleting documents until no more remain
      while (hasMoreDocs) {
        try {
          // Find documents in the collection (always fetch first page as we're deleting them)
          const { docs, totalDocs } = await payload.find({
            collection: collectionName,
            limit: 100, // Use a smaller batch size for better performance
            page: 1, // Always get the first page as we're deleting documents
          })

          // If no documents found, we're done with this collection
          if (docs.length === 0) {
            hasMoreDocs = false
            break
          }

          // Delete each document in the current batch
          for (const doc of docs) {
            await payload.delete({
              collection: collectionName,
              id: doc.id,
            })
            deletedCount++
          }

          // Log progress for large collections
          console.log(
            `Progress: Deleted ${deletedCount} documents from ${collectionName}...`,
          )

          // Check if we've deleted all documents
          if (deletedCount >= totalDocs) {
            hasMoreDocs = false
          }
        } catch (error) {
          console.error(`Error processing batch for ${collectionName}:`, error)
          hasMoreDocs = false // Stop on error
        }
      }

      console.log(
        `✅ Deleted all documents (${deletedCount} total) from ${collectionName}`,
      )
    } catch (error) {
      console.error(
        `❌ Error deleting documents from ${collectionName}:`,
        error,
      )
    }
  }
}

// Helper function to seed a user if it doesn't exist
async function seedUser(payload: Payload): Promise<void> {
  const { totalDocs } = await payload.find({
    collection: 'users',
    limit: 0,
    where: {
      email: {
        equals: devUser.email,
      },
    },
  })

  if (totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        ...devUser,
        role: devUser.role || 'admin',
      },
    })
  }
}

// Helper function to seed a category if it doesn't exist
async function seedCategory(
  payload: Payload,
  name: string,
  order: number,
): Promise<Category | null> {
  try {
    const { docs: existingCategories } = await payload.find({
      collection: 'categories',
      where: {
        name: {
          equals: name,
        },
      },
    })

    if (existingCategories.length === 0) {
      return await payload.create({
        collection: 'categories',
        data: {
          name,
          order,
        },
      })
    }

    return existingCategories[0] || null
  } catch (error) {
    console.error(`Error seeding category ${name}:`, error)
    return null
  }
}

// Helper function to seed a technology if it doesn't exist
async function seedTechnology(
  payload: Payload,
  name: string,
  years: number,
  categoryId: number,
  order: number,
): Promise<Technology | null> {
  try {
    const { docs: existingTechnologies } = await payload.find({
      collection: 'technologies',
      where: {
        name: {
          equals: name,
        },
      },
    })

    if (existingTechnologies.length === 0) {
      return await payload.create({
        collection: 'technologies',
        data: {
          name,
          years,
          category: categoryId,
          order,
        },
      })
    }

    return existingTechnologies[0] || null
  } catch (error) {
    console.error(`Error seeding technology ${name}:`, error)
    return null
  }
}

/**
 * Seed work experience data based on resume
 */
async function seedWorkExperience(payload: Payload): Promise<void> {
  console.log('🧑‍💼 Seeding work experience...')

  // Define work experience entries with basic data
  const experienceData = [
    {
      company: 'Panter AG',
      title: 'Software Engineer',
      location: 'Switzerland',
      startDate: '2016-05-01',
      endDate: '2025-04-30',
      current: false,
      descriptionText:
        'At Panter AG, I was responsible for developing and maintaining modern web and mobile applications. My main focus was frontend development using React, React Native, Next.js, Vue.js, and AngularJS, while also working on fullstack solutions using Node.js, GraphQL (Apollo, Pothos), and Prisma ORM. I managed database operations with PostgreSQL, SQL, and MongoDB and played a key role in implementing CI/CD pipelines, cloud solutions with Google Cloud and Kubernetes, and scalable deployments.',
      highlights: [
        'CO2 tracking apps (React Native, Elixir/Phoenix backend)',
        'Hackathon platform for remote collaboration during the COVID-19 pandemic',
        'Customer advisory software (Vue.js frontend)',
        '3D gallery showcasing historical data using React-Three-Fiber and Blender',
        'Cycling promotion platforms (Velomittwoch, Cyclomania, Bike to Work) using Meteor.js, React, and Node.js',
      ],
      order: 1,
    },
    {
      company: 'PM Medici',
      title: 'Software Engineer',
      location: 'Switzerland',
      startDate: '2014-01-01',
      endDate: '2016-01-01',
      current: false,
      descriptionText:
        'At PM Medici, I developed backend and frontend solutions in Java, PHP, JavaScript, and Swift. A key project was building an iOS application with Beacon integration, which enabled precise location-based features. Additionally, I was responsible for maintaining and optimizing existing software solutions to improve performance and scalability.',
      highlights: [
        'iOS application with Beacon integration',
        'Backend and frontend solutions in Java, PHP, JavaScript, and Swift',
        'Software optimization for improved performance and scalability',
      ],
      order: 2,
    },
    {
      company: 'DWA AG',
      title: 'Software Engineer',
      location: 'Switzerland',
      startDate: '2013-01-01',
      endDate: '2014-01-01',
      current: false,
      descriptionText:
        'At DWA AG, I worked on web applications using VB.Net, assisted with customer onboarding, and developed iOS clients to extend the functionality of existing software. This role deepened my expertise in software integration and client-facing technical support.',
      highlights: [
        'Web applications using VB.Net',
        'Customer onboarding assistance',
        'iOS client development',
        'Software integration and client-facing technical support',
      ],
      order: 3,
    },
    {
      company: 'Rucotec',
      title: 'Intern - Application Developer',
      location: 'Switzerland',
      startDate: '2012-01-01',
      endDate: '2013-01-01',
      current: false,
      descriptionText:
        'During my internship at Rucotec, I contributed to the development of a medical web application for stem cell extraction. This project involved WebObjects (Java) for backend development and the creation of an iOS client to interface with the system.',
      highlights: [
        'Medical web application for stem cell extraction',
        'Backend development with WebObjects (Java)',
        'iOS client development',
      ],
      order: 4,
    },
  ]

  // Create or update each experience entry
  for (const expData of experienceData) {
    try {
      const {
        company,
        title,
        location,
        startDate,
        endDate,
        current,
        descriptionText,
        highlights,
        order,
      } = expData

      // Format the description as a simple rich text object
      const description = {
        root: {
          children: [
            {
              children: [
                {
                  text: descriptionText,
                },
              ],
              type: 'p',
              version: 1,
            },
          ],
          direction: null,
          format: '' as const,
          indent: 0,
          type: 'root',
          version: 1,
        },
      }

      // Format the highlights as objects
      const formattedHighlights = highlights.map((highlight) => ({
        highlight,
      }))

      // Create the experience data object with proper typing
      const experienceEntry = {
        company,
        title,
        location,
        startDate,
        endDate,
        current,
        description,
        highlights: formattedHighlights,
        order,
      }

      // Check if the experience already exists
      const { docs: existingExperiences } = await payload.find({
        collection: 'experience',
        where: {
          company: {
            equals: company,
          },
          title: {
            equals: title,
          },
        },
      })

      if (existingExperiences.length === 0) {
        await payload.create({
          collection: 'experience',
          data: experienceEntry,
        })
        console.log(`✅ Created experience: ${title} at ${company}`)
      } else {
        const id = existingExperiences[0]?.id
        if (id) {
          await payload.update({
            collection: 'experience',
            id,
            data: experienceEntry,
          })
          console.log(`🔄 Updated experience: ${title} at ${company}`)
        }
      }
    } catch (error) {
      console.error(
        `❌ Error seeding experience for ${expData.company}:`,
        error,
      )
    }
  }
}

/**
 * Seed project data based on resume
 */
async function seedProjects(payload: Payload): Promise<void> {
  console.log('🚀 Seeding projects...')

  // Define project entries
  const projectsData = [
    {
      title: 'CO2 Tracking Application',
      slug: 'co2-tracking-app',
      status: 'completed',
      projectType: 'mobile-app',
      summary:
        'Mobile application for tracking and reducing carbon footprint with gamification elements.',
      descriptionText:
        'Developed a comprehensive CO2 tracking application using React Native for the frontend and Elixir/Phoenix for the backend. The app allows users to track their daily activities and calculate their carbon footprint, offering personalized suggestions for reducing emissions. Features include activity tracking, progress visualization, achievement badges, and community challenges to encourage sustainable behavior.',
      technologies: ['React Native', 'Elixir/Phoenix', 'PostgreSQL', 'Node.js'],
      featured: true,
      order: 1,
    },
    {
      title: 'Remote Hackathon Platform',
      slug: 'remote-hackathon-platform',
      status: 'completed',
      projectType: 'web-app',
      summary:
        'Collaborative platform enabling remote hackathons during the COVID-19 pandemic.',
      descriptionText:
        'Created a virtual hackathon platform to facilitate remote collaboration during the COVID-19 pandemic. The platform includes real-time collaboration tools, video conferencing integration, project submission and evaluation systems, and team formation capabilities. It was built using React, Node.js, and MongoDB, with WebSocket integration for real-time features.',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'GraphQL'],
      featured: true,
      order: 2,
    },
    {
      title: 'Customer Advisory Software',
      slug: 'customer-advisory-software',
      status: 'completed',
      projectType: 'web-app',
      summary:
        'Vue.js-based application for financial advisors to manage client portfolios and recommendations.',
      descriptionText:
        'Developed a comprehensive customer advisory software using Vue.js for the frontend. The application helps financial advisors manage client portfolios, track investment performance, generate personalized recommendations, and maintain client communication. The system includes data visualization components, document management, and integration with financial data providers.',
      technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Chart.js'],
      featured: false,
      order: 3,
    },
    {
      title: '3D Historical Data Gallery',
      slug: '3d-historical-data-gallery',
      status: 'completed',
      projectType: 'web-app',
      summary:
        'Interactive 3D gallery showcasing historical data using React-Three-Fiber and Blender.',
      descriptionText:
        'Created an immersive 3D gallery experience to visualize historical data and artifacts. Used React-Three-Fiber for the web-based 3D rendering and Blender for creating detailed 3D models. The gallery allows users to navigate through different historical periods, interact with artifacts, and access detailed information about each item. The project includes custom lighting effects, interactive elements, and educational content.',
      technologies: [
        'React',
        'React-Three-Fiber',
        'Blender',
        'JavaScript',
        'Three.js',
      ],
      featured: true,
      order: 4,
    },
    {
      title: 'Cycling Promotion Platforms',
      slug: 'cycling-promotion-platforms',
      status: 'completed',
      projectType: 'web-app',
      summary:
        'Suite of web applications promoting cycling initiatives (Velomittwoch, Cyclomania, Bike to Work).',
      descriptionText:
        'Developed multiple interconnected platforms to promote cycling initiatives across Switzerland. These platforms include Velomittwoch, Cyclomania, and Bike to Work, each targeting different aspects of cycling promotion. Features include route tracking, achievement systems, community challenges, and statistical reporting. The platforms were built using Meteor.js, React, and Node.js with MongoDB for data storage.',
      technologies: ['Meteor.js', 'React', 'Node.js', 'MongoDB'],
      featured: false,
      order: 5,
    },
    {
      title: 'iOS Beacon Application',
      slug: 'ios-beacon-application',
      status: 'completed',
      projectType: 'mobile-app',
      summary:
        'Location-aware iOS application using Beacon technology for precise indoor positioning.',
      descriptionText:
        "Developed an iOS application that leverages Beacon technology for precise indoor location tracking. The app provides location-specific information, navigation assistance, and personalized content based on the user's exact position within a facility. Built using Swift with a custom backend to manage beacon interactions and content delivery.",
      technologies: ['iOS/Swift', 'Java', 'Beacon Technology'],
      featured: false,
      order: 6,
    },
    {
      title: 'Medical Stem Cell Application',
      slug: 'medical-stem-cell-application',
      status: 'completed',
      projectType: 'web-app',
      summary:
        'Web application for managing stem cell extraction processes and data.',
      descriptionText:
        'Contributed to the development of a specialized medical web application for stem cell extraction processes. The system manages patient data, extraction procedures, laboratory workflows, and result tracking. Developed using WebObjects (Java) for the backend with an iOS client interface for mobile access to critical information.',
      technologies: ['Java', 'WebObjects', 'iOS/Swift'],
      featured: false,
      order: 7,
    },
  ]

  // Create rich text description format
  const createRichTextDescription = (text: string) => ({
    root: {
      children: [
        {
          children: [
            {
              text,
            },
          ],
          type: 'p',
          version: 1,
        },
      ],
      direction: null,
      format: '' as const,
      indent: 0,
      type: 'root',
      version: 1,
    },
  })

  // Create or update each project
  for (const projectData of projectsData) {
    try {
      const {
        title,
        slug,
        status,
        projectType,
        summary,
        descriptionText,
        technologies,
        featured,
        order,
      } = projectData

      // Get technology IDs
      const techIds = []
      for (const techName of technologies) {
        const { docs } = await payload.find({
          collection: 'technologies',
          where: {
            name: {
              equals: techName,
            },
          },
        })

        if (docs.length > 0) {
          techIds.push(docs[0].id)
        }
      }

      // Create the project data object
      const projectEntry = {
        title,
        slug,
        status,
        projectType,
        summary,
        description: createRichTextDescription(descriptionText),
        technologies: techIds,
        featured: !!featured,
        order,
      }

      // Check if the project already exists
      const { docs: existingProjects } = await payload.find({
        collection: 'projects',
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      if (existingProjects.length === 0) {
        await payload.create({
          collection: 'projects',
          data: projectEntry,
        })
        console.log(`✅ Created project: ${title}`)
      } else {
        const id = existingProjects[0]?.id
        if (id) {
          await payload.update({
            collection: 'projects',
            id,
            data: projectEntry,
          })
          console.log(`🔄 Updated project: ${title}`)
        }
      }
    } catch (error) {
      console.error(`❌ Error seeding project ${projectData.title}:`, error)
    }
  }
}
