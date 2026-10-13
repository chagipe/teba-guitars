import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* Púa que sigue al puntero con física de muelle */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [big, setBig] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    setEnabled(true)
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      setBig(!!e.target.closest('a,button,input,select,textarea,[data-cursor]'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className={`pick-cursor on ${big ? 'big' : ''}`}
      style={{ x: sx, y: sy }}
    >
      <svg viewBox="0 0 24 24">
        <path
          d="M12 2C6 2 3 6 3 10c0 6 6 12 9 12s9-6 9-12c0-4-3-8-9-8z"
          fill="#c9a45c"
          stroke="#17110e"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  )
}
