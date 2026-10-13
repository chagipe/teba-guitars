# Teba Guitars — Landing Page

Landing page para **Teba Guitars**, luthier en Lima, Perú. Construida con Vite + React, Three.js, Framer Motion y Tailwind CSS 4.

## Requisitos

- Node.js 20+
- npm 10+

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Estructura del proyecto

```
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── og-image.jpg          # TODO: imagen para compartir
│   └── works/                # TODO: imágenes antes/después
├── src/
│   ├── components/           # Componentes React
│   ├── data/                 # Contenido editable (JSON/JS)
│   │   ├── content.js        # Contenido principal
│   │   ├── reviews.json      # Reseñas de Google
│   │   ├── works.json        # Galería antes/después
│   │   ├── process.json      # Pasos del proceso
│   │   ├── faq.json          # Preguntas frecuentes
│   │   ├── about.json        # Sobre Teba
│   │   ├── location.json     # Ubicación y horarios
│   │   ├── packages.json     # Paquetes y precios
│   │   └── configurator.js   # Opciones del configurador
│   ├── hooks/                # Custom hooks
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .eslintrc.json
├── .prettierrc
└── vite.config.js
```

## Editar contenido

Todo el contenido editable está en `src/data/`. **No edites los componentes directamente** para cambiar textos, precios o imágenes.

| Archivo | Qué contiene |
|---|---|
| `content.js` | Textos principales, servicios, enlaces sociales |
| `reviews.json` | Reseñas de Google (reemplazar TODO con reseñas reales) |
| `works.json` | Galería antes/después (URLs de imágenes) |
| `process.json` | Pasos del proceso de trabajo |
| `faq.json` | Preguntas frecuentes |
| `about.json` | Historia y cifras del taller |
| `location.json` | Dirección, horarios y configuración de reserva |
| `packages.json` | Paquetes y precios referenciales |
| `configurator.js` | Opciones del configurador 3D |

### Variables de entorno

Copia `.env.example` como `.env` y completa:

```bash
# Email (opcional) — 'formspree' | 'emailjs' | vacío = solo WhatsApp
VITE_EMAIL_SERVICE=formspree
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/tu-endpoint

# Google Places API (opcional) — reseñas automáticas
VITE_GOOGLE_PLACES_API_KEY=tu-clave
VITE_GOOGLE_PLACE_ID=tu-place-id

# Analítica (opcional) — 'plausible' | 'umami' | vacío = desactivado
VITE_ANALYTICS_PROVIDER=plausible
VITE_ANALYTICS_DOMAIN=tebaguitars.pe

# Cal.com (opcional) — reserva de citas
VITE_CALCOM_URL=
```

## Despliegue

### Vercel
1. Sube el repo a GitHub
2. Importa en [vercel.com](https://vercel.com)
3. Variables de entorno: agrega las de `.env`
4. Deploy automático en cada push a `main`

### Netlify
1. Sube el repo a GitHub
2. Importa en [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Variables de entorno en Site settings → Environment

## TODOs pendientes

- [ ] Reemplazar URLs de Facebook, TikTok y YouTube en `src/data/content.js` (`SOCIAL_URLS`)
- [ ] Reemplazar reseñas en `src/data/reviews.json` con las reales de Google
- [ ] Subir imágenes a `public/works/` y actualizar `src/data/works.json`
- [ ] Agregar foto del luthier en `src/data/about.json`
- [ ] Completar dirección y horarios en `src/data/location.json`
- [ ] Definir precios reales en `src/data/packages.json`
- [ ] Crear imagen Open Graph (`public/og-image.jpg`, 1200×630)
- [ ] Actualizar JSON-LD en `index.html` con AggregateRating real
- [ ] Configurar email (Formspree o EmailJS) en `.env`
- [ ] Configurar analítica (Plausible o Umami) en `.env`

## Licencia

Proyecto privado — Teba Guitars © 2026
