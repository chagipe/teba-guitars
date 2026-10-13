import { useTornEdge } from '../hooks/useTornEdges'

/* Borde de papel rasgado (rim + cara) para secciones .paper */
export default function TornEdge({ position = 'top', offset = 0 }) {
  const { rim, face } = useTornEdge()
  const key = position === 'top' ? 't' : 'b'
  return (
    <>
      <div aria-hidden className={`tear rim ${key}`} style={{ clipPath: rim[key] }} />
      <div aria-hidden className={`tear face ${key}`} style={{ clipPath: face[key] }} />
    </>
  )
}
