import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { HERO_CHIPS, POLAROIDS } from '../data/content'

/* Arte SVG de cada polaroid (heredado del HTML original) */
function PolaroidArt({ kind, stroke }) {
  const common = {
    viewBox: '0 0 100 100',
    className: 'absolute inset-0 h-full w-full',
    'aria-hidden': true,
  }
  if (kind === 'soundhole')
    return (
      <svg {...common}>
        <g fill="none" stroke={stroke} strokeWidth="1.6">
          <path d="M50 8v52M44 8h12M40 70c-8-6-4-14 4-16h12c8 2 12 10 4 16 10 8 2 24-10 24s-20-16-10-24z" />
        </g>
      </svg>
    )
  if (kind === 'target')
    return (
      <svg {...common}>
        <g fill="none" stroke={stroke} strokeWidth="1.6">
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="10" />
          <path d="M50 20V4M20 50H4" />
        </g>
      </svg>
    )
  return (
    <svg {...common}>
      <g stroke={stroke} strokeWidth="1.6">
        <path d="M10 30h80M10 42h80M10 54h80M10 66h80M10 78h80" fill="none" />
        <path d="M30 20v70M52 20v70M70 20v70" stroke="#c9a45c" />
      </g>
    </svg>
  )
}

const TITLE_LINES = ['Teba', 'Guitars']

/* Hero: título animado letra a letra + polaroids con parallax */
export default function Hero() {
  const boardRef = useRef(null)

  /* Parallax del tablero de polaroids según el puntero */
  useEffect(() => {
    const board = boardRef.current
    if (!board || !window.matchMedia('(pointer:fine)').matches) return
    let tx = 0
    let ty = 0
    let px = 0
    let py = 0
    let raf = 0

    const move = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      px += (tx - px) * 0.06
      py += (ty - py) * 0.06
      board.style.setProperty('--mx', px.toFixed(3))
      board.style.setProperty('--my', py.toFixed(3))
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  let letterIndex = 0

  return (
    <section
      id="inicio"
      className="relative grid min-h-screen items-center gap-[4vw] overflow-hidden px-6 pb-16 pt-32 md:px-[5vw] lg:grid-cols-[1.05fr_1fr]"
      style={{
        background:
          'radial-gradient(900px 500px at 75% 40%, #3a2418 0, transparent 70%), #17110e',
      }}
    >
      {/* Columna de texto */}
      <div>
        <h1 className="font-serif text-[clamp(64px,11vw,160px)] leading-[1.02] tracking-tight text-paper">
          {TITLE_LINES.map((word, wi) => (
            <span key={word} className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom" aria-hidden={wi === 0 ? undefined : true}>
              {[...word].map((c, ci) => (
                <motion.span
                  key={ci}
                  aria-hidden
                  className="inline-block"
                  initial={{ y: '115%', rotate: 10, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 1.35 + (letterIndex++) * 0.07,
                    ease: [0.2, 0.9, 0.2, 1],
                  }}
                >
                  {c}
                </motion.span>
              ))}
            </span>
          ))}
          <span className="sr-only">Teba Guitars</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.15, duration: 0.8 }}
          className="mt-2 font-hand text-3xl text-brass md:text-4xl"
        >
          el sonido empieza en la madera
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="mt-[22px] max-w-[30em] text-xl text-paper/90"
        >
          Luthería hecha a mano en Lima. Calibramos, reparamos y construimos guitarras para que
          suenen y se sientan como las imaginaste.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.45, duration: 0.8 }}
        >
          <a
            href="#contacto"
            className="clip-notch group mt-8 inline-flex items-center gap-2 bg-brass px-7 py-3.5 text-lg font-semibold text-ink transition-all duration-200 hover:-rotate-1 hover:scale-105 hover:bg-brass-light"
          >
            Cotiza tu guitarra
            <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.65, duration: 0.8 }}
          className="mt-[34px] flex flex-wrap gap-2.5"
        >
          {HERO_CHIPS.map((chip) => (
            <span
              key={chip}
              className="border border-brass px-3.5 py-1 text-sm text-brass"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Tablero de polaroids */}
      <div
        ref={boardRef}
        aria-hidden
        className="relative h-[520px] lg:h-[min(78vh,620px)]"
      >
        {POLAROIDS.map((p) => (
          <motion.div
            key={p.cap}
            initial={{ y: '-130vh', opacity: 0, rotate: p.rotate * 6 }}
            animate={{ y: 0, opacity: 1, rotate: p.rotate }}
            transition={{ type: 'spring', stiffness: 60, damping: 14, delay: p.delay }}
            whileHover={{ rotate: 0, scale: 1.06, y: -6, zIndex: 5 }}
            className={`absolute bg-paper p-3 pb-12 text-ink shadow-[0_18px_40px_rgba(0,0,0,0.55)] ${p.pos}`}
            style={{
              '--d': p.depth,
              translate: 'calc(var(--mx, 0) * var(--d, 0) * 1px) calc(var(--my, 0) * var(--d, 0) * 1px)',
            }}
            data-cursor
          >
            <span className="tape-bit" />
            <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${p.bg}`}>
              <PolaroidArt kind={p.art} stroke={p.art === 'soundhole' ? '#c9a45c' : '#ece3d0'} />
            </div>
            <p className="absolute inset-x-0 bottom-1 text-center font-hand text-[42px] leading-none">
              {p.cap}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
