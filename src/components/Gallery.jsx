import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionArrow from './SectionArrow'

const PHOTOS = [
  { id: 1, src: null, label: '暂无', tag: 'AI', color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' },
  { id: 2, src: null, label: '暂无', tag: 'AI', color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' },
  { id: 3, src: null, label: '暂无', tag: 'AI', color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)' },
  { id: 4, src: null, label: '暂无', tag: 'AI', color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' },
]

// Each card gets a different entrance animation
const cardAnimations = [
  { initial: { opacity: 0, x: -80, rotateY: -10 }, animate: { opacity: 1, x: 0, rotateY: 0 } },
  { initial: { opacity: 0, y: 80, scale: 0.85 },    animate: { opacity: 1, y: 0, scale: 1 } },
  { initial: { opacity: 0, y: 80, scale: 0.85 },    animate: { opacity: 1, y: 0, scale: 1 } },
  { initial: { opacity: 0, x: 80, rotateY: 10 },    animate: { opacity: 1, x: 0, rotateY: 0 } },
]

function PhotoCard({ photo, index }) {
  const [hover, setHover] = useState(false)
  const anim = cardAnimations[index % cardAnimations.length]

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.animate}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '1/1',
        cursor: 'pointer',
        boxShadow: hover
          ? `0 24px 60px ${photo.color}50`
          : `0 6px 24px ${photo.color}20`,
        transition: 'box-shadow 0.4s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gradient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: photo.src ? `url(${photo.src})` : photo.gradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: hover ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.5s ease',
      }}>
        {/* Noise/pattern overlay for depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18) 0%, transparent 55%),
                            radial-gradient(circle at 80% 70%, rgba(0,0,0,0.1) 0%, transparent 50%)`,
        }} />
      </div>

      {/* Dark overlay on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 55%)',
        opacity: hover ? 1 : 0.3,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Tag */}
      <motion.div
        animate={{ scale: hover ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          padding: '5px 14px',
          borderRadius: 20,
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
      >
        {photo.tag}
      </motion.div>

      {/* Center placeholder icon */}
      {!photo.src && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}>
          <motion.div
            animate={{ opacity: hover ? 0.9 : 0.5, scale: hover ? 1.15 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: '3rem' }}
          >
            🤖
          </motion.div>
          <motion.span
            animate={{ opacity: hover ? 1 : 0.6, y: hover ? 0 : 4 }}
            transition={{ duration: 0.3 }}
            style={{
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            暂无
          </motion.span>
        </div>
      )}

      {/* Bottom label */}
      <motion.div
        animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 18px',
        }}
      >
        <p style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{photo.label}</p>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: -60, left: -120,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, right: -100,
        width: 450, height: 450, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Diagonal stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168,85,247,0.02) 60px, rgba(168,85,247,0.02) 61px)',
        pointerEvents: 'none',
      }} />

      <div className="container" ref={ref}>
        <motion.h2
          className="section-title grad-text"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          作品 · 快照
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ textAlign: 'center', color: '#6b7280', marginBottom: 50, fontSize: '1.05rem' }}
        >
          AI 实验结果 · 项目记录 · 精彩瞬间
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          maxWidth: 800,
          margin: '0 auto',
        }}>
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>
      </div>

      <SectionArrow to="#contact" label="Contact" />
    </section>
  )
}
