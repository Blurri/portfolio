# Payload CMS Data Usage Guidelines

This document outlines best practices for working with Payload CMS data in our Next.js application.

## Type Safety

We prioritize type safety throughout the application. Always use proper type definitions when working with Payload data:

- **Never use `any` types** - Use proper type definitions from `@/payload-types` instead
- **Use type predicates** when filtering data to maintain type safety
- **Create specific interface extensions** when the base types need additional properties

## Fetching Data in Server Components

When fetching data from Payload CMS in server components:

```typescript
import { getPayload } from 'payload'
import payloadConfig from '../payload.config'
import { Collection1, Collection2 } from '@/payload-types'

export default async function ServerComponent() {
  // Initialize Payload
  const payload = await getPayload({ config: payloadConfig })

  // Fetch data with proper typing
  const response = await payload.find({
    collection: 'collectionName',
    sort: 'fieldName',
    depth: 1, // Control the depth of relationship resolution
  })

  // Process data with type safety
  const processedData = response.docs
    .filter((item): item is Collection1 => !!item)
    .map((item) => {
      // Process item...
      return {
        ...item,
        // Additional processing...
      }
    })

  return <ClientComponent data={processedData} />
}
```

## Processing Relationship Data

When working with relationship data:

1. **Use type predicates** to filter out null values and ensure type safety:

```typescript
const validItems = items
  .filter((item): item is ItemType => 
    !!item && typeof item !== 'string' && 'id' in item
  )
```

2. **Sort data on the server** when possible to reduce client-side processing:

```typescript
const sortedItems = validItems.sort((a, b) => {
  // Sort logic...
  return a.order - b.order
})
```

## Client Component Data Props

When passing data to client components:

1. **Create specific prop types** that represent the processed data structure:

```typescript
type ProcessedItemType = Omit<BaseType, 'relationships'> & {
  relationships: RelatedType[]
}

type ClientComponentProps = {
  items: ProcessedItemType[]
  defaultItem?: string
}
```

2. **Provide default values** in the client component to handle edge cases:

```typescript
export default function ClientComponent({
  items = [],
  defaultItem = '',
}: ClientComponentProps) {
  // Component logic...
}
```

## Query Parameters

When using query parameters with Payload:

```typescript
// Filtering
await payload.find({
  collection: 'collectionName',
  where: {
    field: { equals: value },
  },
})

// Sorting
await payload.find({
  collection: 'collectionName',
  sort: 'fieldName', // Ascending
  sort: '-fieldName', // Descending
})

// Pagination
await payload.find({
  collection: 'collectionName',
  limit: 10,
  page: 1,
})
```

## Error Handling

Always implement proper error handling when fetching data:

```typescript
try {
  const response = await payload.find({
    collection: 'collectionName',
  })
  
  // Process data...
} catch (error) {
  console.error('Error fetching data:', error)
  // Handle error appropriately
}
```

## Performance Considerations

- **Limit depth** to only what's needed to avoid fetching unnecessary data
- **Use pagination** for large collections
- **Filter on the server** rather than fetching all data and filtering on the client
- **Select specific fields** when you don't need the entire document

By following these guidelines, we ensure type safety, maintainability, and performance when working with Payload CMS data in our application. 