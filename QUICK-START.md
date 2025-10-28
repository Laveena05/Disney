# Quick Start Guide

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000

## Rendering Strategies Demo

This project demonstrates four rendering strategies in Next.js:

### 1. SSG (Static Site Generation)
**Components**: Hero, PopularToys, Gallery, Footer
- Pre-rendered at build time
- Best for static content
- Fastest performance

### 2. SSR (Server-Side Rendering) - **Currently Active**
**Component**: DailyAdvice
- Rendered on every request
- Always fresh content
- Located in `pages/index.tsx`

### 3. ISR (Incremental Static Regeneration)
**Component**: DailyAdvice
- Pre-rendered with periodic updates
- Balance of speed and freshness
- Example in `pages/index-isr.tsx.example`

To use ISR:
1. Copy `pages/index-isr.tsx.example` to `pages/index.tsx`
2. The page will regenerate every hour

### 4. CSR (Client-Side Rendering)
**Components**: Menu, DailyAdviceCSR
- Rendered on client
- Interactive components
- Example in `pages/index-csr.tsx.example`

To use CSR for advice:
1. Copy `pages/index-csr.tsx.example` to `pages/index.tsx`

## Component Breakdown

### Menu (`components/Menu.tsx`)
- **Type**: CSR (Client-Side)
- Uses `'use client'` directive
- Interactive hamburger menu
- State managed with React hooks

### Hero (`components/Hero.tsx`)
- **Type**: SSG (Static)
- Animated "Kids" heading
- Rendered at build time

### PopularToys (`components/PopularToys.tsx`)
- **Type**: SSG (Static)
- Three toy cards (Puzzle, Bear, Lego)
- Interactive cards with client-side state

### DailyAdvice (`components/DailyAdvice.tsx`)
- **Type**: SSR (Server-Side)
- Uses `getServerSideProps`
- Fresh content on every request

### DailyAdviceCSR (`components/DailyAdviceCSR.tsx`)
- **Type**: CSR (Client-Side)
- Uses `useEffect` to fetch from API
- Client-side data fetching

### Gallery (`components/Gallery.tsx`)
- **Type**: SSG (Static)
- 12 gallery images
- Pre-rendered at build time

### Footer (`components/Footer.tsx`)
- **Type**: SSG (Static)
- Simple statistics display
- Static footer content

## API Routes

### `/api/advice`
- Returns random parenting advice
- Used by CSR components
- Located in `pages/api/advice.ts`

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── components/          # React components
├── pages/              # Next.js pages and API routes
├── styles/             # SCSS styles
├── public/             # Static assets
└── package.json        # Dependencies
```

