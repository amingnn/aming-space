import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  {
    category: 'AI · 视觉',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
    items: [
      { name: 'PyTorch', desc: '深度学习框架，训练视觉模型' },
      { name: 'OpenCV', desc: '图像处理与计算机视觉库' },
      { name: '目标检测', desc: 'YOLO / Faster-RCNN 等' },
      { name: '图像分类', desc: 'ResNet / ViT 骨干网络' },
      { name: '语义分割', desc: 'FCN / DeepLab 系列' },
    ],
  },
  {
    category: '编程语言',
    icon: '⌨️',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    items: [
      { name: 'Python', desc: 'AI/ML 首选语言' },
      { name: 'JavaScript', desc: '前端开发与交互' },
      { name: 'C++', desc: '性能关键场景' },
      { name: 'SQL', desc: '数据查询与管理' },
    ],
  },
  {
    category: '工具 · 平台',
    icon: '🛠️',
    gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
    items: [
      { name: 'Git / GitHub', desc: '版本控制与协作' },
      { name: 'Linux', desc: '服务器环境与调试' },
      { name: 'Jupyter', desc: '实验与数据探索' },
      { name: 'Docker', desc: '环境隔离与部署' },
    ],
  },
  {
    category: '正在学习',
    icon: '🚀',
    gradient: 'linear-gradient(135deg, #ec4899, #a855f7)',
    items: [
      { name: 'Diffusion Models', desc: '生成式视觉模型' },
      { name: 'Multimodal LLM', desc: '图文多模态大模型' },
      { name: 'CUDA', desc: 'GPU 并行计算' },
    ],
  },
]

function SkillCard({ skill, delay }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(null)
  const cardRef = useRef(null)

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = ((e.clientY - cy) / (rect.height / 2)) * 8
    const y = -((e.clientX - cx) / (rect.width / 2)) * 8
    setTilt({ x, y })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: 28,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        {/* Gradient top bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: skill.gradient,
          borderRadius: '20px 20px 0 0',
        }} />

        {/* Glow on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: skill.gradient,
          opacity: 0.04,
          borderRadius: 20,
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: '1.8rem' }}>{skill.icon}</span>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            background: skill.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {skill.category}
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {skill.items.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 10,
                background: hovered === item.name ? 'rgba(168,85,247,0.08)' : 'transparent',
                transition: 'all 0.2s',
                cursor: 'default',
              }}
            >
              <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.95rem' }}>{item.name}</span>
              <span style={{
                fontSize: '0.78rem',
                color: '#9ca3af',
                maxWidth: 140,
                textAlign: 'right',
                opacity: hovered === item.name ? 1 : 0.6,
                transition: 'opacity 0.2s',
              }}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section" style={{ background: 'rgba(248,247,255,0.5)' }}>
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title grad-text"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          技能栈
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.category} skill={skill} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
