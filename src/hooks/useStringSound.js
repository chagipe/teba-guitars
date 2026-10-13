import { useRef, useCallback, useState } from 'react'

/* Sonido corto de cuerda con Web Audio API — apagado por defecto */
export function useStringSound() {
  const ctxRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playString = useCallback(
    (frequency = 329.63) => {
      if (!enabled) return

      try {
        const ctx = getContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(frequency, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(frequency * 0.98, ctx.currentTime + 0.3)

        gain.gain.setValueAtTime(0.15, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.4)
      } catch {
        // Audio no disponible
      }
    },
    [enabled, getContext]
  )

  const toggle = useCallback(() => {
    setEnabled((e) => !e)
  }, [])

  return { enabled, toggle, playString }
}
