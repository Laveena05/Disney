/**
 * CSR (Client-Side Rendering) Component
 * Interactive gallery with lightbox functionality
 * Users can click on images to view them in fullscreen modal
 */
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/home.module.scss'

// Static data for SSG - embedded at build time
const galleryImages = [
  '/images/gallery-img-1.jpg',
  '/images/gallery-img-2.jpg',
  '/images/gallery-img-3.jpg',
  '/images/gallery-img-4.jpg',
  '/images/gallery-img-5.jpg',
  '/images/gallery-img-6.jpg',
  '/images/gallery-img-7.jpg',
  '/images/gallery-img-8.jpg',
  '/images/gallery-img-9.jpg',
  '/images/gallery-img-10.jpg',
  '/images/gallery-img-11.jpg',
  '/images/gallery-img-12.jpg'
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setTimeout(() => setSelectedImage(null), 300) // Allow animation to complete
  }

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, selectedImage])

  return (
    <>
      <section className={styles.section4} id="projects">
        <h1 className={styles.sectionHeading}>Gallery</h1>
        <div className={styles.gallery}>
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className={styles.galleryItem}
              onClick={() => openLightbox(index)}
              style={{ cursor: 'pointer' }}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={300}
                height={200}
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.imageOverlay}>
                <span>Click to view</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedImage !== null && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button 
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <button 
            className={styles.lightboxPrev}
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            aria-label="Previous image"
          >
            &#8249;
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[selectedImage]}
              alt={`Gallery image ${selectedImage + 1}`}
              width={1200}
              height={800}
              style={{ objectFit: 'contain' }}
              priority
            />
            <div className={styles.imageCounter}>
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
          <button 
            className={styles.lightboxNext}
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  )
}
