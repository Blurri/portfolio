# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

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

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Blurri/portfolio?utm_source=oss&utm_medium=github&utm_campaign=Blurri%2Fportfolio&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)