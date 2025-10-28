# Kids Website - Next.js Conversion

Successfully converted the Kids Website from static HTML to a Next.js application with multiple rendering strategies.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit http://localhost:3000 after running the dev server.

## 📋 Rendering Strategies

### 1. **SSG (Static Site Generation)**
- **Components**: Hero, PopularToys, Gallery, Footer
- Pre-rendered at build time for maximum performance

### 2. **SSR (Server-Side Rendering)** - Currently Active
- **Component**: DailyAdvice via `getServerSideProps`
- Renders fresh content on every request

### 3. **ISR (Incremental Static Regeneration)** - Available
- See `pages/index-isr.tsx.example`
- Regenerates at specified intervals

### 4. **CSR (Client-Side Rendering)**
- **Components**: Menu, ToyCard
- Interactive components using React hooks

## 📁 Project Structure

```
├── components/       # React components
├── pages/           # Next.js pages & API routes
├── styles/          # SCSS stylesheets
├── public/          # Static assets
└── images/          # Original images
```

## 🎨 Features

- ✅ Multiple rendering strategies (SSG, SSR, ISR, CSR)
- ✅ TypeScript support
- ✅ SCSS/CSS Modules
- ✅ Responsive design
- ✅ Next.js Image optimization
- ✅ Interactive animations
- ✅ Single Page Application (SPA)

## 📝 Key Files

- `pages/index.tsx` - Main page (SSR)
- `components/Menu.tsx` - Interactive menu (CSR)
- `components/DailyAdvice.tsx` - Server-rendered content (SSR)
- `pages/api/advice.ts` - API endpoint for CSR

## 🔄 Switching Rendering Strategies

Simply copy example files:

```bash
# Use ISR
cp pages/index-isr.tsx.example pages/index.tsx

# Use CSR
cp pages/index-csr.tsx.example pages/index.tsx

# Use SSR (current)
# Already in pages/index.tsx
```

---

**Project is ready to run!** 🎉
