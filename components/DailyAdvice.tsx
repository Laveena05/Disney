/**
 * CSR Component with dynamic advice rotation
 * Client-side component that rotates through different advice messages
 * Automatically cycles through advice every few seconds
 */
'use client'

import { useState, useEffect } from 'react'
import styles from '../styles/home.module.scss'

interface DailyAdviceProps {
  advice: string[]
}

const allAdvice = [
  "You hereby have permission to stop worrying about your checklist—doing the laundry, pumping, buying diapers—and learn to be present with your baby. Enjoy your precious moments together 😊",
  "Expect odd food habits. Offer a variety. Don't push, don't panic. They'll eat when they're hungry 👍",
  "Children are not things to be molded, but people to be unfolded.",
  "The most precious jewels you'll ever have around your neck are the arms of your children.",
  "Kids need your time more than your money.",
  "Every child is different. Don't compare your child's progress with others.",
  "Patience is a virtue, especially when raising children. Take deep breaths.",
  "Read to your child every day. It's the gift that keeps on giving.",
  "Let them make mistakes. It's how they learn and grow.",
  "Sometimes the best thing you can do is just be there."
]

export default function DailyAdvice({ advice }: DailyAdviceProps) {
  const [currentAdvice, setCurrentAdvice] = useState<string[]>(advice)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Rotate to a new set of advice every 10 seconds
    const interval = setInterval(() => {
      // Pick 2 random advice from the full list
      const shuffled = [...allAdvice].sort(() => 0.5 - Math.random())
      setCurrentAdvice(shuffled.slice(0, 2))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    const shuffled = [...allAdvice].sort(() => 0.5 - Math.random())
    setCurrentAdvice(shuffled.slice(0, 2))
  }

  return (
    <section className={styles.section3}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionHeading}>Daily Advice</h1>
        <button className={styles.refreshBtn} onClick={handleRefresh} aria-label="Refresh advice">
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <div className={styles.adviceContainer}>
        {currentAdvice.map((text, index) => (
          <p key={index} className={`${styles.advice} ${styles.fadeIn}`}>
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}

