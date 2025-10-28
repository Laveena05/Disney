# Rendering Strategies Guide

This document explains where CSR, SSR, SSG, and ISR are used in this project.

## 📊 Quick Reference

| Strategy | Components Used | When to Use | Example |
|----------|----------------|-------------|---------|
| **CSR** | Menu, ToyCard, DailyAdviceCSR | Interactive components, client-side updates | `components/Menu.tsx` |
| **SSR** | DailyAdvice | Fresh content on every request | `pages/index.tsx` |
| **SSG** | Hero, PopularToys, Gallery, Footer | Static content, best performance | `components/Hero.tsx` |
| **ISR** | Available as example | Periodic updates with caching | `pages/index-isr.tsx.example` |

---

## 🔵 CSR (Client-Side Rendering)

### Components:
- **Menu** (`components/Menu.tsx`)
  - Interactive hamburger menu
  - Uses `useState` for toggle state
  - Marked with `'use client'` directive

- **ToyCard** (`components/ToyCard.tsx`)
  - Interactive flip animation
  - Client-side state for card expansion
  - No server interaction needed

- **DailyAdviceCSR** (`components/DailyAdviceCSR.tsx`)
  - Fetches data using `useEffect`
  - Shows loading state while fetching
  - Alternative to SSR for dynamic content

### Usage:
```tsx
'use client'  // Enable CSR
import { useState, useEffect } from 'react'
```

---

## 🟠 SSR (Server-Side Rendering)

### Components:
- **DailyAdvice** (`components/DailyAdvice.tsx`)
  - Receives data from `getServerSideProps`
  - Rendered on server before sending to client
  - Fresh content on every request

### Implementation:
```tsx
// In pages/index.tsx
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data on server for EVERY request
  const advice = [...]
  return { props: { advice } }
}
```

---

## 🟢 SSG (Static Site Generation)

### Components:
- **Hero** (`components/Hero.tsx`)
  - Static "Kids" heading
  - No data fetching
  - Pre-rendered at build time

- **PopularToys** (`components/PopularToys.tsx`)
  - Static toy cards data
  - Embedded at build time
  - No server interaction

- **Gallery** (`components/Gallery.tsx`)
  - Static list of images
  - Uses Next.js Image optimization
  - Pre-rendered gallery

- **Footer** (`components/Footer.tsx`)
  - Static footer content
  - No dynamic data

### Characteristics:
- Fastest performance
- Best for SEO
- No runtime server processing
- Content updates require rebuild

---

## 🟡 ISR (Incremental Static Regeneration)

### Implementation:
- **Example**: `pages/index-isr.tsx.example`
- Combines SSG benefits with periodic updates
- Caches page for specified time
- Regenerates in background when expired

### Setup:
```tsx
export const getStaticProps: GetStaticProps = async () => {
  const data = [...]
  return {
    props: { data },
    revalidate: 3600  // Regenerate every hour
  }
}
```

### When to Use:
- Content changes periodically (not every request)
- Need SSG performance + fresh content
- Blog posts, product listings, news articles

---

## 🔄 How to Switch Strategies

### To use SSR (Current):
```bash
# Already in pages/index.tsx
# Uses getServerSideProps
```

### To use ISR:
```bash
cp pages/index-isr.tsx.example pages/index.tsx
```

### To use CSR for advice:
```bash
cp pages/index-csr.tsx.example pages/index.tsx
```

---

## 📝 Code Comments

All components now have clear comments indicating their rendering strategy:

```tsx
/**
 * SSR Component
 * Renders server-side data passed as props
 * Used with getServerSideProps
 */
```

```tsx
/**
 * CSR Component
 * Uses 'use client' directive
 * Client-side interactivity with hooks
 */
```

```tsx
/**
 * SSG Component
 * Pre-rendered at build time
 * No dynamic data fetching
 */
```

---

## 🎯 Best Practices

1. **CSR** for:
   - Interactive components (menus, modals, tabs)
   - Real-time updates
   - User-specific data

2. **SSR** for:
   - Frequently changing content
   - Personalized pages
   - SEO-critical content

3. **SSG** for:
   - Static pages
   - Blogs, landing pages
   - Marketing pages

4. **ISR** for:
   - Semi-static content
   - Product listings
   - News articles

---

For more details, see the inline comments in each component file.

