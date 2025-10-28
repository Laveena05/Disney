/**
 * CSR (Client-Side Rendering) Component
 * Fetches data on the client-side using useEffect
 * Shows loading state while fetching from API
 * Alternative to server-side rendering for dynamic content
 */
'use client'

import { useState, useEffect } from 'react'
import styles from '../styles/home.module.scss'

export default function DailyAdviceCSR() {
  const [advice, setAdvice] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch advice from API on client side
    fetch('/api/advice')
      .then(res => res.json())
      .then(data => {
        setAdvice(data.advice)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching advice:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className={styles.section3}>
        <h1 className={styles.sectionHeading}>Daily Advice</h1>
        <p className={styles.advice}>Loading advice...</p>
      </section>
    )
  }

  return (
    <section className={styles.section3}>
      <h1 className={styles.sectionHeading}>Daily Advice (CSR)</h1>
      {advice.map((text, index) => (
        <p key={index} className={styles.advice}>
          {text}
        </p>
      ))}
    </section>
  )
}

