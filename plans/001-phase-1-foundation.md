# Plan: Phase 1 - Foundation & Static Pages

## Goal
Implement the core static pages (Landing, About) and the public-facing navigation structure, establishing the "bitebio" brand feel.

## 1. Project Structure & Cleanup
- [ ] **Route Groups:** Create a `(marketing)` route group to separate public pages from the future app/profile logic.
  - Move root page logic to `app/(marketing)/page.tsx`.
  - Delete original `app/page.tsx` (to allow `(marketing)/page.tsx` to serve `/`).
- [ ] **Assets:** Ensure placeholder assets (if any) are ready.

## 2. Shared Layout (`app/(marketing)/layout.tsx`)
- [ ] **Navbar Component:**
  - Create `components/layout/navbar.tsx`.
  - **Left:** Logo (Text "BiteBio" or Icon).
  - **Right:** Links (About, Login) + CTA Button ("Get Started").
  - **Mobile:** Simple responsive behavior (hamburger menu using `Sheet` or simple toggle).
- [ ] **Footer Component:**
  - Create `components/layout/footer.tsx`.
  - Simple copyright and social links.
- [ ] **Layout File:** Implement the layout wrapping children with Navbar and Footer.

## 3. Landing Page (`app/(marketing)/page.tsx`)
- [ ] **Hero Section:**
  - Headline: "Your Cafe's Digital Home".
  - Subhead: "Showcase your menu, links, and vibe in one beautiful link-in-bio."
  - **Interaction:** Input field "bitebio.app/your-cafe" + Button "Claim".
  - **Action:** Clicking "Claim" redirects to `/onboard` (mock route for now).
- [ ] **Features Grid:**
  - Use `Card` component.
  - 3 items: "Digital Menu", "Social Hub", "Gallery".
  - Use `@hugeicons/react` for visuals.

## 4. About Page (`app/(marketing)/about/page.tsx`)
- [ ] **Content:** Simple text layout explaining the mission.
- [ ] **Style:** Clean typography using `prose` (tailwindcss-typography) or manual styling.

## 5. Components Check
- Ensure we have necessary Shadcn components:
  - `Button` (Existing)
  - `Input` (Existing)
  - `Card` (Existing)
  - *New:* `Sheet` (for mobile nav) - *Need to install*.

## Execution Steps
1.  **Install Dependencies:** Add `sheet` component.
2.  **Scaffold Layout:** Create `navbar.tsx`, `footer.tsx`, and the route group layout.
3.  **Build Landing Page:** Implement Hero and Features sections.
4.  **Build About Page:** Implement static text content.
5.  **Verify:** Check responsiveness and theme consistency.
