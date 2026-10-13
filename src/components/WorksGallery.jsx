import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import worksData from '../data/works.json'

/* Deslizador comparativo antes/después */
function BeforeAfterSlider({ work, index }) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.max(0, Math.min(100, x)))
  }, [])

  const handlePointerDown = (e) => {
    setIsDragging(true)
    updatePosition(e.clientX)
    e.target.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = useCallback(
    (e) => {
      if (isDragging) updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const handlePointerUp = () => setIsDragging(false)

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setSliderPos((p) => Math.max(0, p - 5))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setSliderPos((p) => Math.min(100, p + 5))
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group relative bg-paper shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
    >
      <div className="tape-bit" />

      {/* Contenedor del slider */}
      <div
        ref={containerRef}
        className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        role="slider"
        aria-label={`Comparar antes y después: ${work.title}`}
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Imagen "después" (fondo) */}
        <div className="absolute inset-0 bg-teal/20">
          {work.after.startsWith('TODO') ? (
            <div className="grid h-full place-items-center bg-gradient-to-br from-teal/30 to-teal/10 p-6 text-center">
              <p className="text-sm italic text-paper/50">
                Imagen "después" — pendiente
              </p>
            </div>
          ) : (
            <img
              src={work.after}
              alt={`Después: ${work.title}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Imagen "antes" (clip) */}
        <div
          className="absolute inset-0 bg-wine/20"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {work.before.startsWith('TODO') ? (
            <div className="grid h-full place-items-center bg-gradient-to-br from-wine/30 to-wine/10 p-6 text-center">
              <p className="text-sm italic text-paper/50">
                Imagen "antes" — pendiente
              </p>
            </div>
          ) : (
            <img
              src={work.before}
              alt={`Antes: ${work.title}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Línea divisoria */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-brass"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brass bg-ink/80">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-brass"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
            </svg>
          </div>
        </div>

        {/* Etiquetas */}
        <span className="absolute top-3 left-3 z-10 rounded-sm bg-ink/70 px-2 py-0.5 text-xs text-paper">
          Antes
        </span>
        <span className="absolute top-3 right-3 z-10 rounded-sm bg-ink/70 px-2 py-0.5 text-xs text-paper">
          Después
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display text-xl text-ink">{work.title}</h3>
        <p className="mt-1 text-sm text-ink/60">{work.description}</p>
        <span className="mt-3 inline-block rounded-sm bg-teal/10 px-2 py-0.5 text-xs text-teal">
          {work.category}
        </span>
      </div>
    </motion.article>
  )
}

export default function WorksGallery() {
  return (
    <section id="trabajos" className="relative py-24">
      <div className="mx-auto mb-16 max-w-3xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl text-paper sm:text-5xl"
        >
          Trabajos antes y después
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-4 h-0.5 w-32 bg-brass"
        />
        <p className="mt-6 text-paper/70">
          Desliza o usa las flechas del teclado para comparar. Las imágenes son
          temporales hasta que se suban las reales.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {worksData.works.map((work, i) => (
          <BeforeAfterSlider key={work.id} work={work} index={i} />
        ))}
      </div>
    </section>
  )
}
