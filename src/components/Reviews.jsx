import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, StarHalf } from 'lucide-react'
import reviewsData from '../data/reviews.json'

const { reviews, googleProfileUrl, reviewUrl } = reviewsData

/* Calcula promedio y total */
const averageRating =
  reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0
const totalReviews = reviews.length

/* Estrellas de lectura (para cada reseña) */
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={i <= rating ? 'fill-brass text-brass' : 'text-brass/30'}
          aria-hidden
        />
      ))}
    </div>
  )
}

/* Estrellas interactivas grandes (para calificar) */
function InteractiveStars() {
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)
  const containerRef = useRef(null)

  const handleKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.min(5, s + 1))
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.max(0, s - 1))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      window.open(googleProfileUrl, '_blank', 'noopener')
    }
  }

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label="Califica tu experiencia de 1 a 5 estrellas"
      className="flex justify-center gap-2"
      onMouseLeave={() => setHovered(0)}
      onKeyDown={handleKey}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = hovered >= i || (!hovered && selected >= i)
        return (
          <button
            key={i}
            role="radio"
            aria-checked={selected === i}
            aria-label={`${i} estrella${i > 1 ? 's' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onClick={() => {
              setSelected(i)
              window.open(googleProfileUrl, '_blank', 'noopener')
            }}
            className="cursor-pointer p-1 transition-transform duration-200 hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
          >
            <Star
              size={44}
              className={`transition-all duration-300 ${
                filled
                  ? 'fill-brass text-brass drop-shadow-[0_0_8px_rgba(201,164,92,0.5)]'
                  : 'text-brass/25'
              }`}
              aria-hidden
            />
          </button>
        )
      })}
    </div>
  )
}

/* Polaroid individual de reseña */
function ReviewPolaroid({ review, index }) {
  const rotations = [-3, 2, -1.5, 3, -2.5]
  const rotation = rotations[index % rotations.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: rotation * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
      className="relative bg-paper p-5 pt-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Cinta adhesiva */}
      <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-brass/30 backdrop-blur-[1px]" />

      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-signature text-2xl leading-tight text-ink">
            {review.author}
          </p>
          <p className="mt-0.5 text-xs text-ink/50">{review.date}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <p className="text-sm leading-relaxed text-ink/80">{review.text}</p>

      {/* Marca de Google */}
      <div className="mt-4 flex items-center gap-1.5 text-xs text-ink/40">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Google</span>
      </div>
    </motion.article>
  )
}

export default function Reviews() {
  return (
    <section id="resenas" className="relative overflow-hidden py-24">
      {/* Título con tira rasgada */}
      <div className="mx-auto mb-16 max-w-3xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl text-paper sm:text-5xl"
        >
          Lo que dicen nuestros clientes
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-4 h-0.5 w-32 bg-brass"
        />

        {/* Promedio y total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-3xl text-brass">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i <= Math.round(averageRating)
                      ? 'fill-brass text-brass'
                      : 'text-brass/30'
                  }
                  aria-hidden
                />
              ))}
            </div>
          </div>
          <span className="text-paper/60">·</span>
          <span className="text-paper/80">
            {totalReviews} reseña{totalReviews !== 1 ? 's' : ''}
          </span>
          <span className="text-paper/60">·</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 px-3 py-1 text-xs text-brass">
            <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden>
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Reseñas de Google
          </span>
        </motion.div>
      </div>

      {/* Cuadrícula de polaroids */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <ReviewPolaroid key={i} review={review} index={i} />
          ))}
        </div>
      </div>

      {/* Sección de calificación */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-20 max-w-2xl px-4 text-center"
      >
        <InteractiveStars />
        <p className="mt-6 font-signature text-3xl text-paper/90 sm:text-4xl">
          ¿Te gustó tu guitarra? Califícanos
        </p>
        <a
          href={reviewUrl.startsWith('TODO') ? googleProfileUrl : reviewUrl}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex items-center gap-2 rounded-sm border border-brass bg-brass/10 px-8 py-3 font-medium text-brass transition-all duration-300 hover:bg-brass hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Calificar en Google
        </a>
      </motion.div>
    </section>
  )
}
