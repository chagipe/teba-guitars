import { motion } from 'framer-motion'

/* Animación de aparición al hacer scroll */
export default function Reveal({
  children,
  delay = 0,
  y = 60,
  rotate = 0,
  className,
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.9, 0.2, 1.2] }}
    >
      {children}
    </motion.div>
  )
}
