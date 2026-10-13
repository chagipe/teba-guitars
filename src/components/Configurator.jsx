import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, RotateCcw } from 'lucide-react'
import GuitarAnatomy from './GuitarAnatomy'
import { WOODS, FINISHES, PICKUP_COLORS, FRET_TYPES, DEFAULT_CONFIG } from '../data/configurator'
import { WHATSAPP_NUMBER } from '../data/content'
import { useStringSound } from '../hooks/useStringSound'

/* Configurador de guitarra a medida con el modelo 3D */
export default function Configurator() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const { enabled, toggle, playString } = useStringSound()

  const updateConfig = useCallback(
    (key, value) => {
      setConfig((c) => ({ ...c, [key]: value }))
      // Sonido de cuerda al cambiar opción
      const freqs = { wood: 329.63, finish: 392, pickupColor: 440, fretType: 493.88 }
      playString(freqs[key] || 329.63)
    },
    [playString]
  )

  const handleSubmit = () => {
    const wood = WOODS.find((w) => w.id === config.wood)
    const finish = FINISHES.find((f) => f.id === config.finish)
    const pickup = PICKUP_COLORS.find((p) => p.id === config.pickupColor)
    const fret = FRET_TYPES.find((f) => f.id === config.fretType)

    const message = `Hola Teba Guitars, quiero una guitarra a medida:\n\nMadera del cuerpo: ${wood.name}\nAcabado: ${finish.name}\nColor de pastillas: ${pickup.name}\nTipo de trastes: ${fret.name}\n\n¿Me cuentan más?`
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener'
    )
  }

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG)
  }

  return (
    <section id="configurador" className="relative py-24">
      <div className="mx-auto mb-16 max-w-3xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl text-paper sm:text-5xl"
        >
          Diseña tu guitarra a medida
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-4 h-0.5 w-32 bg-brass" />
        <p className="mt-6 text-paper/70">
          Elige madera, acabado, pastillas y trastes. El modelo 3D se actualiza en vivo.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Visor 3D */}
          <div className="relative">
            <GuitarAnatomy />
          </div>

          {/* Panel de configuración */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Madera */}
            <div>
              <h3 className="mb-3 font-display text-lg text-paper">Madera del cuerpo</h3>
              <div className="grid grid-cols-2 gap-2">
                {WOODS.map((wood) => (
                  <button
                    key={wood.id}
                    onClick={() => updateConfig('wood', wood.id)}
                    className={`cursor-pointer rounded-sm border px-3 py-2.5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
                      config.wood === wood.id
                        ? 'border-brass bg-brass/15 text-brass'
                        : 'border-paper/20 text-paper/70 hover:border-paper/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-4 w-4 rounded-full border border-paper/20"
                        style={{ backgroundColor: `#${wood.color.toString(16).padStart(6, '0')}` }}
                        aria-hidden
                      />
                      <span className="text-sm font-medium">{wood.name}</span>
                    </div>
                    <p className="mt-1 text-xs text-paper/50">{wood.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Acabado */}
            <div>
              <h3 className="mb-3 font-display text-lg text-paper">Acabado</h3>
              <div className="grid grid-cols-3 gap-2">
                {FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => updateConfig('finish', finish.id)}
                    className={`cursor-pointer rounded-sm border px-3 py-2.5 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
                      config.finish === finish.id
                        ? 'border-brass bg-brass/15 text-brass'
                        : 'border-paper/20 text-paper/70 hover:border-paper/40'
                    }`}
                  >
                    <span className="text-sm font-medium">{finish.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color de pastillas */}
            <div>
              <h3 className="mb-3 font-display text-lg text-paper">Color de pastillas</h3>
              <div className="flex gap-3">
                {PICKUP_COLORS.map((pickup) => (
                  <button
                    key={pickup.id}
                    onClick={() => updateConfig('pickupColor', pickup.id)}
                    aria-label={pickup.name}
                    className={`h-10 w-10 cursor-pointer rounded-full border-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
                      config.pickupColor === pickup.id
                        ? 'scale-110 border-brass'
                        : 'border-paper/20 hover:border-paper/40'
                    }`}
                    style={{ backgroundColor: `#${pickup.color.toString(16).padStart(6, '0')}` }}
                  />
                ))}
              </div>
            </div>

            {/* Tipo de trastes */}
            <div>
              <h3 className="mb-3 font-display text-lg text-paper">Tipo de trastes</h3>
              <div className="space-y-2">
                {FRET_TYPES.map((fret) => (
                  <button
                    key={fret.id}
                    onClick={() => updateConfig('fretType', fret.id)}
                    className={`w-full cursor-pointer rounded-sm border px-4 py-2.5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
                      config.fretType === fret.id
                        ? 'border-brass bg-brass/15 text-brass'
                        : 'border-paper/20 text-paper/70 hover:border-paper/40'
                    }`}
                  >
                    <span className="text-sm font-medium">{fret.name}</span>
                    <span className="ml-2 text-xs text-paper/50">{fret.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resumen */}
            <div className="rounded-sm border border-brass/30 bg-brass/5 p-4">
              <h3 className="mb-2 font-display text-sm tracking-wider text-brass uppercase">
                Tu configuración
              </h3>
              <ul className="space-y-1 text-sm text-paper/80">
                <li>Madera: {WOODS.find((w) => w.id === config.wood)?.name}</li>
                <li>Acabado: {FINISHES.find((f) => f.id === config.finish)?.name}</li>
                <li>Pastillas: {PICKUP_COLORS.find((p) => p.id === config.pickupColor)?.name}</li>
                <li>Trastes: {FRET_TYPES.find((f) => f.id === config.fretType)?.name}</li>
              </ul>
            </div>

            {/* Acciones */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border border-brass bg-brass/10 px-4 py-3 font-medium text-brass transition-all duration-300 hover:bg-brass hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
              >
                <Send className="h-4 w-4" aria-hidden />
                Enviar por WhatsApp
              </button>
              <button
                onClick={handleReset}
                aria-label="Restablecer configuración"
                className="cursor-pointer rounded-sm border border-paper/20 px-4 py-3 text-paper/60 transition-all duration-200 hover:border-paper/40 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {/* Toggle de sonido */}
            <button
              onClick={toggle}
              className="w-full cursor-pointer rounded-sm border border-paper/10 px-4 py-2 text-sm text-paper/50 transition-all duration-200 hover:border-paper/20 hover:text-paper/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              {enabled ? '🔊 Sonido activado' : '🔇 Sonido desactivado (activar)'}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
