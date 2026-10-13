import { motion } from 'framer-motion'
import { SOCIALS } from '../data/content'

/* Redes sociales: versión completa con etiqueta o mini (círculos) */
const isValidUrl = (url) => url && !url.startsWith('TODO')

export default function SocialLinks({ mini = false }) {
  const socials = SOCIALS.filter((s) => isValidUrl(s.url))

  if (mini) {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {socials.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener"
              aria-label={s.name}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -4, rotate: -6, backgroundColor: '#c9a45c', color: '#17110e' }}
              className="grid h-11 w-11 place-items-center rounded-full border border-brass/50 text-paper"
            >
              <Icon size={20} aria-hidden />
            </motion.a>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {socials.map((s, i) => {
        const Icon = s.icon
        return (
          <motion.a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            whileHover={{ y: -5, rotate: -2, backgroundColor: '#c9a45c', color: '#17110e' }}
            className="clip-notch inline-flex items-center gap-2.5 border border-brass/60 bg-walnut/90 px-5 py-2.5 text-base font-medium text-paper shadow-[0_6px_18px_rgba(40,25,10,0.25)]"
          >
            <Icon size={20} aria-hidden />
            <span>{s.name}</span>
          </motion.a>
        )
      })}
    </div>
  )
}
