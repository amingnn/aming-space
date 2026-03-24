import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLAYLIST_ID = '2237197924'
const EMBED_URL = `//music.163.com/outchain/player?type=1&id=${PLAYLIST_ID}&auto=0&height=430`

export default function FloatingPlayer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Iframe panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              bottom: 90,
              right: 24,
              width: 300,
              height: 450,
              borderRadius: 18,
              overflow: 'hidden',
              zIndex: 8888,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.3)',
              background: '#fff',
            }}
          >
            <iframe
              frameBorder="no"
              border="0"
              marginWidth="0"
              marginHeight="0"
              width={300}
              height={450}
              src={EMBED_URL}
              title="NetEase Music"
              style={{ display: 'block' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        data-cursor
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: 'none',
          background: open
            ? 'linear-gradient(135deg, #a855f7, #3b82f6)'
            : 'linear-gradient(135deg, #c0392b, #e74c3c)',
          cursor: 'none',
          zIndex: 8889,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: open
            ? '0 8px 30px rgba(168,85,247,0.5)'
            : '0 8px 30px rgba(231,76,60,0.45)',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
        title={open ? '关闭播放器' : '我的网易云歌单'}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        )}
        {/* Pulse ring when closed */}
        {!open && (
          <span style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            border: '2px solid rgba(231,76,60,0.5)',
            animation: 'ping 2s ease-in-out infinite',
          }} />
        )}
      </motion.button>

      <style>{`
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>
    </>
  )
}
