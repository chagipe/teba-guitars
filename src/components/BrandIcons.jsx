/* Iconos de marca (lucide-react ya no incluye brand icons) */

export function InstagramIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z" />
    </svg>
  )
}

export function TikTokIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5c.3 0 .5 0 .8.1V7.6a7 7 0 1 0 6.5 6.9V9c1 .8 2.3 1.3 3.5 1.3V6.9c-2 0-3.5-1.6-3.5-3.9z" />
    </svg>
  )
}

export function YoutubeIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 8.2c-.2-1-1-1.8-2-2C18.3 5.8 12 5.8 12 5.8s-6.3 0-8 .4c-1 .2-1.8 1-2 2C1.7 9.9 1.7 12 1.7 12s0 2.1.3 3.8c.2 1 1 1.8 2 2 1.7.4 8 .4 8 .4s6.3 0 8-.4c1-.2 1.8-1 2-2 .3-1.7.3-3.8.3-3.8s0-2.1-.3-3.8z" />
      <path d="M10 15V9l5.2 3z" fill="#17110e" />
    </svg>
  )
}
