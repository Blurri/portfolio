/**
 * PayloadCMS Collections
 *
 * This file exports all collections organized by logical groups:
 * - Taxonomy: Categories, Technologies
 * - Content: Projects, Experience, Page Content, Testimonials, Media
 * - Settings: Users, Social Links, Settings
 * - Forms: Contact
 */

import { TaxonomyCollections } from './taxonomy'
import { ContentCollections } from './content'
import { SettingsCollections } from './settings'
import { FormsCollections } from './forms'

// Export all collections as a flat array for PayloadCMS config
export const collections = [
  ...TaxonomyCollections,
  ...ContentCollections,
  ...SettingsCollections,
  ...FormsCollections,
]
