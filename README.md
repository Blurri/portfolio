# Portfolio Project

This is a Next.js-based portfolio project using Payload CMS for content management.

## Development Guidelines

### Type Safety

We prioritize type safety throughout the application:

- **No `any` types** - Use proper type definitions from `@/payload-types` instead
- **Use type predicates** when filtering data to maintain type safety
- **Create specific interface extensions** when the base types need additional properties

See our [Payload Data Usage Guidelines](./docs/payload-data-usage.md) for detailed information on working with Payload CMS data.

For specific guidance on handling relationship data, see our [Working with PayloadCMS Relationships](./docs/payload-relationships.md) documentation.

For type-safe handling of PayloadCMS relationship fields, we've created reusable [Type Guard Utilities](./docs/payload-type-guards.md).

### Cursor Rules

We use Cursor rules to enforce code quality standards. These rules are defined in the `.cursorrules` file and help ensure:

- No `any` types
- Type annotations for function parameters and returns
- Proper typing for Payload data
- Safe array access and error handling
- Consistent use of type guard utilities
- Proper PayloadCMS initialization and querying
- Well-typed React components

See our [Cursor Rules for Code Quality](./docs/cursor-rules.md) for detailed information on these rules and how to follow them.

## Setup

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Adding Components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using Components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from '@workspace/ui/components/button'
```

## Environment Management

This project uses [direnv](https://direnv.net/) to automatically:
- Switch to the correct Node.js version (from `.nvmrc`)
- Load environment variables and secrets

### Setup

1. Make sure direnv is installed:
   ```bash
   brew install direnv
   ```

2. Add direnv hook to your shell (if not already done):
   ```bash
   # For zsh, add to ~/.zshrc:
   eval "$(direnv hook zsh)"
   
   # For bash, add to ~/.bashrc:
   eval "$(direnv hook bash)"
   ```

3. Allow the direnv configuration:
   ```bash
   direnv allow
   ```

### Managing Secrets

The project includes a script to fetch secrets from GitHub:

1. Set your GitHub token:
   ```bash
   # Add to your .envrc or export in your shell
   export GITHUB_TOKEN="your_github_token"
   ```

2. Run the secrets fetching script:
   ```bash
   ./scripts/fetch-secrets.sh "your-username/your-repo"
   ```

3. The secrets will be stored in a `.secrets` file and automatically loaded by direnv when you enter the project directory.

## Working with Payload CMS

### Server Components

When fetching data from Payload CMS in server components:

```typescript
import { getPayload } from 'payload'
import payloadConfig from '../payload.config'

// Initialize Payload
const payload = await getPayload({ config: payloadConfig })

// Fetch data with proper typing
const response = await payload.find({
  collection: 'collectionName',
  sort: 'fieldName',
  depth: 1, // Always specify depth for relationship fields
})
```

### Type-Safe Relationship Handling

For type-safe handling of relationship fields:

```typescript
import { filterPopulated, isTechnology } from '@/utils/type-guards'

// Filter and process relationship data
const technologies = filterPopulated(category.technologies, isTechnology)
```

See our [Type Guard Utilities](./docs/payload-type-guards.md) for more details.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Blurri/portfolio?utm_source=oss&utm_medium=github&utm_campaign=Blurri%2Fportfolio&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)