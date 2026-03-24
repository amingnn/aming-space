import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionArrow from './SectionArrow'
import PythonIcon from './PythonIcon'

const SKILLS = [
  {
    category: 'AI · 视觉',
    icon: '🤖',
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
    category: 'Python 生态',
    icon: '__python__',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    items: [
      { name: '自动化', desc: 'Playwright / Selenium 等' },
      { name: 'LLM 应用', desc: '大语言模型接入与调用' },
      { name: '爬虫', desc: 'Scrapy / httpx 数据采集' },
      { name: 'AI 音频', desc: 'Whisper / TTS 语音处理' },
      { name: 'FastAPI', desc: 'Python 后端 API 服务' },
    ],
  },
  {
    category: '工具 · 平台',
    icon: '🛠️',
    gradient: 'linear-gradient(135deg, #f59e0b, #ec4899)',
    items: [
      { name: 'Git / GitHub', desc: '版本控制与协作' },
      { name: 'Linux', desc: '服务器环境与调试' },
      { name: 'Docker', desc: '环境隔离与部署' },
      { name: 'uv', desc: 'Python 包管理器，极速依赖安装' },
    ],
  },
  {
    category: '正在学习',
    icon: '🚀',
    gradient: 'linear-gradient(135deg, #ec4899, #a855f7)',
    items: [
      { name: 'LangChain', desc: 'LLM 应用编排框架' },
      { name: 'LangGraph', desc: 'Agent 工作流图编排' },
      { name: '模型优化', desc: '量化 / 剪枝 / 蒸馏' },
      { name: 'CUDA', desc: 'GPU 并行计算加速' },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function SkillCard({ skill }) {
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
      variants={cardVariants}
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
          height: '100%',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 4,
          background: skill.gradient,
          borderRadius: '20px 20px 0 0',
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: skill.gradient,
          opacity: 0.04,
          borderRadius: 20,
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: '1.8rem', lineHeight: 1, display: 'flex', alignItems: 'center' }}>
            {skill.icon === '__python__' ? <PythonIcon size={32} /> : skill.icon}
          </span>
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
                maxWidth: 150,
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
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section" style={{ background: 'rgba(248,247,255,0.5)', position: 'relative', overflow: 'hidden' }}>
      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.18) 1.2px, transparent 1.2px)',
        backgroundSize: '32px 32px',
        opacity: 0.45,
        pointerEvents: 'none',
      }} />
      {/* Gradient blobs */}
      <div style={{
        position: 'absolute', top: -80, left: -80,
        width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, right: -60,
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title grad-text"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          技能栈
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {SKILLS.map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </motion.div>
      </div>
      <SectionArrow to="#projects" />
    </section>
  )
}
