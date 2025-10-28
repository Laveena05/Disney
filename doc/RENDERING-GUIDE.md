# Rendering Methods Guide

This document explains all the different page rendering methods available in the Disney Website and how to test them.

## 📚 Table of Contents

1. [Overview](#overview)
2. [Rendering Methods](#rendering-methods)
3. [How to Switch Between Methods](#how-to-switch-between-methods)
4. [Testing Guide](#testing-guide)

---

## Overview

The Disney Website supports multiple rendering strategies to demonstrate Next.js capabilities:
- **SSR** (Server-Side Rendering)
- **SSG** (Static Site Generation)
- **ISR** (Incremental Static Regeneration)
- **CSR** (Client-Side Rendering)

---

## Rendering Methods

### 1. **SSR - Server-Side Rendering**

**Used by**: Main page (`pages/index.tsx`)

**How it works**:
- Runs `getServerSideProps` on EVERY request
- Fetches fresh data from server on each page load
- HTML is generated on the server
- Best for: Frequently changing content, personalized data

**Example Code Location**: `pages/index.tsx` (Currently active)

```typescript
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch fresh data on every request
  const advice = [...]
  return { props: { advice } }
}
```

**Components Breakdown**:
- ✅ **Menu** - CSR (Interactive state management)
- ✅ **Hero** - SSG (Static content)
- ✅ **PopularToys** - CSR (Search, filter, cart functionality)
- ✅ **DailyAdvice** - SSR (Fresh data on each request)
- ✅ **Gallery** - CSR (Lightbox interaction)
- ✅ **Footer** - CSR (Contact form)

---

### 2. **SSG - Static Site Generation**

**Example File**: `pages/index-ssg.tsx.example`

**How it works**:
- Pre-rendered at build time
- Served as static HTML
- Best performance
- Best for: Content that doesn't change frequently

**To activate**:
```bash
mv pages/index-ssg.tsx.example pages/index-ssg.tsx
```

**Example Code**:
```typescript
export const getStaticProps: GetStaticProps = async () => {
  // Pre-rendered at build time
  const advice = [...]
  return { props: { advice } }
}
```

---

### 3. **ISR - Incremental Static Regeneration**

**Example File**: `pages/index-isr.tsx.example`

**How it works**:
- Pre-rendered at build time (like SSG)
- Revalidates periodically (e.g., every 60 seconds)
- Combines SSG benefits with fresh data
- Best for: Content that changes occasionally

**To activate**:
```bash
mv pages/index-isr.tsx.example pages/index-isr.tsx
```

**Example Code**:
```typescript
export const getStaticProps: GetStaticProps = async () => {
  const advice = [...]
  return { 
    props: { advice },
    revalidate: 60 // Revalidate every 60 seconds
  }
}
```

---

### 4. **CSR - Client-Side Rendering**

**Example File**: `pages/index-csr.tsx.example`

**How it works**:
- Renders on the client side
- No server-side rendering
- Uses API routes for data fetching
- Best for: Highly interactive pages

**To activate**:
```bash
mv pages/index-csr.tsx.example pages/index-csr.tsx
```

**Example Code**:
```typescript
'use client'

export default function Home() {
  const [advice, setAdvice] = useState([])
  
  useEffect(() => {
    // Fetch from API route
    fetch('/api/advice')
      .then(res => res.json())
      .then(data => setAdvice(data.advice))
  }, [])
  
  return (...)
}
```

---

## How to Switch Between Methods

### Option 1: Rename Current Index (Recommended)

```bash
# Backup current SSR version
mv pages/index.tsx pages/index-ssr.tsx

# Activate ISR version
mv pages/index-isr.tsx.example pages/index.tsx

# Or activate CSG version
mv pages/index-ssg.tsx.example pages/index.tsx

# Or activate CSR version
mv pages/index-csr.tsx.example pages/index.tsx
```

### Option 2: Use Multiple Ports

You could run multiple instances on different ports, but Next.js typically uses one `pages/index.tsx`.

---

## Testing Guide

### Testing SSR (Current Setup)

**Current Configuration**: `pages/index.tsx`

1. **Startgs the dev server**:
   ```bash
   npm run dev
   ```

2. **Test Dynamic Data**:
   - Open browser to `http://localhost:3000`
   - Check server console for logs on each page load
   - Each request should fetch fresh advice data

3. **Verify SSR**:
   - View page source (right-click → "View Page Source")
   - You should see the HTML content pre-rendered
   - Check Network tab - HTML should come from server

4. **Test Components**:
   - ✅ Menu sidebar opens/closes
   - ✅ Gallery lightbox works
   - ✅ Shopping cart functional
   - ✅ Search and filter toys
   - ✅ Contact form validation

---

### Testing SSG

1. **Activate SSG**:
   ```bash
   mv pages/index.tsx pages/index-temp.tsx
   mv pages/index-ssg.tsx.example pages/index.tsx
   ```

2. **Build and Test**:
   ```bash
   npm run build
   npm run start
   ```

3. **Verify SSG**:
   - Check `.next/server/pages/index.html` exists
   - Page loads instantly (pre-rendered)
   - No API calls on initial load

4. **Restore**:
   ```bash
   mv pages/index.tsx pages/index-ssg.tsx
   mv pages/index-temp.tsx pages/index.tsx
   ```

---

### Testing ISR

1. **Activate ISR**:
   ```bash
   mv pages/index.tsx pages/index-temp.tsx
   mv pages/index-isr.tsx.example pages/index.tsx
   ```

2. **Build and Test**:
   ```bash
   npm run build
   npm run start
   ```

3. **Verify ISR**:
   - First load: Pre-rendered (fast)
   - After revalidate time: Fresh data fetched
   - Check server logs for regeneration

4. **Restore**:
   ```bash
   mv pages/index.tsx pages/index-isr.tsx
   mv pages/index-temp.tsx pages/index.tsx
   ```

---

### Testing CSR

1. **Activate CSR**:
   ```bash
   mv pages/index.tsx pages/index-temp.tsx
   mv pages/index-csr.tsx.example pages/index.tsx
   ```

2. **Start dev server**:
   ```bash
   npm run dev
   ```

3. **Verify CSR**:
   - Initial HTML is minimal (no content)
   - Check Network tab for API call to `/api/advice`
   - Content renders after data loads
   - Interactive components work

4. **Restore**:
   ```bash
   mv pages/index.tsx pages/index-csr.tsx
   mv pages/index-temp.tsx pages/index.tsx
   ```

---

## Component Rendering Summary

| Component | Current Method | Functionality |
|-----------|---------------|---------------|
| **Menu** | CSR | Hamburger menu, theme toggle, smooth scroll |
| **Hero** | SSG | Disney heading with castle background |
| **PopularToys** | CSR | Search, filter, cart, like buttons |
| **DailyAdvice** | SSR | Fresh advice on each request |
| **Gallery** | CSR | Lightbox with intentions |
| **Footer** | CSR | Contact form with validation |

---

## Quick Test Commands

```bash
# Current setup (SSR)
npm run dev

# View all available rendering examples
ls pages/*.example

# Switch to ISR
mv pages/index.tsx pages/index-ssr-backup.tsx && \
mv pages/index-isr.tsx.example pages/index.tsx

# Build for production testing
npm run build && npm run start

# Restore SSR
mv pages/index.tsx pages/index-isr.tsx && \
mv pages/index-ssr-backup.tsx pages/index.tsx
```

---

## Performance Comparison

| Method | Initial Load | Data Freshness | SEO | Best For |
|--------|-------------|----------------|-----|----------|
| **SSR** | Medium | Always Fresh | ✅ Excellent | Dynamic content |
| **SSG** | Fastest | Build Time | ✅ Excellent | Static content |
| **ISR** | Fastest | Periodic | ✅ Excellent | Balanced |
| **CSR** | Slowest | Client Fetch | ❌ Poor | Interactive apps |

---

## Notes

- All interactive features work regardless of rendering method
- The page dynamically uses the best strategy for each component
- SSR is currently active for the best balance of features
- Example files can be renamed to `.tsx` to test them

