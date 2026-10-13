import { motion } from 'framer-motion'
import Reveal from './Reveal'
import TornEdge from './TornEdge'
import SocialLinks from './SocialLinks'
import QuoteForm from './QuoteForm'
import { WHATSAPP_URL, EMAIL } from '../data/content'

/* Sección de contacto: formulario de cotización → WhatsApp + Email */
export default function Contact() {
  return (
    <section
      id="contacto"
      className="paper-dots relative z-[2] px-6 pb-[70px] pt-[140px] text-ink md:px-[5vw]"
    >
      <TornEdge position="top" />

      <Reveal className="text-center">
        <h2 className="hl mx-auto bg-ink font-serif text-[clamp(38px,5.5vw,72px)] leading-[1.05] text-paper">
          Trae tu guitarra al taller
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="text-center">
        <p className="mt-3 font-hand text-3xl text-wine md:text-4xl">te esperamos</p>
      </Reveal>
      <Reveal delay={0.15} className="text-center">
        <p className="mx-auto mt-4 max-w-[34em] text-[#3d3126]">
          Escríbenos con una foto y cuéntanos qué le pasa. Te respondemos con una cotización.
        </p>
      </Reveal>

      {/* Formulario de cotización */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.2, 0.9, 0.3, 1.2] }}
        className="relative mx-auto mt-[34px] max-w-[680px] bg-cream p-8 text-left shadow-[0_14px_30px_rgba(40,25,10,0.28)]"
      >
        <span
          className="tape-bit"
          style={{ width: 90, height: 26, transform: 'rotate(2deg)' }}
          aria-hidden
        />
        <QuoteForm />
      </motion.div>

      {/* Acciones directas */}
      <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          className="clip-notch inline-block bg-brass px-7 py-3.5 text-lg font-semibold text-ink transition-all duration-200 hover:-rotate-1 hover:scale-105 hover:bg-brass-light"
        >
          Escribir por WhatsApp
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="clip-notch inline-block bg-ink px-7 py-3.5 text-lg font-semibold text-paper transition-all duration-200 hover:-rotate-1 hover:scale-105 hover:bg-walnut"
        >
          Enviar correo
        </a>
      </Reveal>

      {/* Datos del taller */}
      <Reveal delay={0.15} className="mt-11 flex flex-wrap justify-center gap-10 text-center text-base">
        <div>
          <b className="block font-serif text-2xl font-normal">Taller</b>
          Lima, Perú
        </div>
        <div>
          <b className="block font-serif text-2xl font-normal">Horario</b>
          Lunes a sábado, previa cita
        </div>
        <div>
          <b className="block font-serif text-2xl font-normal">Redes</b>
          @tebaguitars
        </div>
      </Reveal>

      <div className="mt-9">
        <SocialLinks />
      </div>
    </section>
  )
}
