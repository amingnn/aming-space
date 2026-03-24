import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const ROLES = [
  'AI Vision Engineer',
  '图像识别研究者',
  'Deep Learning Explorer',
  '在探索世界的学生',
]

function NeuralCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
    camera.position.z = 300

    const NODE_COUNT = 120
    const positions = []
    const nodePositions = []

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 700
      const y = (Math.random() - 0.5) * 500
      const z = (Math.random() - 0.5) * 200
      nodePositions.push(new THREE.Vector3(x, y, z))
      positions.push(x, y, z)
    }

    // Nodes
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const nodeMat = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })
    const colors = []
    const palette = [
      [0.66, 0.33, 0.97], // purple
      [0.23, 0.51, 0.96], // blue
      [0.02, 0.71, 0.83], // cyan
      [0.93, 0.28, 0.60], // pink
    ]
    for (let i = 0; i < NODE_COUNT; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors.push(...c)
    }
    nodeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    const nodes = new THREE.Points(nodeGeo, nodeMat)
    scene.add(nodes)

    // Edges
    const edgePositions = []
    const edgeColors = []
    const THRESHOLD = 120
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < THRESHOLD) {
          edgePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z)
          edgePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z)
          edgeColors.push(0.66, 0.33, 0.97, 0.23, 0.51, 0.96)
        }
      }
    }
    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3))
    edgeGeo.setAttribute('color', new THREE.Float32BufferAttribute(edgeColors, 3))
    const edgeMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.25 })
    const edges = new THREE.LineSegments(edgeGeo, edgeMat)
    scene.add(edges)

    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    const animate = () => {
      frame++
      const t = frame * 0.003
      scene.rotation.y = mouse.x * 0.15 + Math.sin(t * 0.3) * 0.05
      scene.rotation.x = -mouse.y * 0.08 + Math.cos(t * 0.2) * 0.03
      nodeMat.opacity = 0.6 + Math.sin(t) * 0.2
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}

function TypeWriter({ texts }) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[index]
    let timeout

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx))
        setCharIdx((c) => c + 1)
      }, 80)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx))
        setCharIdx((c) => c - 1)
      }, 40)
    } else {
      setDeleting(false)
      setIndex((i) => (i + 1) % texts.length)
      setCharIdx(0)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, index, texts])

  return (
    <span className="grad-text-accent" style={{ fontSize: 'inherit', fontWeight: 700 }}>
      {display}
      <span style={{ borderRight: '3px solid #a855f7', marginLeft: 2, animation: 'blink 1s step-end infinite' }} />
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>

      <NeuralCanvas />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: 16, letterSpacing: 4, textTransform: 'uppercase' }}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grad-text"
          style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}
        >
          Aming
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', minHeight: '2.4em', marginBottom: 40 }}
        >
          <TypeWriter texts={ROLES} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#about"
            data-cursor
            style={{
              padding: '14px 36px',
              borderRadius: 50,
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(168,85,247,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 14px 40px rgba(168,85,247,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(168,85,247,0.35)'
            }}
          >
            了解我
          </a>
          <a
            href="#contact"
            data-cursor
            style={{
              padding: '14px 36px',
              borderRadius: 50,
              background: 'transparent',
              color: '#a855f7',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              border: '2px solid #a855f7',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.1)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            联系我
          </a>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          animation: 'float 2s ease-in-out infinite',
          opacity: 0.6,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
