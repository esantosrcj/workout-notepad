# Workout Notepad

A full-stack SvelteKit application with PocketBase backend integration, featuring user authentication and routine management capabilities.

## Project Overview

**Workout Notepad** (v1.0.0) is a modern web application built with SvelteKit and TypeScript, utilizing PocketBase as its backend service. The application provides user authentication flows and routine management features with a polished UI powered by Skeleton UI and Tailwind CSS.

### Tech Stack

- **Framework:** SvelteKit 2.5.21
- **Language:** TypeScript 5.0
- **Backend:** PocketBase 0.21.4
- **UI Framework:** Skeleton Labs 2.10.2
- **Styling:** Tailwind CSS 3.4.9 + Tailwind Forms
- **Icons:** Iconify Svelte
- **Build Tool:** Vite 5.0.3
- **Testing:** Playwright + Vitest
- **Deployment:** Node.js adapter

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Code Quality

The project enforces code quality through:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting with plugins for Svelte, imports, and Tailwind
- **svelte-check** - Svelte-specific type checking
- **TypeScript** - Strict mode enabled

## Styling

The project uses a combination of:

- **Tailwind CSS** - Utility-first CSS framework
- **Skeleton Labs** - UI component library with "skeleton" and "rocket" themes
- **@tailwindcss/forms** - Better form styling
- **PostCSS** - CSS processing

## PocketBase Integration

The application integrates with PocketBase through server hooks (`hooks.server.ts`):

- Initializes PocketBase client on each request
- Manages authentication cookies
- Auto-refreshes auth tokens
- Provides `event.locals.pb` to all server load functions
