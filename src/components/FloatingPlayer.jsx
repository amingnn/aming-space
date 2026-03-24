import { motion } from 'framer-motion'

const PLAYLIST_URL = 'https://music.163.com/#/my/m/music/playlist?id=2237197924'

export default function FloatingPlayer() {
  return (
    <>
      <motion.a
        href={PLAYLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        title="打开我的网易云歌单"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
          cursor: 'none',
          zIndex: 8889,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(231,76,60,0.45)',
          textDecoration: 'none',
        }}
      >
        {/* Music note icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>

        {/* Pulse ring */}
        <span style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: '2px solid rgba(231,76,60,0.5)',
          animation: 'music-ping 2s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      </motion.a>

      <style>{`
        @keyframes music-ping {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.28); opacity: 0; }
        }
      `}</style>
    </>
  )
}
