import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import packagesData from '../data/packages.json'
import { WHATSAPP_NUMBER } from '../data/content'

function PackageCard({ pkg, index }) {
  const isPopular = pkg.popular

  const handleSelect = () => {
    const message = `Hola Teba Guitars, me interesa el paquete "${pkg.name}". ¿Me cuentas más?`
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener'
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ scale: 1.03, rotate: 0, y: -8 }}
      className={`relative bg-paper p-6 pt-8 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${
        isPopular ? 'ring-2 ring-brass' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-brass px-4 py-1 font-display text-xs tracking-wider text-ink uppercase">
          Más popular
        </div>
      )}
      <div className="tape-bit" />

      <h3 className="font-display text-2xl text-ink">{pkg.name}</h3>

      <div className="mt-4 mb-5">
        <span className="font-display text-4xl text-ink">{pkg.price}</span>
        {pkg.price.startsWith('TODO') && (
          <span className="ml-1 text-sm text-ink/50">{pkg.currency}</span>
        )}
      </div>

      <p className="mb-5 text-sm leading-relaxed text-ink/60">{pkg.description}</p>

      <ul className="mb-6 space-y-2.5">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
            <Check size={16} className="mt-0.5 shrink-0 text-teal" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSelect}
        className="w-full cursor-pointer rounded-sm border border-teal/30 bg-teal/5 px-4 py-2.5 font-medium text-teal transition-all duration-300 hover:bg-teal hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
      >
        Consultar por WhatsApp
      </button>
    </motion.article>
  )
}

export default function Packages() {
  return (
    <section id="paquetes" className="relative py-24">
      <div className="mx-auto mb-16 max-w-3xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl text-paper sm:text-5xl"
        >
          Paquetes y precios referenciales
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-4 h-0.5 w-32 bg-brass" />
        <p className="mt-6 text-paper/60">
          Precios de referencia. El costo final depende del estado de tu
          instrumento y lo cotizamos antes de empezar.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {packagesData.packages.map((pkg, i) => (
          <PackageCard key={pkg.id} pkg={pkg} index={i} />
        ))}
      </div>
    </section>
  )
}
