import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/content'

/* Barra de navegación fija: se oculta al bajar y reaparece al subir */
export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY && y > 200)
      setScrolled(y > 24)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      animate={{ y: hidden && !open ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-ink/85 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md'
          : 'bg-gradient-to-b from-ink to-transparent'
      }`}
      style={{ paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))' }}
    >
      <div className="flex items-center justify-between px-5 pb-3.5 md:px-[5vw]">
        <a href="#inicio" className="font-serif text-[30px] tracking-wide text-paper no-underline">
          Teba Guitars
        </a>

        {/* Navegación de escritorio */}
        <nav className="hidden items-center gap-[26px] md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-paper/85 no-underline transition-colors duration-200 hover:text-brass"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="clip-notch inline-block bg-brass px-6 py-3 text-base font-semibold text-ink transition-all duration-200 hover:-rotate-1 hover:scale-105 hover:bg-brass-light"
          >
            Cotizar
          </a>
        </nav>

        {/* Botón menú móvil */}
        <button
          className="grid h-11 w-11 place-items-center text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-brass/20 bg-ink/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="py-2.5 text-base font-medium text-paper/90 no-underline hover:text-brass"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="clip-notch mt-2 inline-block bg-brass px-6 py-3 text-center text-base font-semibold text-ink"
              >
                Cotizar
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
