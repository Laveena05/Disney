/**
 * CSR (Client-Side Rendering) Component
 * This component uses 'use client' directive to enable client-side interactivity
 * The menu state is managed on the client using React hooks
 */
'use client'

import { useState, useEffect } from 'react'
import styles from '../styles/home.module.scss'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsOpen(false) // Close menu after click
  }

  return (
    <>
      <div 
        className={`${styles.menu} ${isOpen ? styles.change : ''}`} 
        onClick={handleClick}
      >
        <div className={styles.menuLine}></div>
        <div className={`${styles.menuLine} ${styles.menuLine2}`}></div>
        <div className={styles.menuLine}></div>
      </div>
      
      <nav className={`${styles.navbar} ${isOpen ? styles.change : ''}`}>
        <div className={styles.navList}>
          <a href="#home" onClick={(e) => smoothScroll(e, '#home')}>Home</a>
          <a href="#about" onClick={(e) => smoothScroll(e, '#about')}>Popular Toys</a>
          <a href="#projects" onClick={(e) => smoothScroll(e, '#projects')}>Gallery</a>
          <a href="#contact" onClick={(e) => smoothScroll(e, '#contact')}>Contact</a>
        </div>
        <div className={styles.navActions}>
          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
        <div className={styles.socialMedia}>
          <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter-square"></i></a>
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-square"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram-square"></i></a>
        </div>
        <p className={styles.copyrightText}>
          Copyright &copy; Laveena Maharshi. All Rights Reserved
        </p>
      </nav>
    </>
  )
}

