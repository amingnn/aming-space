import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = [
  {
    name: 'GitHub',
    handle: '@amingnn',
    url: 'https://github.com/amingnn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #374151, #6b7280)',
    shadow: 'rgba(55,65,81,0.3)',
  },
  {
    name: '邮箱',
    handle: 'item_aming@163.com',
    url: 'mailto:item_aming@163.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
    shadow: 'rgba(168,85,247,0.3)',
  },
  {
    name: '微信',
    handle: 'p1279456901',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M8.5 11.5a1 1 0 100-2 1 1 0 000 2zm3.5 0a1 1 0 100-2 1 1 0 000 2zM2 8.5C2 5.46 4.91 3 8.5 3S15 5.46 15 8.5c0 .34-.04.67-.1 1A7.5 7.5 0 0122 16.5c0 .97-.22 1.88-.6 2.7l.6 2.3-2.4-.8A7.46 7.46 0 0116.5 21a7.5 7.5 0 01-7.38-6.1A6.46 6.46 0 018.5 15C4.91 15 2 12.54 2 9.5v-1z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #07c160, #10b981)',
    shadow: 'rgba(7,193,96,0.3)',
  },
  {
    name: '网易云音乐',
    handle: '我的歌单',
    url: 'https://music.163.com/#/my/m/music/playlist?id=2237197924',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #c0392b, #e74c3c)',
    shadow: 'rgba(192,57,43,0.3)',
  },
]

function LinkCard({ link, index }) {
  return (
    <motion.a
      href={link.url}
      target={link.url.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.02, boxShadow: `0 20px 50px ${link.shadow}` }}
      data-cursor
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '24px 28px',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.8)',
        boxShadow: `0 4px 20px ${link.shadow}`,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: link.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexShrink: 0,
        boxShadow: `0 6px 20px ${link.shadow}`,
      }}>
        {link.icon}
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1f2937', marginBottom: 3 }}>
          {link.name}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{link.handle}</div>
      </div>
      <div style={{ marginLeft: 'auto', color: '#d1d5db' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -60, right: -80,
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: -60,
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Sparkle dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
          style={{
            position: 'absolute',
            width: 6, height: 6,
            borderRadius: '50%',
            background: ['#a855f7','#3b82f6','#06b6d4','#ec4899','#10b981','#f59e0b'][i],
            top: `${[15, 70, 30, 80, 20, 65][i]}%`,
            left: `${[5, 8, 90, 92, 50, 50][i]}%`,
            pointerEvents: 'none',
          }}
        />
      ))}
      <div className="container" ref={ref} style={{ maxWidth: 700, position: 'relative', zIndex: 1 }}>
        <motion.h2
          className="section-title grad-text"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          联系我
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ textAlign: 'center', color: '#6b7280', marginBottom: 50, fontSize: '1.05rem', lineHeight: 1.8 }}
        >
          无论是合作机会、学术交流，还是只是想聊聊 AI，
          <br />都欢迎来找我！
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {LINKS.map((link, i) => (
            <LinkCard key={link.name} link={link} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(168,85,247,0.15)' }}
        >
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
            © 2026 Aming · Built with{' '}
            <span className="grad-text" style={{ fontWeight: 700 }}>React + Three.js</span>
            {' '}· Hosted on Cloudflare
          </p>
        </motion.div>
      </div>
    </section>
  )
}
