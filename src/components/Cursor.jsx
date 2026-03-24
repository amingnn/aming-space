import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animate)

    const onEnter = () => {
      dotRef.current?.classList.add('cursor-hover')
      ringRef.current?.classList.add('cursor-hover')
    }
    const onLeave = () => {
      dotRef.current?.classList.remove('cursor-hover')
      ringRef.current?.classList.remove('cursor-hover')
    }

    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7, #06b6d4);
          pointer-events: none;
          z-index: 9999;
          transition: width 0.2s, height 0.2s, top 0.2s, left 0.2s;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed;
          top: -20px;
          left: -20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4) border-box;
          pointer-events: none;
          z-index: 9998;
          will-change: transform;
          opacity: 0.7;
          transition: width 0.25s, height 0.25s, top 0.25s, left 0.25s, opacity 0.2s;
        }
        .cursor-dot.cursor-hover {
          width: 12px;
          height: 12px;
          top: -6px;
          left: -6px;
        }
        .cursor-ring.cursor-hover {
          width: 60px;
          height: 60px;
          top: -30px;
          left: -30px;
          opacity: 0.5;
        }
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none; }
          body { cursor: auto; }
        }
      `}</style>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
