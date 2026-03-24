import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: 3,
      zIndex: 10000,
      background: 'rgba(255,255,255,0.08)',
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4, #ec4899)',
        backgroundSize: '300% 100%',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 8px rgba(168,85,247,0.8)',
        animation: 'gradient-shift 3s linear infinite',
      }} />
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
