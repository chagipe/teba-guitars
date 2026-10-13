import { useMemo } from 'react'

/* Genera clip-paths de papel rasgado (random walk estable por instancia) */
function makeEdge() {
  const n = 70
  const r = (a, b) => a + Math.random() * (b - a)
  let y = r(20, 40)
  let v = 0
  return [...Array(n + 1)].map((_, i) => {
    v = (v + r(-10, 10)) * 0.78
    y = Math.max(4, Math.min(64, y + v + (Math.random() < 0.1 ? r(-24, 24) : 0)))
    return [((i / n) * 100).toFixed(2) + '%', y.toFixed(1)]
  })
}

function buildClip(edge, pos, offset) {
  const pts = edge.map(([x, y]) => {
    const yy = pos === 't' ? +y + offset : `calc(100% - ${+y + offset}px)`
    return `${x} ${yy}px`
  })
  const corners = pos === 't' ? ['100% 100%', '0 100%'] : ['100% 0', '0 0']
  return `polygon(${pts.concat(corners).join(',')})`
}

/* Devuelve los clip-paths (rim + face) para un borde rasgado */
export function useTornEdge() {
  return useMemo(() => {
    const rim = makeEdge()
    const face = makeEdge()
    return {
      rim: { t: buildClip(rim, 't', 0), b: buildClip(rim, 'b', 0) },
      face: { t: buildClip(face, 't', 8), b: buildClip(face, 'b', 8) },
    }
  }, [])
}
