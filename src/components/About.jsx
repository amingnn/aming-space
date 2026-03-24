import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -60, scale: 0.96 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 60, scale: 0.96 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const INFO_CARDS = [
  { label: 'AI', value: '算法工程师方向', icon: '🤖' },
  { label: '视觉', value: '图像识别 · 目标检测', icon: '👁️' },
  { label: 'Python', value: '主力开发语言', icon: '🐍' },
  { label: '状态', value: '在读学生', icon: '🎓' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [avatarHover, setAvatarHover] = useState(false)

  return (
    <section id="about" className="section">
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title grad-text"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          关于我
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'center' }}>
          {/* Avatar */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              style={{ position: 'relative', width: 240, height: 240 }}
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
            >
              {/* Outer rotating ring */}
              <div style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4, #ec4899)',
                animation: 'spin-ring 4s linear infinite',
                zIndex: 0,
              }} />
              <div style={{
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899, #a855f7, #06b6d4)',
                animation: 'spin-ring 8s linear infinite reverse',
                opacity: 0.5,
                zIndex: 0,
              }} />
              {/* Avatar image with hover scale */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                zIndex: 1,
                border: '4px solid white',
                background: 'linear-gradient(135deg, #e0d7ff, #c7d9ff)',
                transform: avatarHover ? 'scale(1.07)' : 'scale(1)',
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: avatarHover
                  ? '0 20px 50px rgba(168,85,247,0.4)'
                  : '0 8px 24px rgba(168,85,247,0.15)',
              }}>
                <img
                  src="/avatar.jpg"
                  alt="Aming"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <style>{`
                @keyframes spin-ring {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: '#374151', marginBottom: 24 }}>
              你好！我是 <strong className="grad-text" style={{ fontStyle: 'normal' }}>Aming</strong>，
              一名专注于 <strong>AI 视觉</strong> 方向的学生。Python 是我的主力语言，
              我喜欢它简洁优雅的语法，用它构建从视觉模型到自动化脚本的各类应用。
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: '#374151', marginBottom: 32 }}>
              目前深入 AI 算法工程师方向，研究 LangChain、LangGraph 以及模型优化技术，
              致力于将视觉 AI 与 LLM 能力结合，探索更智能的系统架构。
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {INFO_CARDS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="glass-card"
                  style={{ padding: '14px 10px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {item.label}
                  </div>
                  <div style={{ fontWeight: 700, color: '#4b5563', fontSize: '0.82rem', lineHeight: 1.4 }}>{item.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
