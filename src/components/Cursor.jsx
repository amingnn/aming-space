import { useEffect, useRef } from 'react'

const COLORS = ['#a855f7', '#3b82f6', '#06b6d4', '#ec4899', '#8b5cf6', '#f59e0b']

export default function Cursor() {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const mouse = useRef({ x: -200, y: -200 })
  const rafId = useRef(null)
  const lastPos = useRef({ x: -200, y: -200 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)
      lastPos.current = { x: e.clientX, y: e.clientY }

      // Spawn more particles when moving fast
      const count = Math.min(Math.floor(speed * 0.4) + 2, 8)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const v = 0.5 + Math.random() * 2.5
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v - 0.5,
          life: 1,
          decay: 0.025 + Math.random() * 0.035,
          size: 1.5 + Math.random() * 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw glowing cursor dot
      const { x, y } = mouse.current
      const grd = ctx.createRadialGradient(x, y, 0, x, y, 10)
      grd.addColorStop(0, 'rgba(168,85,247,0.9)')
      grd.addColorStop(0.5, 'rgba(59,130,246,0.5)')
      grd.addColorStop(1, 'rgba(6,182,212,0)')
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.95)'
      ctx.fill()
      // Outer glow
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Update & draw particles
      particles.current = particles.current.filter(p => p.life > 0)
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.06
        p.vx *= 0.98
        p.life -= p.decay

        ctx.save()
        ctx.globalAlpha = p.life * p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 6
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.restore()
      }

      rafId.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, [data-cursor] { cursor: none; }
        @media (pointer: coarse) {
          body { cursor: auto; }
          a, button, [data-cursor] { cursor: auto; }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  )
}
