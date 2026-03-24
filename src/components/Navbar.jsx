import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '10px 24px' : '20px 24px',
        transition: 'padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        background: scrolled ? 'rgba(255,255,255,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(168,85,247,0.1)' : 'none',
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo - avatar */}
        <a
          href="#home"
          data-cursor
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid transparent',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #a855f7, #06b6d4) border-box',
            flexShrink: 0,
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(168,85,247,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <img src="/avatar.jpg" alt="Aming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                data-cursor
                style={{
                  padding: '8px 18px',
                  borderRadius: 50,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#a855f7' : '#374151',
                  background: isActive ? 'rgba(168,85,247,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {item.label}
              </a>
            )
          })}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'none',
            display: 'none',
            padding: 8,
          }}
        >
          <div style={{ width: 24, height: 2, background: '#374151', marginBottom: 5, transition: 'all 0.3s' }} />
          <div style={{ width: 24, height: 2, background: '#374151', marginBottom: 5, transition: 'all 0.3s' }} />
          <div style={{ width: 24, height: 2, background: '#374151', transition: 'all 0.3s' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(16px)',
              marginTop: 10,
              borderRadius: 16,
              padding: '8px 0',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 24px',
                  textDecoration: 'none',
                  color: '#374151',
                  fontWeight: 600,
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  )
}
