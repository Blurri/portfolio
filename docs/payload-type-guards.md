# PayloadCMS Type Guards

This document explains how to use the type guard utilities we've created to handle PayloadCMS relationship fields in a type-safe way.

## The Challenge with PayloadCMS Relationships

PayloadCMS relationship fields can exist in multiple states:

1. As a string ID when not populated
2. As a full object when populated
3. As null/undefined when no relationship exists

This is why PayloadCMS generates types like `string | Technology` for relationship fields. TypeScript needs help to know which type you're dealing with at runtime.

## Our Type Guard Utilities

We've created a set of utility functions in `apps/web/utils/type-guards.ts` to make it easier to handle these relationship fields:

### 1. Pre-defined Type Guards

```typescript
import { isTechnology, isCategory } from '@/utils/type-guards'

// Usage
const validTechnologies = technologies.filter(isTechnology)
const validCategories = categories.filter(isCategory)
```

### 2. Creating Custom Type Guards

If you need a type guard for a different entity type, you can create one using the `createTypeGuard` function:

```typescript
import { createTypeGuard } from '@/utils/type-guards'
import { User } from '@/payload-types'

// Create a type guard for User objects
const isUser = createTypeGuard<User>(['id', 'email'])

// Usage
const validUsers = users.filter(isUser)
```

### 3. Filtering Arrays

The `filterPopulated` function makes it easy to filter arrays of relationship fields:

```typescript
import { filterPopulated, isTechnology } from '@/utils/type-guards'

// Get technologies for this category
const technologies = filterPopulated(category.technologies, isTechnology)
```

## Example: Processing Relationship Data

Here's a complete example of how to use these utilities in a server component:

```typescript
import { getPayload } from 'payload'
import payloadConfig from '../payload.config'
import { Category, Technology } from '@/payload-types'
import { filterPopulated, isTechnology, isCategory } from '@/utils/type-guards'

export default async function MyComponent(): Promise<JSX.Element> {
  // Initialize Payload
  const payload = await getPayload({ config: payloadConfig })

  // Fetch data
  const response = await payload.find({
    collection: 'categories',
    depth: 1,
  })

  // Process data with type safety
  const categories = response.docs
    .filter(isCategory)
    .map((category) => {
      // Get technologies using our utility function
      const technologies = filterPopulated(category.technologies, isTechnology)
        .sort((a, b) => (b.years || 0) - (a.years || 0))

      return { ...category, technologies }
    })

  // Use the processed data
  return <ClientComponent categories={categories} />
}
```

## Why This Approach Is Better

1. **Reusability**: Define type guards once and reuse them across your application
2. **Consistency**: Ensures consistent type checking throughout your codebase
3. **Readability**: Makes your code more readable by abstracting away the type checking logic
4. **Maintainability**: Easier to update if PayloadCMS changes how relationship fields work

## Future Improvements

The PayloadCMS team is working on better TypeScript utilities for relationship fields. When these become available, we can update our approach to use their official solutions. 