import { Category, Technology } from '@/payload-types'

/**
 * Generic type guard to check if a value is a populated object with required properties
 * @param value - The value to check
 * @param requiredProps - Array of property names that should exist on the object
 * @returns boolean - True if the value is an object with all required properties
 */
export const isPopulatedObject = <T>(
  value: unknown,
  requiredProps: string[],
): value is T => {
  if (!value || typeof value !== 'object') return false
  return requiredProps.every((prop) => prop in value)
}

/**
 * Type guard for Technology objects
 * @param value - The value to check
 * @returns boolean - True if the value is a Technology object
 */
export const isTechnology = (value: unknown): value is Technology =>
  isPopulatedObject<Technology>(value, ['id', 'name', 'years'])

/**
 * Type guard for Category objects
 * @param value - The value to check
 * @returns boolean - True if the value is a Category object
 */
export const isCategory = (value: unknown): value is Category =>
  isPopulatedObject<Category>(value, ['id', 'name'])

/**
 * Generic type guard factory that creates type guards for any entity type
 * @param requiredProps - Array of property names that should exist on the entity
 * @returns A type guard function for the specified entity type
 */
export function createTypeGuard<T>(requiredProps: string[]) {
  return (value: unknown): value is T =>
    isPopulatedObject<T>(value, requiredProps)
}

/**
 * Filter an array to only include populated objects of a specific type
 * @param array - The array to filter, or null/undefined
 * @param typeGuard - The type guard function to use
 * @returns An array containing only items that pass the type guard
 */
export function filterPopulated<T, U>(
  array: (T | U | null | undefined)[] | null | undefined,
  typeGuard: (value: unknown) => value is U,
): U[] {
  if (!array || !Array.isArray(array)) return []
  return array.filter((item): item is U => typeGuard(item))
}
