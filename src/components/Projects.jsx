import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionArrow from './SectionArrow'

const PROJECTS = [
  {
    id: 1,
    name: '视觉检测系统',
    desc: '基于 YOLOv8 的实时目标检测 pipeline，支持多类别识别与追踪，REST API 对外提供推理服务。',
    tags: ['PyTorch', 'YOLOv8', 'OpenCV', 'FastAPI'],
    status: '规划中',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    icon: '👁️',
  },
  {
    id: 2,
    name: 'LLM 自动化助手',
    desc: '结合 LangGraph 编排多 Agent 工作流，爬取目标数据后自动生成报告，支持多轮对话记忆。',
    tags: ['LangChain', 'LangGraph', 'Python', 'Playwright'],
    status: '规划中',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    icon: '🤖',
  },
  {
    id: 3,
    name: 'AI 音频处理工具',
    desc: '基于 Whisper 的语音转文字 + TTS 合成，构建端到端音频处理流水线，命令行 & API 双入口。',
    tags: ['Whisper', 'TTS', 'FastAPI', 'uv'],
    status: '规划中',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
    icon: '🎙️',
  },
]

const cardVariants = [
  { hidden: { opacity: 0, x: -60, rotateY: -8 }, visible: { opacity: 1, x: 0, rotateY: 0 } },
  { hidden: { opacity: 0, y: 70, scale: 0.88 }, visible: { opacity: 1, y: 0, scale: 1 } },
  { hidden: { opacity: 0, x: 60, rotateY: 8 }, visible: { opacity: 1, x: 0, rotateY: 0 } },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const variant = cardVariants[index % cardVariants.length]

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'box-shadow 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 20px 50px rgba(168,85,247,0.2), 0 0 0 1px rgba(168,85,247,0.2)`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)'
        }}
      >
        {/* Gradient header */}
        <div style={{
          height: 6,
          background: project.gradient,
        }} />

        <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Icon + Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '2rem' }}>{project.icon}</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f3f4f6', margin: 0 }}>
                {project.name}
              </h3>
            </div>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 20,
              background: 'rgba(168,85,247,0.15)',
              border: '1px solid rgba(168,85,247,0.4)',
              color: '#c084fc',
              whiteSpace: 'nowrap',
            }}>
              {project.status}
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#9ca3af', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
            {project.desc}
          </p>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: 20,
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.25)',
                color: '#93c5fd',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="projects" style={{ position: 'relative', padding: '100px 0 60px', overflow: 'hidden' }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '10%', right: '-10%',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '-8%',
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
        }} />
        {/* Horizontal gradient line */}
        <div style={{
          position: 'absolute', top: '48%', left: '5%', right: '5%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.15), rgba(59,130,246,0.15), transparent)',
        }} />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2 className="grad-text" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: 12 }}>
            Projects
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>正在构建中 · Building in Progress</p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      <SectionArrow to="#gallery" />
    </section>
  )
}
