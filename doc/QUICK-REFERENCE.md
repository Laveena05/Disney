# Quick Reference: Rendering Methods

## 🎯 Active Pages

### Currently Active
- **`pages/index.tsx`** → **SSR** (Server-Side Rendering)

---

## 📋 Rendering Method

### SSR - Server-Side Rendering ✅ (Active)

**File**: `pages/index.tsx`  
**Page**: Main Disney Website  
**Method**: `getServerSideProps`  
**When runs**: Every request  
**Why SSR?**: Best balance of SEO, fresh data, and interactive features

**Components Using Different Strategies**:
- Menu (CSR) - Interactive state management
- Hero (SSG) - Static content with background image
- PopularToys (CSR) - Search, filter, cart functionality
- DailyAdvice (SSR) - Fresh data on each request
- Gallery (CSR) - Lightbox interaction
- Footer (CSR) - Contact form with validation

---

## 📚 Other Rendering Methods

While only SSR is implemented, you can learn about:
- **SSG** - Static Site Generation (pre-render at build)
- **ISR** - Incremental Static Regeneration (periodic updates)
- **CSR** - Client-Side Rendering (browser-side rendering)

---

## 🧪 Testing Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# View pages
ls pages/
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
├── index.tsx                    ← SSR (Active - Main Page)
├── _app.tsx                     ← App wrapper
└── api/
    └── advice.ts                ← API route

components/
├── Menu.tsx                     ← CSR (Sidebar, theme toggle)
├── Hero.tsx                     ← SSG (Disney heading)
├── PopularToys.tsx              ← CSR (Cart, search, filter)
├── DailyAdvice.tsx              ← CSR (Dynamic rotation)
├── Gallery.tsx                  ← CSR (Lightbox)
└── Footer.tsx                   ← CSR (Contact form)

doc/
├── RENDERING-GUIDE.md           ← Complete rendering guide
└── QUICK-REFERENCE.md           ← This file
```

---

## 🚀 Quick Links

- **Full Guide**: [RENDERING-GUIDE.md](./RENDERING-GUIDE.md)
- **Active Page**: `pages/index.tsx`
- **Test Command**: `npm run dev`
- **GitHub**: https://github.com/Laveena05/Disney.git

---

**Current Setup**: SSR with hybrid rendering (optimal for features)

