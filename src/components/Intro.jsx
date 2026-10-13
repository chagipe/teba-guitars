import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* Cortina inicial con la firma de la marca */
export default function Intro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(false)
      return
    }
    const t = setTimeout(() => setShow(false), 2100)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.7, 0, 0.2, 1] } }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.3em', filter: 'blur(8px)' }}
            animate={{ opacity: 1, letterSpacing: '0em', filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="font-hand text-[clamp(90px,16vw,200px)] leading-none text-paper"
          >
            Teba
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
