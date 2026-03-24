import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Placeholder gallery items - replace src with actual photo paths in public/gallery/
const PHOTOS = [
  { id: 1, src: null, label: '城市夜景', tag: '摄影', color: '#a855f7', span: 2 },
  { id: 2, src: null, label: '模型训练可视化', tag: 'AI', color: '#3b82f6', span: 1 },
  { id: 3, src: null, label: '日落', tag: '摄影', color: '#ec4899', span: 1 },
  { id: 4, src: null, label: '目标检测结果', tag: 'AI', color: '#06b6d4', span: 1 },
  { id: 5, src: null, label: '街头抓拍', tag: '摄影', color: '#10b981', span: 1 },
  { id: 6, src: null, label: '语义分割展示', tag: 'AI', color: '#8b5cf6', span: 2 },
]

function PhotoCard({ photo, index }) {
  const [hover, setHover] = useState(false)

  const gradients = [
    'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: photo.span === 2 ? 'span 2' : 'span 1',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: photo.span === 2 ? '2.4/1' : '1/1',
        cursor: 'pointer',
        boxShadow: hover
          ? `0 20px 60px ${photo.color}40`
          : '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Background - gradient placeholder or actual image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: photo.src ? undefined : gradients[index % gradients.length],
        backgroundImage: photo.src ? `url(${photo.src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: hover ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.5s ease',
      }}>
        {/* Pattern overlay for placeholders */}
        {!photo.src && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)`,
          }} />
        )}
      </div>

      {/* Hover overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)',
        opacity: hover ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }} />

      {/* Tag */}
      <div style={{
        position: 'absolute',
        top: 14,
        left: 14,
        padding: '4px 12px',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(8px)',
        color: 'white',
        fontSize: '0.78rem',
        fontWeight: 600,
        letterSpacing: 1,
      }}>
        {photo.tag}
      </div>

      {/* Label */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px 18px 18px',
        transform: hover ? 'translateY(0)' : 'translateY(8px)',
        opacity: hover ? 1 : 0,
        transition: 'all 0.35s ease',
      }}>
        <p style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{photo.label}</p>
      </div>

      {/* Placeholder icon */}
      {!photo.src && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          opacity: 0.4,
        }}>
          {photo.tag === 'AI' ? '🤖' : '📷'}
        </div>
      )}
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" className="section">
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title grad-text"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          作品 · 快照
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ textAlign: 'center', color: '#6b7280', marginBottom: 50, fontSize: '1.05rem' }}
        >
          AI 实验结果 · 日常摄影 · 有趣瞬间
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
        }}>
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ textAlign: 'center', color: '#9ca3af', marginTop: 32, fontSize: '0.9rem' }}
        >
          * 将照片放入 <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>public/gallery/</code> 并更新图片路径即可替换
        </motion.p>
      </div>
    </section>
  )
}
