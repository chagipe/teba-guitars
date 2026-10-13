import { motion } from 'framer-motion'
import processData from '../data/process.json'

/* Polaroid numerado con línea tipo cuerda */
function ProcessStep({ step, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
      className="relative flex flex-col items-center"
    >
      {/* Polaroid */}
      <div className="relative w-full max-w-[280px] bg-paper p-5 pt-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="tape-bit" />

        {/* Número */}
        <div className="absolute -top-4 -left-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brass bg-ink font-display text-lg text-brass shadow-lg">
          {step.number}
        </div>

        <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          {step.description}
        </p>
      </div>

      {/* Línea tipo cuerda */}
      {!isLast && (
        <div className="relative mt-2 h-16 w-0.5">
          <svg
            width="2"
            height="64"
            className="absolute left-1/2 -translate-x-1/2"
            aria-hidden
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="64"
              stroke="#c9a45c"
              strokeWidth="2"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          </svg>
          {/* Nudo */}
          <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brass/60" />
        </div>
      )}
    </motion.div>
  )
}

export default function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden py-24">
      <div className="mx-auto mb-16 max-w-3xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl text-paper sm:text-5xl"
        >
          Cómo trabajamos
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-4 h-0.5 w-32 bg-brass" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processData.steps.map((step, i) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={i}
              isLast={i === processData.steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
