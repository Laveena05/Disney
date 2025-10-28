# Quick Reference: Rendering Methods

## 🎯 Active Pages

### Currently Active
- **`pages/index.tsx`** → **SSR** (Server-Side Rendering)

---

## 📋 Available Rendering Methods

### 1. SSR - Server-Side Rendering
**File**: `pages/index.tsx` ✅ (Currently Active)

**Page**: Main Disney Website  
**Method**: `getServerSideProps`  
**When runs**: Every request  
**Components**:
- Menu (CSR)
- Hero (SSG - Static)
- PopularToys (CSR - Interactive)
- DailyAdvice (SSR - Dynamic)
- Gallery (CSR - Interactive)
- Footer (CSR - Interactive)

---

### 2. SSG - Static Site Generation
**File**: `pages/index-ssg.tsx.example` 📄

**Status**: Example file (not active)  
**Method**: `getStaticProps`  
**When runs**: Build time  
**To activate**: Rename to `index.tsx`

---

### 3. ISR - Incremental Static Regeneration
**File**: `pages/index-isr.tsx.example` 📄

**Status**: Example file (not active)  
**Method**: `getStaticProps` with `revalidate`  
**When runs**: Build time + periodic revalidation  
**To activate**: Rename to `index.tsx`

---

### 4. CSR - Client-Side Rendering
**File**: `pages/index-csr.tsx.example` 📄

**Status**: Example file (not active)  
**Method**: Client-side fetch with API routes  
**When runs**: Browser  
**To activate**: Rename to `index.tsx`

---

## 🔄 Switching Between Methods

```bash
# Backup current SSR
mv pages/index.tsx pages/index-ssr-backup.tsx

# Activate ISR
mv pages/index-isr.tsx.example pages/index.tsx

# Activate CSG
mv pages/index-ssg.tsx.example pages/index.tsx

# Activate CSR
mv pages/index-csr.tsx.example pages/index.tsx

# Restore SSR
mv pages/index-ssr-backup.tsx pages/index.tsx
```

---

## 🧪 Testing Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# View examples
ls pages/*.example
```

---

## 📊 Component Rendering Types

| Component | Type | Why |
|-----------|------|-----|
| Menu | CSR | Interactive state |
| Hero | SSG | Static content |
| PopularToys | CSR | Cart, search, filter |
| DailyAdvice | SSR | Fresh data |
| Gallery | CSR | Lightbox |
| Footer | CSR | Contact form |

---

## 🎨 Rendering Method Comparison

| Method | Speed | Data | SEO | Use Case |
|--------|-------|------|-----|----------|
| SSR | ⚡⚡ | Fresh | ✅ | Dynamic |
| SSG | ⚡⚡⚡ | Old | ✅ | Static |
| ISR | ⚡⚡⚡ | Periodic | ✅ | Balanced |
| CSR | ⚡ | Client | ❌ | Interactive |

---

## 📝 Files Structure

```
pages/
├── index.tsx                    ← SSR (Active)
├── index-csr.tsx.example        ← CSR (Example)
├── index-isr.tsx.example        ← ISR (Example)
├── index-ssr.tsx.example        ← SSR (Example)
├── _app.tsx                     ← App wrapper
└── api/
    └── advice.ts                ← API route

components/
├── Menu.tsx                     ← CSR
├── Hero.tsx                     ← SSG
├── PopularToys.tsx              ← CSR
├── DailyAdvice.tsx              ← CSR (with SSR data)
├── Gallery.tsx                  ← CSR
└── Footer.tsx                   ← CSR
```

---

## 🚀 Quick Links

- **Full Guide**: [RENDERING-GUIDE.md](./RENDERING-GUIDE.md)
- **Active Page**: `pages/index.tsx`
- **Test Command**: `npm run dev`
- **GitHub**: https://github.com/Laveena05/Disney.git

---

**Current Setup**: SSR with hybrid rendering (optimal for features)

