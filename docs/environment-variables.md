# Environment Variables

This document provides detailed information about the environment variables used in this project.

## Required Variables

### `DATABASE_URI`
- **Description**: Connection string for the PostgreSQL database
- **Format**: `postgresql://username:password@hostname:port/database`
- **Example**: `postgresql://postgres:password@localhost:5432/portfolio`
- **Required**: Yes

### `PAYLOAD_SECRET`
- **Description**: Secret key used by PayloadCMS for encryption and security
- **Format**: A long, random string
- **Example**: `your-complex-secret-key-here`
- **Required**: Yes
- **Security Note**: This should be kept secret and never committed to version control

## Optional Variables

### `PAYLOAD_SEED`
- **Description**: Controls database seeding during PayloadCMS initialization
- **Valid Values**: `'true'` or not set
- **Default**: Not set (seeding disabled)
- **Required**: No

#### Purpose
The `PAYLOAD_SEED` environment variable is used to trigger the seeding process for the database. When set to `'true'`, it will populate the database with initial data during the PayloadCMS initialization phase.

#### Implementation Details
The seeding process is implemented in the `onInit` function in `apps/web/payload.config.ts`:

```typescript
onInit: async (payload) => {
  // Check if seeding is requested via environment variable
  const shouldSeed = process.env.PAYLOAD_SEED === 'true'

  if (shouldSeed) {
    await seed(payload, { reset: true })
  }
}
```

The `seed` function (from `apps/web/src/seed.ts`) performs the following actions when called with `reset: true`:
1. Deletes all existing data from the collections (`technologies`, `categories`, `users`) using a paginated approach that handles any number of documents
2. Creates a development user (only in development environment)
3. Seeds predefined categories and technologies

The database reset function uses pagination to ensure all documents are deleted, even for large collections:
```typescript
// Continue fetching and deleting documents until no more remain
while (hasMoreDocs) {
  // Find documents in the collection (always fetch first page as we're deleting them)
  const { docs, totalDocs } = await payload.find({
    collection: collectionName,
    limit: 100, // Use a smaller batch size for better performance
    page: 1,    // Always get the first page as we're deleting documents
  })
  
  // Delete each document in the current batch
  for (const doc of docs) {
    await payload.delete({
      collection: collectionName,
      id: doc.id,
    })
  }
  
  // Check if we've deleted all documents
  if (docs.length === 0) {
    hasMoreDocs = false;
  }
}
```

#### Usage Guidelines

##### Development Environment
- Useful for quickly setting up a development database with test data
- Can be used to reset the database to a known state during development
- Example usage:
  ```bash
  # One-time use
  PAYLOAD_SEED=true pnpm dev
  
  # Or add to .env.local for persistent setting
  echo "PAYLOAD_SEED=true" >> .env.local
  ```

##### Production Environment
- **Warning**: Should generally be avoided in production as it will delete all existing data
- May be useful for the initial deployment to set up the database structure and seed initial content
- For production, consider using it only once during the first deployment, then disabling it:
  ```bash
  # First deployment only
  PAYLOAD_SEED=true npm start
  
  # Then remove or set to false for subsequent deployments
  ```

##### CI/CD Pipelines
- Can be used in testing environments to ensure tests run against a consistent data set
- Example in GitHub Actions workflow:
  ```yaml
  jobs:
    test:
      steps:
        # ...
        - name: Run tests with seeded database
          env:
            PAYLOAD_SEED: 'true'
          run: npm test
  ```

#### Important Considerations
1. **Data Loss**: Setting `PAYLOAD_SEED=true` will delete all existing data in the collections before seeding
2. **Development vs. Production**: The seeding process behaves differently based on `NODE_ENV`:
   - In development: Creates a development user with admin role
   - In production: Skips creating the development user
3. **One-Time Use**: In most cases, this should be used once to initialize the database, then disabled
4. **Idempotent Operations**: The seeding process is designed to be idempotent for categories and technologies (won't create duplicates)
5. **Large Collections**: The database reset function can handle collections of any size through pagination

#### Troubleshooting
If you encounter issues with the seeding process:
1. Check the console logs for error messages
2. Verify database connection and permissions
3. Ensure the `PAYLOAD_SEED` value is exactly `'true'` (string, not boolean) 