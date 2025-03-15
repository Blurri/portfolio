import { CollectionConfig, Field } from 'payload'
import { Config } from '../payload-types'

/**
 * Type for collection slugs from the generated PayloadCMS types
 */
export type PayloadCollectionSlug = keyof Config['collections']

/**
 * Helper function to define a PayloadCMS collection with proper typing
 * @param config - The collection configuration
 * @returns The typed collection configuration
 */
export const defineCollection = <T extends CollectionConfig>(config: T): T =>
  config

/**
 * Helper function to create an upload field that relates to the media collection
 * @param fieldConfig - The field configuration without the relationTo property
 * @returns The complete field configuration with the media relation
 */
export const createUploadField = <T extends Omit<Field, 'relationTo'>>(
  fieldConfig: T,
) => ({
  ...fieldConfig,
  relationTo: 'media' as const,
})

/**
 * Helper function to create a relationship field with proper typing
 * @param fieldConfig - The field configuration including the relationTo property
 * @returns The complete field configuration with the typed relation
 */
export const createRelationshipField = <T extends Omit<Field, 'relationTo'>>(
  fieldConfig: T & {
    relationTo: PayloadCollectionSlug | PayloadCollectionSlug[]
  },
) => ({
  ...fieldConfig,
  relationTo: fieldConfig.relationTo,
})
