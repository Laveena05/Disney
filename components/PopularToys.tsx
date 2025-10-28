/**
 * CSR (Client-Side Rendering) Component
 * Interactive toy section with search, filter, and shopping cart
 * Uses client-side state for dynamic filtering and cart management
 */
'use client'

import { useState, useCallback } from 'react'
import ToyCard from './ToyCard'
import styles from '../styles/home.module.scss'

interface Toy {
  heading: string
  image: string
  description: string
  price: number
  category: string
}

// Static data with additional properties
const toys: Toy[] = [
  {
    heading: 'Puzzle',
    image: '/images/toy-1.png',
    description: 'Engaging puzzle toy that develops problem-solving skills and enhances cognitive development in children.',
    price: 24.99,
    category: 'educational'
  },
  {
    heading: 'Bear',
    image: '/images/toy-2.png',
    description: 'Soft and cuddly teddy bear perfect for bedtime stories and imaginary adventures.',
    price: 19.99,
    category: 'stuffed'
  },
  {
    heading: 'Lego',
    image: '/images/toy-3.png',
    description: 'Creative building blocks that inspire imagination and fine motor skill development.',
    price: 34.99,
    category: 'construction'
  }
]

export default function PopularToys() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [cartItems, setCartItems] = useState<Array<{ heading: string; image: string; price: number; quantity: number }>>([])
  const [showCart, setShowCart] = useState(false)

  const categories = ['all', 'educational', 'stuffed', 'construction']

  const filteredToys = toys.filter(toy => {
    const matchesSearch = toy.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          toy.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || toy.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = useCallback((toy: { heading: string; image: string; price: number }) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.heading === toy.heading)
      if (existingItem) {
        return prev.map(item =>
          item.heading === toy.heading
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...toy, quantity: 1 }]
    })
    setShowCart(true)
    // Auto-hide cart notification after 2 seconds
    setTimeout(() => setShowCart(false), 2000)
  }, [])

  const removeFromCart = (heading: string) => {
    setCartItems(prev => prev.filter(item => item.heading !== heading))
  }

  const updateQuantity = (heading: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(heading)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.heading === heading
          ? { ...item, quantity }
          : item
      )
    )
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section className={styles.section2} id="about">
      <h1 className={styles.sectionHeading}>popular toys</h1>
      
      {/* Search and Filter Controls */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search toys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <i className="fas fa-search"></i>
        </div>
        
        <div className={styles.filterButtons}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterBtn} ${filterCategory === category ? styles.active : ''}`}
              onClick={() => setFilterCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.cartIcon} onClick={() => setShowCart(!showCart)}>
          <i className="fas fa-shopping-cart"></i>
          {cartItems.length > 0 && (
            <span className={styles.cartBadge}>{cartItems.length}</span>
          )}
        </div>
      </div>

      {/* Shopping Cart Dropdown */}
      {showCart && (
        <div className={styles.cartDropdown}>
          <div className={styles.cartHeader}>
            <h3>Shopping Cart</h3>
            <button onClick={() => setShowCart(false)}>&times;</button>
          </div>
          {cartItems.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty</p>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cartItems.map(item => (
                  <div key={item.heading} className={styles.cartItem}>
                    <img src={item.image} alt={item.heading} />
                    <div className={styles.cartItemInfo}>
                      <h4>{item.heading}</h4>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                    <div className={styles.quantityControl}>
                      <button onClick={() => updateQuantity(item.heading, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.heading, item.quantity + 1)}>+</button>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.heading)}>
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.cartTotal}>
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button className={styles.checkoutBtn}>Checkout</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Results count */}
      <div className={styles.resultsCount}>
        Showing {filteredToys.length} of {toys.length} toys
      </div>

      {/* Toy Cards */}
      <div className={styles.cardsWrapper}>
        {filteredToys.length > 0 ? (
          filteredToys.map((toy, index) => (
            <ToyCard
              key={index}
              heading={toy.heading}
              image={toy.image}
              description={toy.description}
              price={toy.price}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className={styles.noResults}>No toys found matching your search.</p>
        )}
      </div>
    </section>
  )
}
