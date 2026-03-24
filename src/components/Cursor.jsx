import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const rafId = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }

      // Hover scale effect on interactive elements
      const target = e.target
      const isHover = target.closest('a, button, [data-cursor]')
      if (isHover) {
        ringEl.style.width = '48px'
        ringEl.style.height = '48px'
        ringEl.style.borderColor = 'rgba(168,85,247,0.8)'
        ringEl.style.background = 'rgba(168,85,247,0.08)'
      } else {
        ringEl.style.width = '36px'
        ringEl.style.height = '36px'
        ringEl.style.borderColor = 'rgba(168,85,247,0.5)'
        ringEl.style.background = 'transparent'
      }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`
      // Ring follows with lag
      ring.current.x += (pos.current.x - ring.current.x) * 0.14
      ring.current.y += (pos.current.y - ring.current.y) * 0.14
      ringEl.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`
      rafId.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>

      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 8px rgba(168,85,247,0.8)',
          willChange: 'transform',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(168,85,247,0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, background 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
