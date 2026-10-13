import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar } from 'lucide-react'
import locationData from '../data/location.json'
import { WHATSAPP_NUMBER } from '../data/content'

/* Formulario de reserva de cita por WhatsApp */
function BookingForm() {
  const [form, setForm] = useState({ name: '', date: '', time: '', notes: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    const message = `Hola Teba Guitars, quiero reservar una cita:\n\nNombre: ${form.name}\nFecha preferida: ${form.date}\nHora preferida: ${form.time}\nNotas: ${form.notes || 'Ninguna'}`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    setTimeout(() => {
      window.open(url, '_blank', 'noopener')
      setStatus('sent')
      setForm({ name: '', date: '', time: '', notes: '' })
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="booking-name" className="mb-1 block text-sm text-paper/70">
          Nombre
        </label>
        <input
          id="booking-name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper placeholder-paper/30 focus:border-brass focus:outline-none"
          placeholder="Tu nombre"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-date" className="mb-1 block text-sm text-paper/70">
            Fecha preferida
          </label>
          <input
            id="booking-date"
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper focus:border-brass focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="booking-time" className="mb-1 block text-sm text-paper/70">
            Hora preferida
          </label>
          <input
            id="booking-time"
            type="time"
            required
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper focus:border-brass focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-notes" className="mb-1 block text-sm text-paper/70">
          Notas (opcional)
        </label>
        <textarea
          id="booking-notes"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper placeholder-paper/30 focus:border-brass focus:outline-none"
          placeholder="¿Algo que debamos saber?"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full cursor-pointer rounded-sm border border-brass bg-brass/10 px-6 py-3 font-medium text-brass transition-all duration-300 hover:bg-brass hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
      >
        {status === 'sending'
          ? 'Abriendo WhatsApp...'
          : status === 'sent'
            ? '¡Mensaje enviado!'
            : 'Reservar cita por WhatsApp'}
      </button>
    </form>
  )
}

export default function Location() {
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <section id="ubicacion" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl text-paper sm:text-5xl">
            Ubicación y horarios
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mt-4 h-0.5 w-32 bg-brass" />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-paper/10">
              {!mapLoaded && (
                <div className="absolute inset-0 grid place-items-center bg-walnut/20">
                  <button
                    onClick={() => setMapLoaded(true)}
                    className="cursor-pointer rounded-sm border border-brass bg-ink/80 px-6 py-3 text-brass transition-colors hover:bg-brass hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
                  >
                    Cargar mapa
                  </button>
                </div>
              )}
              {mapLoaded && locationData.mapsEmbedUrl.startsWith('TODO') ? (
                <div className="grid h-full place-items-center bg-walnut/20 p-8 text-center">
                  <div>
                    <MapPin className="mx-auto mb-3 h-12 w-12 text-brass/50" aria-hidden />
                    <p className="text-paper/50">
                      Mapa pendiente — agrega la URL en location.json
                    </p>
                  </div>
                </div>
              ) : (
                mapLoaded && (
                  <iframe
                    src={locationData.mapsEmbedUrl}
                    title="Mapa de ubicación de Teba Guitars"
                    className="h-full w-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                )
              )}
            </div>

            {/* Dirección */}
            <div className="mt-4 flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden />
              <div>
                <p className="font-medium text-paper">{locationData.address}</p>
                <p className="text-sm text-paper/60">
                  {locationData.district}, {locationData.city}, {locationData.country}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Horarios + Reserva */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Horarios */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-xl text-paper">
                <Clock className="h-5 w-5 text-brass" aria-hidden />
                Horarios
              </h3>
              <div className="space-y-2">
                {locationData.hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-paper/10 pb-2"
                  >
                    <span className="text-paper/70">{h.days}</span>
                    <span className="font-medium text-paper">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reserva */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-xl text-paper">
                <Calendar className="h-5 w-5 text-brass" aria-hidden />
                Reserva tu cita
              </h3>
              <BookingForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
