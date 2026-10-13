import {
  SlidersHorizontal,
  Wrench,
  AudioLines,
  Ruler,
  Sparkles,
  Guitar,
  MessageCircle,
} from 'lucide-react'
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  YoutubeIcon,
} from '../components/BrandIcons'

export const WHATSAPP_URL =
  'https://wa.me/51994266871?text=Hola%20Teba%20Guitars%2C%20quiero%20consultar%20por%20mi%20instrumento.'
export const WHATSAPP_NUMBER = '51944266871'
export const EMAIL = 'hola@tebaguitars.pe'

export const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Anatomía', href: '#guitarra' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Contacto', href: '#contacto' },
]

export const HERO_CHIPS = ['Calibración', 'Reparación', 'Guitarras a medida']

export const TAPE_ITEMS = [
  'Calibración',
  'Trastes',
  'Electrónica',
  'Restauración',
  'Guitarras a medida',
]

export const POLAROIDS = [
  {
    cap: 'Taller abierto',
    depth: 20,
    rotate: -6,
    pos: 'left-[2%] top-[4%] w-[min(310px,48%)]',
    bg: 'from-teal to-[#14201f]',
    delay: 1.3,
    art: 'soundhole',
  },
  {
    cap: 'Cada detalle cuenta',
    depth: -30,
    rotate: 5,
    pos: 'right-0 top-[20%] w-[min(290px,45%)]',
    bg: 'from-wine to-[#2a1212]',
    delay: 1.55,
    art: 'target',
  },
  {
    cap: 'Mástil a punto',
    depth: 40,
    rotate: -2,
    pos: 'left-[20%] bottom-0 w-[min(270px,42%)]',
    bg: 'from-[#8a6a30] to-[#3a2a12]',
    delay: 1.8,
    art: 'fretboard',
  },
]

export const SERVICES = [
  {
    icon: SlidersHorizontal,
    title: 'Calibración y setup',
    text: 'Altura de cuerdas, alma del mástil, intonación y cuerdas nuevas.',
  },
  {
    icon: Wrench,
    title: 'Reparación',
    text: 'Mástiles, tapas, fisuras, clavijeros y puentes que vuelven a trabajar bien.',
  },
  {
    icon: AudioLines,
    title: 'Electrónica y pastillas',
    text: 'Cableado, potenciómetros, jacks y cambio de pastillas.',
  },
  {
    icon: Ruler,
    title: 'Trastes y mástil',
    text: 'Nivelado, coronado y cambio de trastes para un toque limpio.',
  },
  {
    icon: Sparkles,
    title: 'Restauración',
    text: 'Acabados, retoques y recuperación de guitarras con historia.',
  },
  {
    icon: Guitar,
    title: 'Guitarras a medida',
    text: 'Diseñamos y construimos tu guitarra: maderas, forma y detalles a tu gusto.',
  },
]

export const INSTRUMENTS = ['Guitarra eléctrica', 'Guitarra acústica', 'Bajo', 'Otro']

export const SERVICE_OPTIONS = SERVICES.map((s) => s.title)

/* Piezas del visor 3D: textos + coordenadas de cámara (x, y, z) */
export const PARTS = {
  clavijero: {
    n: 'Clavijero y clavijas',
    h: [0, 3.6, 0.12],
    c: [0, 3.55, 0],
    d: 3,
    t: 'Donde se afinan las cuerdas. Aquí se decide qué tan bien la guitarra mantiene la afinación.',
    l: [
      'Clavijas con engranaje de precisión',
      'Cejuela (nut) que guía cada cuerda',
      'Ángulo del clavijero y tensión de cuerda',
    ],
  },
  mastil: {
    n: 'Mástil y diapasón',
    h: [0, 2, 0.14],
    c: [0, 1.9, 0],
    d: 3.6,
    t: 'Define la comodidad al tocar. Su curvatura y el ajuste del alma cambian la sensación en la mano.',
    l: [
      'Alma de acero para ajustar la curvatura',
      'Trastes pulidos y nivelados',
      'Marcadores en los trastes 3, 5, 7, 9 y 12',
    ],
  },
  pastillas: {
    n: 'Pastillas',
    h: [0, -1.1, 0.27],
    c: [0, -1.1, 0],
    d: 3.2,
    t: 'Convierten la vibración de las cuerdas en señal eléctrica. Su altura y tipo moldean el carácter del sonido.',
    l: [
      'Pastilla de mástil: sonido cálido',
      'Pastilla de puente: sonido más brillante',
      'Altura de cada polo regulable',
    ],
  },
  puente: {
    n: 'Puente y selletas',
    h: [0, -1.95, 0.25],
    c: [0, -1.95, 0],
    d: 3,
    t: 'Sostiene las cuerdas y transmite su energía al cuerpo. De él depende la intonación.',
    l: [
      'Selletas ajustables por cuerda',
      'Altura de acción regulable',
      'Intonación afinada nota por nota',
    ],
  },
  controles: {
    n: 'Controles',
    h: [0.62, -2.3, 0.28],
    c: [0.55, -2.2, 0],
    d: 3,
    t: 'Volumen y tono. Un cableado limpio y buenos potenciómetros se notan en cada giro.',
    l: [
      'Potenciómetros de recorrido suave',
      'Selector de pastillas',
      'Jack de salida bien soldado',
    ],
  },
  cuerpo: {
    n: 'Cuerpo',
    h: [-0.68, -1.7, 0.2],
    c: [0, -1.4, 0],
    d: 5,
    t: 'La madera del cuerpo aporta sustain y resonancia, y el acabado la protege.',
    l: [
      'Madera seleccionada y secada',
      'Cavidades de electrónica trabajadas a mano',
      'Acabado en laca fina',
    ],
  },
}

export const PANEL_HOME = {
  title: 'Elige una pieza',
  text: 'Cada parte influye en el sonido y en la comodidad. Toca un punto de la guitarra o usa los botones.',
}

/* URLs de redes sociales — reemplaza los TODO con los enlaces reales */
export const SOCIAL_URLS = {
  instagram: 'https://www.instagram.com/teba_guitars/',
  facebook: 'TODO_URL_FACEBOOK', // TODO: reemplazar por URL real
  tiktok: 'TODO_URL_TIKTOK', // TODO: reemplazar por URL real
  youtube: 'TODO_URL_YOUTUBE', // TODO: reemplazar por URL real
  whatsapp: 'https://wa.me/51994266871',
}

export const SOCIALS = [
  { name: 'Instagram', url: SOCIAL_URLS.instagram, icon: InstagramIcon },
  { name: 'Facebook', url: SOCIAL_URLS.facebook, icon: FacebookIcon },
  { name: 'TikTok', url: SOCIAL_URLS.tiktok, icon: TikTokIcon },
  { name: 'YouTube', url: SOCIAL_URLS.youtube, icon: YoutubeIcon },
  { name: 'WhatsApp', url: SOCIAL_URLS.whatsapp, icon: MessageCircle },
]
