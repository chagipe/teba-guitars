import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { WHATSAPP_NUMBER, EMAIL, INSTRUMENTS, SERVICE_OPTIONS } from '../data/content'

/* Formulario de cotización: WhatsApp + EmailJS/Formspree */
export default function QuoteForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    instrument: '',
    service: '',
    message: '',
    honeypot: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot: si está lleno, es spam
    if (form.honeypot) {
      setStatus('success')
      return
    }

    setStatus('sending')

    // Enviar por WhatsApp
    const waMessage = `Hola Teba Guitars, quiero una cotización:\n\nNombre: ${form.name}\nEmail: ${form.email}\nTeléfono: ${form.phone}\nInstrumento: ${form.instrument}\nServicio: ${form.service}\nMensaje: ${form.message}`
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`

    // Enviar por email (EmailJS o Formspree)
    const emailService = import.meta.env.VITE_EMAIL_SERVICE // 'emailjs' | 'formspree' | null
    const emailSent = await sendEmail(form, emailService)

    if (emailSent) {
      window.open(waUrl, '_blank', 'noopener')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', instrument: '', service: '', message: '', honeypot: '' })
    } else {
      // Si falla el email, solo abrimos WhatsApp
      window.open(waUrl, '_blank', 'noopener')
      setStatus('success')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot oculto */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className="mb-1 block text-sm text-paper/70">
            Nombre *
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper placeholder-paper/30 focus:border-brass focus:outline-none"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="quote-email" className="mb-1 block text-sm text-paper/70">
            Email *
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper placeholder-paper/30 focus:border-brass focus:outline-none"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-phone" className="mb-1 block text-sm text-paper/70">
            Teléfono
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper placeholder-paper/30 focus:border-brass focus:outline-none"
            placeholder="+51 999 999 999"
          />
        </div>
        <div>
          <label htmlFor="quote-instrument" className="mb-1 block text-sm text-paper/70">
            Instrumento *
          </label>
          <select
            id="quote-instrument"
            name="instrument"
            required
            value={form.instrument}
            onChange={handleChange}
            className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper focus:border-brass focus:outline-none"
          >
            <option value="" className="bg-ink">Selecciona...</option>
            {INSTRUMENTS.map((inst) => (
              <option key={inst} value={inst} className="bg-ink">
                {inst}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="quote-service" className="mb-1 block text-sm text-paper/70">
          Servicio *
        </label>
        <select
          id="quote-service"
          name="service"
          required
          value={form.service}
          onChange={handleChange}
          className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper focus:border-brass focus:outline-none"
        >
          <option value="" className="bg-ink">Selecciona...</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-ink">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quote-message" className="mb-1 block text-sm text-paper/70">
          Cuéntanos sobre tu guitarra *
        </label>
        <textarea
          id="quote-message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-sm border border-paper/20 bg-paper/5 px-4 py-2.5 text-paper placeholder-paper/30 focus:border-brass focus:outline-none"
          placeholder="¿Qué le pasa? ¿Qué necesitas?"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-brass bg-brass/10 px-6 py-3.5 font-medium text-brass transition-all duration-300 hover:bg-brass hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden />
            Enviar cotización
          </>
        )}
      </button>

      {/* Estados */}
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-green-400"
          role="status"
        >
          <CheckCircle className="h-4 w-4" aria-hidden />
          ¡Mensaje enviado! Te contactaremos pronto.
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-red-400"
          role="alert"
        >
          <AlertCircle className="h-4 w-4" aria-hidden />
          Hubo un error. Intenta de nuevo o escríbenos por WhatsApp.
        </motion.p>
      )}
    </form>
  )
}

/* Envío de email según el servicio configurado */
async function sendEmail(form, service) {
  if (!service) return false

  try {
    if (service === 'formspree') {
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
      if (!endpoint) return false

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          instrument: form.instrument,
          service: form.service,
          message: form.message,
        }),
      })
      return res.ok
    }

    if (service === 'emailjs') {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) return false

      try {
        // Import dinámico con variable para que Vite no lo resuelva en build
        const moduleName = '@emailjs' + '/browser'
        const emailjs = await import(/* @vite-ignore */ moduleName)
        await emailjs.send(serviceId, templateId, {
          from_name: form.name,
          reply_to: form.email,
          phone: form.phone,
          instrument: form.instrument,
          service: form.service,
          message: form.message,
        })
        return true
      } catch {
        return false
      }
    }

    return false
  } catch {
    return false
  }
}
