/**
 * SSG (Static Site Generation) Component
 * Static hero section that is pre-rendered at build time
 * No dynamic data fetching - pure static content
 */
import styles from '../styles/home.module.scss'

export default function Hero() {
  const letters = ['D', 'i', 's', 'n', 'e', 'y']
  const backgroundImage = 'https://img.pikbest.com/backgrounds/20250112/an-enchanted-castle-rising-organically-from-the-pages-of-an-open_11370469.jpg!w700wp'
  
  return (
    <section 
      className={styles.section1} 
      id="home"
      style={{
        background: `linear-gradient(rgba(51, 51, 51, 0.4), rgba(51, 51, 51, 0.3)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className={styles.section1Heading}>
        {letters.map((letter, index) => (
          <span key={index} data-letter={letter}>
            {letter}
          </span>
        ))}
      </h1>
    </section>
  )
}

