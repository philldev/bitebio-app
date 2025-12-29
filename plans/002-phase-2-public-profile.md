# Plan: Phase 2 - Public Profile Page (Bento Grid)

## Goal
Implement the core "link-in-bio" view using a dynamic route, mock data, and a responsive Bento-style grid system.

## 1. Mock Data Layer
- [ ] **Types (`types/profile.ts`):**
  - Define `Profile` interface (username, displayName, bio, themeColor).
  - Define `Widget` interface (type: 'link' | 'menu' | 'gallery' | 'map' | 'heading', data: any, size: '1x1' | '2x1' | '2x2' | 'full').
- [ ] **Data Store (`lib/mock-data.ts`):**
  - Create a dictionary of profiles (e.g., `cool-beans`, `burger-joint`) to simulate a database.

## 2. Dynamic Route (`app/[username]/page.tsx`)
- [ ] **Route Setup:**
  - Create `app/[username]/layout.tsx` (optional, if we need specific profile layouts).
  - Create `app/[username]/page.tsx`.
- [ ] **Data Fetching:**
  - Simulate fetching data by `params.username`.
  - Handle 404s for unknown users.

## 3. Bento Grid Components (`components/profile/`)
- [ ] **Grid Container:**
  - A CSS Grid wrapper that handles the 1x1, 2x1, 2x2 sizing logic.
- [ ] **Widget Factory:**
  - A component that takes a `Widget` object and renders the correct component.
- [ ] **Widgets:**
  - `ProfileWidget`: Avatar, Title, Bio.
  - `HeadingWidget`: Section title/separator (Full width).
  - `LinkWidget`: Simple button or styled card for external links.
  - `MenuWidget`: Image + Title + Price.
  - `MapWidget`: Static placeholder or simple iframe.
  - `GalleryWidget`: Grid of images.

## 4. Implementation Steps
1.  **Define Types:** Create the TS interfaces.
2.  **Create Mock Data:** Populate 2 distinct example profiles.
3.  **Scaffold Route:** Create `app/[username]/page.tsx` and wire it to the mock data.
4.  **Build Widgets:** Create the individual card components in `components/profile/widgets/`.
5.  **Build Grid:** Implement the responsive grid logic.
6.  **Verify:** Test `/cool-beans` and `/burger-joint` to see different layouts.
