/**
 * MAIN PAGE - SSR (Server-Side Rendering) Strategy
 * 
 * This page uses getServerSideProps which:
 * - Runs on EVERY request (not just build time)
 * - Fetches fresh data from server on each request
 * - Provides always up-to-date content
 * - SEO-friendly with server-rendered HTML
 */

import { GetServerSideProps } from 'next'
import Menu from '../components/Menu'
import Hero from '../components/Hero'
import PopularToys from '../components/PopularToys'
import DailyAdvice from '../components/DailyAdvice'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'

/**
 * SSR: Server-Side Rendering
 * This function runs on the server for EVERY request
 * Perfect for frequently changing content or personalized data
 */
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch fresh data on every request from API/database
  const advice = [
    "You hereby have permission to stop worrying about your checklist—doing the laundry, pumping, buying diapers—and learn to be present with your baby. Enjoy your precious moments together 😊",
    "Expect odd food habits. Offer a variety. Don't push, don't panic. They'll eat when they're hungry 👍"
  ]

  return {
    props: {
      advice
    }
  }
}

interface HomeProps {
  advice: string[]
}

/**
 * Home Page Component
 * Combines multiple rendering strategies:
 * - CSR: Interactive client components (Menu)
 * - SSG: Static content (Hero, PopularToys, Gallery, Footer)
 * - SSR: Server-rendered dynamic content (DailyAdvice)
 */
export default function Home({ advice }: HomeProps) {
  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      <Menu /> {/* ✅ CSR - Client-side rendering: Interactive menu with state */}
      <Hero /> {/* ✅ SSG - Static Site Generation: Pre-rendered at build time */}
      <PopularToys /> {/* ✅ SSG - Static Site Generation: Static toy data */}
      <DailyAdvice advice={advice} /> {/* ✅ SSR - Server-Side Rendering: Fresh data on each request */}
      <Gallery /> {/* ✅ SSG - Static Site Generation: Pre-rendered gallery */}
      <Footer /> {/* ✅ SSG - Static Site Generation: Static footer */}
    </div>
  )
}

/* 
 * RENDERING STRATEGY SUMMARY:
 * ============================
 * 
 * SSR (Server-Side Rendering):
 *   - DailyAdvice component
 *   - Fresh content on every request
 *   - getServerSideProps runs on server for each page load
 * 
 * CSR (Client-Side Rendering):
 *   - Menu component (interactive state)
 *   - ToyCard components (flip animations)
 *   - Uses 'use client' directive and React hooks
 * 
 * SSG (Static Site Generation):
 *   - Hero, PopularToys, Gallery, Footer components
 *   - Pre-rendered at build time
 *   - Served as static HTML - best performance
 * 
 * ISR (Incremental Static Regeneration):
 *   - Available via pages/index-isr.tsx.example
 *   - Combines SSG benefits with periodic updates
 */

