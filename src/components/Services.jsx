import { motion } from 'framer-motion'
import Reveal from './Reveal'
import TornEdge from './TornEdge'
import { SERVICES } from '../data/content'

const PH_BG = ['bg-walnut', 'bg-teal', 'bg-wine']
const ROTATIONS = [-1.4, 1.2]

/* Catálogo de servicios del taller — banner compacto en una sola fila */
export default function Services() {
  return (
    <section
      id="servicios"
      className="paper-dots relative z-[2] px-4 pb-28 pt-24 text-ink md:px-[5vw]"
    >
      <TornEdge position="top" />
      <TornEdge position="bottom" />

      <Reveal>
        <h2 className="hl bg-ink font-serif text-[clamp(28px,4vw,44px)] leading-[1.05] text-paper">
          Qué hacemos en el taller
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-2 font-hand text-2xl text-wine md:text-3xl">
          cada guitarra tiene su historia
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-3 max-w-[34em] text-[15px] leading-snug text-[#3d3126]">
          Revisamos tu instrumento con calma, te explicamos qué necesita y te lo devolvemos listo
          para tocar.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-6">
        {SERVICES.map((svc, i) => {
          const Icon = svc.icon
          return (
            <motion.article
              key={svc.title}
              initial={{ opacity: 0, y: 50, rotate: 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: ROTATIONS[i % 2] }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.2, 0.9, 0.3, 1.2] }}
              whileHover={{ rotate: 0, y: -6, transition: { duration: 0.25 } }}
              className="bg-cream p-2 pb-3 shadow-[0_8px_20px_rgba(40,25,10,0.22)]"
              data-cursor
            >
              <div
                className={`mb-2 grid aspect-square w-full place-items-center text-brass ${PH_BG[i % 3]}`}
              >
                <Icon size={34} strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="px-1 font-serif text-[15px] leading-tight">{svc.title}</h3>
              <p className="px-1 pt-0.5 text-[11.5px] font-light leading-snug text-[#3d3126]">
                {svc.text}
              </p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
