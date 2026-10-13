import { useEffect, useRef } from 'react'
import { TAPE_ITEMS } from '../data/content'

/* Cinta marquee: acelera con la velocidad de scroll */
export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const anim = track?.getAnimations?.()[0]
    if (!anim) return
    let sv = 0
    let lastY = window.scrollY
    let raf = 0

    const onScroll = () => {
      sv = Math.max(sv, Math.abs(window.scrollY - lastY))
      lastY = window.scrollY
    }
    const tick = () => {
      anim.playbackRate += (1 + Math.min(sv, 60) * 0.35 - anim.playbackRate) * 0.1
      sv *= 0.9
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const items = [...TAPE_ITEMS, ...TAPE_ITEMS, ...TAPE_ITEMS, ...TAPE_ITEMS]

  return (
    <div
      aria-hidden
      className="relative z-[3] -mx-2 -my-5 rotate-[-1.2deg] overflow-hidden whitespace-nowrap bg-brass py-3 text-ink shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
    >
      <div ref={trackRef} className="tape-track font-serif text-2xl">
        {[0, 1].map((half) => (
          <span key={half} className="pr-8">
            {items.map((item, i) => (
              <span key={i} className="pr-8">
                {item} ·&nbsp;
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
