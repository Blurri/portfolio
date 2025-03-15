import { getPayload } from 'payload'
import payloadConfig from '../payload.config'
import { Experience } from '@/payload-types'
import {
  filterPopulated,
  isExperience,
  isTechnology,
} from '@/utils/type-guards'
import ExperienceClient from './experience-client'

/**
 * Server component that fetches and processes experience data from Payload CMS
 */
export default async function ExperienceList() {
  try {
    // Initialize Payload
    const payload = await getPayload({ config: payloadConfig })

    // Fetch experience data sorted by order (ascending)
    const experienceResponse = await payload.find({
      collection: 'experience',
      sort: 'order',
      depth: 1, // Fetch related technologies
    })

    // Process experience data to ensure type safety
    const experiences = experienceResponse.docs
      .filter(isExperience)
      .map((experience: Experience) => {
        // Process technologies to ensure they are properly typed
        const technologies = filterPopulated(
          experience.technologies,
          isTechnology,
        )

        // Return the processed experience with properly typed technologies
        return {
          ...experience,
          technologies,
        }
      })

    // Pass the processed data to the client component
    return <ExperienceClient experiences={experiences} />
  } catch (error) {
    console.error('Error fetching experience data:', error)
    return <div>Failed to load experience data</div>
  }
}
