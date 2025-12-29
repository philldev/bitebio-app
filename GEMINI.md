# Project Context: bitebio-app

## Overview
This is a Next.js 16 application built with React 19, utilizing Tailwind CSS v4 for styling and Shadcn UI for the component library.

## App Concept
A platform to showcase cafe/restaurant profiles where users can share:
- Menus
- Social/External Links
- Image Galleries
- Location Maps
- And more...

The app is designed to be visually similar to [bento.me](https://bento.me), providing a clean, link-in-bio style interface tailored for the food and beverage industry.

## Roadmap & Progress
We are following a phased approach to build the MVP.
- **Current Phase:** Phase 3 (Onboarding Simulation)
- **Detailed Roadmap:** [MVP Roadmap](roadmap/01-mvp-roadmap.md)

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4 (using `@theme inline` in CSS)
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Icons:** `@hugeicons/react`
- **Package Manager:** (Inferred from lock file: bun.lock) Bun

## UI/UX Standards & Conventions
All UI development must strictly adhere to the following design system choices:

### 1. Component Library
- **Primary:** Use [Shadcn UI](https://ui.shadcn.com/) for all common components.
- **Location:** Components are located in `@/components/ui`.
- **Installation:** Use `npx shadcn@latest add <component>` to add new components as needed.

### 2. Design System (Shadcn "Maia")
The project follows the Shadcn "Maia" design style.
- **Theme:** Orange
- **Style:** Maia (Radix-based)
- **Radius:** 0.625rem
- **Dark Mode:** Supported via `.dark` class and CSS variables.

### 3. Typography
- **Font Family:** [Figtree](https://fonts.google.com/specimen/Figtree)
- **Implementation:** configured in `app/layout.tsx` and exposed as `var(--font-sans)`.
- **Usage:** The font is applied globally via the `html` tag.

### 4. Icons
- **Library:** [Hugeicons](https://hugeicons.com/) (`@hugeicons/react`)
- **Usage:** Import icons directly from `@hugeicons/react`.
  ```tsx
  import { Home01Icon } from "@hugeicons/react";
  ```

## Gemini Instructions
- **STRICTLY** use `bun` for all package management and script execution. NEVER use `npm`, `yarn`, or `npx`.
- **DO NOT** modify any code or files that were created or updated by the user unless explicitly requested to do so.
- When adding new features, prioritize using existing shadcn/ui components or adding new ones from the registry if needed.
- **NEVER** update shadcn component files (located in `components/ui/`) unless explicitly requested by the user.
- Ensure all new components are properly typed with TypeScript.
- Follow the App Router conventions for data fetching and routing.
- Keep the UI consistent with the "radix-maia" style defined in `components.json`.
- **Git Commits:** **NEVER** commit changes to the repository unless explicitly requested by the user. When requested, always propose a draft commit message first.
- **Planning:** When asked to create a plan, you MUST create a detailed plan file in the `plans/` folder (e.g., `plans/XXX-feature-name.md`) BEFORE starting any implementation. **NEVER** execute a plan when we are still in drafting mode. You execute the plan ONLY when requested to do so by the user.


## Project Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: React components.
  - `ui/`: Shadcn UI components.
- `lib/`: Utility functions (e.g., `utils.ts` for `cn`).
- `public/`: Static assets.

## Development Rules
1. **Styling:** Use Tailwind utility classes. Avoid custom CSS unless absolutely necessary (add to `app/globals.css` if needed).
2. **Icons:** Always use `@hugeicons/react`. Do not introduce other icon libraries.
3. **Consistency:** When creating new UI elements, check `components/ui` first. Extend existing Shadcn components before building from scratch.
4. **Theme Compliance:** Ensure all colors use the defined CSS variables (e.g., `bg-primary`, `text-muted-foreground`) to maintain theme consistency and dark mode support.
