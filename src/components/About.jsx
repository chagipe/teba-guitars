import { motion } from 'framer-motion'
import aboutData from '../data/about.json'

export default function About() {
  return (
    <section id="sobre" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Foto en marco polaroid */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative bg-paper p-4 pb-16 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
              <div className="tape-bit" />

              {/* Foto del luthier */}
              <div className="aspect-[3/4] overflow-hidden bg-walnut/20">
                {aboutData.photo.startsWith('TODO') ? (
                  <div className="grid h-full place-items-center bg-gradient-to-br from-walnut/40 to-ink/60 p-8 text-center">
                    <div>
                      <svg
                        viewBox="0 0 24 24"
                        className="mx-auto mb-3 h-16 w-16 text-paper/30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        aria-hidden
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <p className="text-sm italic text-paper/40">
                        Foto del luthier — pendiente
                      </p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={aboutData.photo}
                    alt="Foto del luthier de Teba Guitars"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Firma */}
              <p className="mt-4 text-center font-signature text-3xl text-ink/70">
                {aboutData.signature}
              </p>
            </div>
          </motion.div>

          {/* Historia y stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="font-display text-4xl text-paper sm:text-5xl">
              Sobre Teba
            </h2>
            <div className="mt-4 h-0.5 w-32 bg-brass" />

            <p className="mt-6 text-lg leading-relaxed text-paper/80">
              {aboutData.story}
            </p>

            {/* Cifras */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-brass pl-4">
                <p className="font-display text-4xl text-brass">
                  {aboutData.stats.yearsExperience}
                </p>
                <p className="mt-1 text-sm text-paper/60">Años de experiencia</p>
              </div>
              <div className="border-l-2 border-brass pl-4">
                <p className="font-display text-4xl text-brass">
                  {aboutData.stats.guitarsServed}
                </p>
                <p className="mt-1 text-sm text-paper/60">Guitarras atendidas</p>
              </div>
            </div>

            {/* Sello */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: -12 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              className="mt-10 inline-block rounded-sm border-2 border-brass/60 px-4 py-2"
            >
              <span className="font-display text-sm tracking-widest text-brass uppercase">
                Hecho a mano en Lima
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
