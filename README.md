# Interactive Wall Calendar

A production-style, responsive wall-calendar web application built for a frontend engineering challenge. The UI is inspired by physical wall calendars and includes smooth month transitions, date-range selection, and persistent notes.

## Live Links
- Live Demo: https://tuf-assignment-roan.vercel.app/
- Video Walkthrough: 

## Project Highlights
- Photorealistic wall-calendar layout with a hero image, spiral binding, and geometric month header.
- Date range selection with start/end anchors and in-range highlighting.
- Direction-aware month navigation animation using Framer Motion.
- Persistent user notes and selected state via browser localStorage.
- Fully responsive behavior for mobile and desktop layouts.

## Tech Stack
- React + Vite
- Tailwind CSS
- Zustand (with persist middleware)
- date-fns
- Framer Motion
- Lucide React

## Architecture Notes
- Global state is managed in a central Zustand store to avoid prop drilling.
- Date calculations are handled with date-fns for immutable and predictable operations.
- Calendar grid day generation is memoized with `useMemo` to keep interactions smooth.
- UI transitions are controlled with `AnimatePresence` and direction-based variants.

## Feature List
- Navigate months forward/backward with animated transitions.
- Select start and end dates (including reverse selection handling).
- Highlight selected ranges visually in the calendar grid.
- Keep notes and selected values persisted across refresh.
- Maintain stable calendar height with a fixed 6-week grid render.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
1. Clone the repository:
   - `git clone https://github.com/abhinav2805-ux/Tuf_assignment`
2. Move into the project folder:
   - `cd Tuf_assignment`
3. Install dependencies:
   - `npm install`

### Local Development
- Start dev server:
  - `npm run dev`
- Build for production:
  - `npm run build`
- Preview production build:
  - `npm run preview`

## Deployment
This project is a static Vite SPA and can be deployed directly to Vercel or Netlify.

- Build command: `npm run build`
- Output directory: `dist`






