# Cursor Rules for Code Quality

This document explains the cursor rules we've established to maintain code quality in our PayloadCMS-powered Next.js application.

## Type Safety Rules

### No Any Types

```
rule "no-any-types" {
  description = "Avoid using 'any' type in TypeScript code"
  pattern = ":\\s*any\\b|<any>|as\\s+any"
  message = "Avoid using 'any' type. Use proper type definitions or unknown/Record<string, unknown> instead."
  severity = "warning"
}
```

**Why it matters**: Using `any` defeats the purpose of TypeScript's type system. It can lead to runtime errors that could have been caught during development.

**How to fix**: Use proper type definitions from `@/payload-types` or create custom types/interfaces. For truly unknown data, use `unknown` instead of `any`.

### Typed Function Parameters

```
rule "typed-function-params" {
  description = "Ensure function parameters have type annotations"
  pattern = "\\(([^:)]+)\\)\\s*=>"
  message = "Function parameters should have type annotations"
  severity = "warning"
}
```

**Why it matters**: Untyped function parameters can lead to unexpected behavior when the function is called with incorrect arguments.

**How to fix**: Add type annotations to all function parameters, e.g., `(item: Technology) => { ... }`.

### Typed Function Returns

```
rule "typed-function-returns" {
  description = "Ensure functions have return type annotations"
  pattern = "function\\s+\\w+\\([^)]*\\)\\s*\\{"
  message = "Functions should have return type annotations"
  severity = "warning"
}
```

**Why it matters**: Explicit return types help document the function's purpose and prevent accidental changes to the return value.

**How to fix**: Add return type annotations to functions, e.g., `function getData(): Promise<Data[]> { ... }`.

## PayloadCMS-Specific Rules

### Payload Data Typing

```
rule "payload-data-typing" {
  description = "Ensure Payload data is properly typed"
  pattern = "\\.docs\\s*\\.filter\\(\\([^)]+\\)\\s*=>\\s*!!"
  message = "Use type predicates when filtering Payload data"
  severity = "warning"
}
```

**Why it matters**: PayloadCMS data often needs type narrowing to ensure type safety, especially with relationship fields.

**How to fix**: Use type predicates when filtering PayloadCMS data:

```typescript
// Instead of this:
const items = response.docs.filter(item => !!item)

// Do this:
const items = response.docs.filter((item): item is Item => !!item)
```

### Use Type Guard Utilities

```
rule "use-type-guard-utilities" {
  description = "Encourage use of type guard utilities for PayloadCMS relationships"
  pattern = "\\.(filter|map)\\(\\([^)]+\\)\\s*=>\\s*(typeof|'id' in)"
  message = "Consider using our type guard utilities"
  severity = "warning"
}
```

**Why it matters**: Our type guard utilities provide a consistent way to handle PayloadCMS relationship fields.

**How to fix**: Use our type guard utilities instead of inline type checks:

```typescript
// Instead of this:
const validItems = items.filter(item => typeof item === 'object' && 'id' in item)

// Do this:
import { filterPopulated, isItem } from '@/utils/type-guards'
const validItems = filterPopulated(items, isItem)
```

### Payload Depth Parameter

```
rule "payload-depth-parameter" {
  description = "Ensure depth parameter is specified in PayloadCMS queries"
  pattern = "payload\\.find\\(\\{[^}]*collection:[^}]*\\}\\)"
  message = "Consider specifying a 'depth' parameter in PayloadCMS queries"
  severity = "warning"
}
```

**Why it matters**: The `depth` parameter controls how deeply PayloadCMS populates relationship fields. Without it, you might get unexpected results.

**How to fix**: Always specify a `depth` parameter in PayloadCMS queries:

```typescript
// Instead of this:
const response = await payload.find({ collection: 'categories' })

// Do this:
const response = await payload.find({ 
  collection: 'categories',
  depth: 1 // Populate one level of relationships
})
```

## Error Handling Rules

### Safe Array Access

```
rule "safe-array-access" {
  description = "Ensure arrays are checked before accessing"
  pattern = "\\.(map|filter|forEach|reduce|some|every)\\(\\s*\\([^)]*\\)\\s*=>\\s*[^{]*\\)"
  message = "Ensure arrays are checked with Array.isArray() before using array methods"
  severity = "warning"
}
```

**Why it matters**: Calling array methods on non-array values can cause runtime errors.

**How to fix**: Check that a value is an array before using array methods:

```typescript
// Instead of this:
const items = data.items.map(item => item.name)

// Do this:
const items = Array.isArray(data.items) 
  ? data.items.map(item => item.name)
  : []
```

### Async Error Handling

```
rule "async-error-handling" {
  description = "Ensure async functions have proper error handling"
  pattern = "export\\s+(default\\s+)?async\\s+function\\s+[^{]+\\{(?![^}]*try)"
  message = "Async functions should include try/catch blocks for error handling"
  severity = "warning"
}
```

**Why it matters**: Unhandled errors in async functions can cause your application to crash or behave unexpectedly.

**How to fix**: Wrap async function bodies in try/catch blocks:

```typescript
// Instead of this:
export async function getData() {
  const response = await fetch('/api/data')
  return response.json()
}

// Do this:
export async function getData() {
  try {
    const response = await fetch('/api/data')
    return response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return { error: 'Failed to fetch data' }
  }
}
```

## Component Rules

### Server Component Return Type

```
rule "server-component-return-type" {
  description = "Ensure server components have proper return types"
  pattern = "export\\s+default\\s+async\\s+function\\s+[^(]+\\([^)]*\\)\\s*\\{"
  message = "Server components should specify a return type"
  severity = "warning"
}
```

**Why it matters**: Explicit return types help document the component's purpose and prevent accidental changes to the return value.

**How to fix**: Add return type annotations to server components:

```typescript
// Instead of this:
export default async function MyComponent() {
  // ...
}

// Do this:
export default async function MyComponent(): Promise<JSX.Element> {
  // ...
}
```

### Client Component Props Typing

```
rule "client-component-props-typing" {
  description = "Ensure client components have properly typed props"
  pattern = "'use client'[\\s\\S]*export\\s+default\\s+function\\s+[^(]+\\(\\{[^}]*\\}\\)\\s*\\{"
  message = "Client components should have properly typed props"
  severity = "warning"
}
```

**Why it matters**: Properly typed props help document the component's API and prevent passing incorrect props.

**How to fix**: Define a type or interface for component props:

```typescript
// Instead of this:
'use client'
export default function MyComponent({ items }) {
  // ...
}

// Do this:
'use client'
type MyComponentProps = {
  items: Item[]
}

export default function MyComponent({ items }: MyComponentProps) {
  // ...
}
```

## Using These Rules

These cursor rules are designed to help you write better code, not to be overly restrictive. If you encounter a rule that doesn't make sense in a particular context, consider whether there's a better way to structure your code, or if the rule needs to be refined.

Remember that the goal is to write code that is:

1. **Type-safe**: Leveraging TypeScript's type system to catch errors at compile time
2. **Robust**: Handling errors and edge cases gracefully
3. **Maintainable**: Easy to understand and modify
4. **Consistent**: Following established patterns and best practices

By following these rules, you'll help ensure that our codebase remains high-quality and maintainable as it grows. 