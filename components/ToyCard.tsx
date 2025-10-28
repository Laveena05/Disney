/**
 * CSR (Client-Side Rendering) Component
 * Interactive toy card with flip animation
 * Uses client-side state to handle the card interaction
 */
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/home.module.scss'

interface ToyCardProps {
  heading: string
  image: string
  description: string
  price?: number
  onAddToCart?: (toy: { heading: string; image: string; price: number }) => void
}

export default function ToyCard({ heading, image, description, price = 29.99, onAddToCart }: ToyCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Load like state from localStorage on mount
  useEffect(() => {
    const liked = localStorage.getItem(`liked_${heading}`)
    if (liked === 'true') {
      setIsLiked(true)
    }
  }, [heading])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card flip
    const newLikeState = !isLiked
    setIsLiked(newLikeState)
    // Persist to localStorage
    localStorage.setItem(`liked_${heading}`, String(newLikeState))
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart({ heading, image, price })
    }
  }

  const buttonLetters = ['Learn', 'More']
  const headingLetters = heading.split('')

  return (
    <div className={`${styles.card} ${isOpen ? styles.change : ''}`}>
      <button 
        className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
        onClick={handleLike}
        aria-label={isLiked ? 'Unlike this toy' : 'Like this toy'}
      >
        <i className={`fas fa-heart ${isLiked ? styles.heartFilled : styles.heartEmpty}`}></i>
      </button>
      <h2 className={styles.cardHeading}>
        {headingLetters.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </h2>
      <Image 
        src={image}
        alt={heading}
        width={250}
        height={250}
        className={styles.cardImg}
        priority={false}
      />
      <div className={styles.priceTag}>${price.toFixed(2)}</div>
      <button className={styles.cardBtn} onClick={handleClick}>
        {buttonLetters.join(' ').split('').map((letter, index) => (
          <span key={index}>{letter === ' ' ? '\u00A0' : letter}</span>
        ))}
      </button>
      <div className={styles.circle}>
        <div className={styles.circleContent}>
          <h3 className={styles.circleHeading}>{heading}</h3>
          <p className={styles.circleParagraph}>{description}</p>
          <p className={styles.circlePrice}>${price.toFixed(2)}</p>
          <button className={styles.circleBtn} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

