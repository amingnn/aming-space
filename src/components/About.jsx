import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

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
            <div style={{ position: 'relative', width: 240, height: 240 }}>
              {/* Rotating gradient ring */}
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
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                zIndex: 1,
                border: '4px solid white',
                background: 'linear-gradient(135deg, #e0d7ff, #c7d9ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem',
              }}>
                {/* Placeholder avatar - replace with actual photo */}
                🧠
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
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.9,
              color: '#374151',
              marginBottom: 24,
            }}>
              你好！我是 <strong className="grad-text" style={{ fontStyle: 'normal' }}>Aming</strong>，
              一名专注于 <strong>AI 图像识别</strong> 方向的学生。我热爱探索计算机视觉的边界，
              相信技术可以让机器真正"看懂"这个世界。
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: '#374151', marginBottom: 32 }}>
              目前在研究深度学习模型在视觉任务中的应用，包括目标检测、图像分类和语义分割。
              除了写代码，我也喜欢拍照——用镜头记录光与影，也许这就是我迷上视觉 AI 的原因。
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { label: '方向', value: 'AI · 图像识别' },
                { label: '状态', value: '在读学生' },
                { label: '爱好', value: '拍照 · 探索' },
              ].map((item) => (
                <div key={item.label} className="glass-card" style={{ padding: '12px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {item.label}
                  </div>
                  <div style={{ fontWeight: 700, color: '#4b5563' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
