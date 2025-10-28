/**
 * CSR (Client-Side Rendering) Component
 * Interactive footer with contact form
 * Includes form validation and submission handling
 */
'use client'

import { useState } from 'react'
import styles from '../styles/home.module.scss'

interface FormData {
  name: string
  email: string
  message: string
}

export default function Footer() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate form submission
      console.log('Form submitted:', formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerContent}>
        <div className={styles.footerContact}>
          <h2>Contact Us</h2>
          <p>Have questions or feedback? We'd love to hear from you!</p>
          
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? styles.error : ''}
              />
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.error : ''}
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? styles.error : ''}
              />
              {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>

            {submitted && (
              <div className={styles.successMessage}>
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>

        <div className={styles.footerInfo}>
          <h3>Kids Website</h3>
          <p>Laveena Maharshi © 2025</p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

