import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Rotate3d, MousePointerClick } from 'lucide-react'
import * as THREE from 'three'
import Reveal from './Reveal'
import { PARTS, PANEL_HOME } from '../data/content'

const GY = -0.5 // altura del grupo de la guitarra

/* ---------- Construcción de la guitarra 3D (portada del script original) ---------- */
function buildGuitarScene(stage, setFocus) {
  const T = THREE
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  stage.appendChild(renderer.domElement)

  const scene = new T.Scene()
  const camera = new T.PerspectiveCamera(36, 1, 0.1, 60)

  scene.add(new T.AmbientLight(0xffe8cc, 0.55))
  const key = new T.DirectionalLight(0xfff0d8, 1.1)
  key.position.set(3, 4, 6)
  scene.add(key)
  const rim = new T.DirectionalLight(0x6fa8a0, 0.6)
  rim.position.set(-5, 2, -3)
  scene.add(rim)

  const G = new T.Group()
  scene.add(G)

  const M = (c, r = 0.5, m = 0) =>
    new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, transparent: true })
  const add = (g, geo, mat, x = 0, y = 0, z = 0) => {
    const mesh = new T.Mesh(geo, mat)
    mesh.position.set(x, y, z)
    g.add(mesh)
    return mesh
  }
  const grp = {}
  for (const k in PARTS) {
    grp[k] = new T.Group()
    G.add(grp[k])
  }
  const Bx = (w, h, d) => new T.BoxGeometry(w, h, d)
  const Cy = (r, h, s = 20) => new T.CylinderGeometry(r, r, h, s)

  // Cuerpo
  const pts = [
    [0, 0.1], [0.7, -0.05], [0.95, -0.6], [0.75, -1.1], [0.7, -1.4], [1, -1.9],
    [0.85, -2.55], [0, -2.8], [-0.85, -2.55], [-1, -1.9], [-0.7, -1.4], [-0.75, -1.1],
    [-0.95, -0.6], [-0.7, -0.05],
  ].map((p) => new T.Vector2(...p))
  const shape = new T.Shape()
  shape.moveTo(pts[0].x, pts[0].y)
  shape.splineThru(pts.slice(1))
  shape.closePath()
  const bodyGeo = new T.ExtrudeGeometry(shape, {
    depth: 0.25, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.05, bevelSegments: 3, curveSegments: 24,
  })
  bodyGeo.translate(0, 0, -0.125)
  add(grp.cuerpo, bodyGeo, M(0x7a3b1f, 0.35, 0.05))

  // Mástil y diapasón
  add(grp.mastil, Bx(0.34, 3.4, 0.12), M(0xd8b57c, 0.6), 0, 1.5, 0)
  add(grp.mastil, Bx(0.34, 3.9, 0.03), M(0x2a1a12, 0.5), 0, 1.25, 0.075)
  for (let n = 0; n <= 14; n++) {
    const y = 3.2 - 6.9 * (1 - Math.pow(2, -n / 12))
    add(grp.mastil, Bx(0.34, n ? 0.018 : 0.05, 0.025), M(n ? 0xe2dcc8 : 0xf1ecd9, 0.25, 0.8), 0, y, 0.1)
  }
  ;[3, 5, 7, 9, 12].forEach((n) => {
    const y = 3.2 - 6.9 * (1 - Math.pow(2, -(n - 0.5) / 12))
    const xs = n === 12 ? [-0.07, 0.07] : [0]
    xs.forEach((x) => {
      const dot = add(grp.mastil, Cy(0.025, 0.01), M(0xf1ecd9, 0.4), x, y, 0.095)
      dot.rotation.x = Math.PI / 2
    })
  })

  // Clavijero
  add(grp.clavijero, Bx(0.52, 0.85, 0.1), M(0xd8b57c, 0.6), 0, 3.62, 0)
  add(grp.clavijero, Bx(0.36, 0.05, 0.06), M(0xf1ecd9, 0.4), 0, 3.2, 0.09)
  ;[3.38, 3.62, 3.86].forEach((y) =>
    [-1, 1].forEach((s) => {
      const peg = add(grp.clavijero, Cy(0.03, 0.2), M(0xb9b6ab, 0.2, 0.9), s * 0.33, y, 0)
      peg.rotation.z = Math.PI / 2
      add(grp.clavijero, Bx(0.06, 0.14, 0.04), M(0xc9a45c, 0.3, 0.8), s * 0.46, y, 0)
    }),
  )

  // Pastillas
  ;[-0.85, -1.35].forEach((y) => {
    add(grp.pastillas, Bx(0.82, 0.3, 0.1), M(0x14100e, 0.4), 0, y, 0.17)
    for (let i = 0; i < 6; i++) {
      const pole = add(grp.pastillas, Cy(0.022, 0.04, 10), M(0xc9a45c, 0.3, 0.8), -0.3 + i * 0.12, y, 0.23)
      pole.rotation.x = Math.PI / 2
    }
  })

  // Puente y selletas
  add(grp.puente, Bx(0.78, 0.26, 0.06), M(0xb9b6ab, 0.25, 0.9), 0, -1.95, 0.15)
  for (let i = 0; i < 6; i++)
    add(grp.puente, Bx(0.07, 0.07, 0.07), M(0xe2dcc8, 0.2, 0.9), -0.3 + i * 0.12, -1.95 + (i % 2 ? 0.03 : -0.03), 0.2)

  // Controles
  ;[[0.5, -2.3], [0.8, -2.1]].forEach((p) => {
    const knob = add(grp.controles, Cy(0.1, 0.12, 24), M(0x14100e, 0.3, 0.2), p[0], p[1], 0.2)
    knob.rotation.x = Math.PI / 2
  })
  add(grp.controles, Bx(0.07, 0.16, 0.06), M(0xb9b6ab, 0.3, 0.9), -0.6, -1.5, 0.17)

  // Cuerdas
  for (let i = 0; i < 6; i++) {
    const x = -0.14 + i * 0.056
    add(G, Cy(0.006 + (5 - i) * 0.0016, 5.15, 6), M(0xd9d4c4, 0.2, 0.9), x, (3.2 - 1.95) / 2, 0.15)
  }

  // Hotspots interactivos
  const hotspots = []
  for (const k in PARTS) {
    const marker = new T.Mesh(
      new T.SphereGeometry(0.09, 16, 16),
      new T.MeshBasicMaterial({ color: 0xc9a45c, depthTest: false }),
    )
    marker.position.set(...PARTS[k].h)
    marker.renderOrder = 10
    const ring = new T.Mesh(
      new T.RingGeometry(0.12, 0.15, 32),
      new T.MeshBasicMaterial({ color: 0xc9a45c, transparent: true, depthTest: false, side: T.DoubleSide }),
    )
    ring.renderOrder = 9
    marker.add(ring)
    marker.userData = { k, ring }
    G.add(marker)
    hotspots.push(marker)
  }
  G.position.y = GY

  // Estado de cámara
  const HOME = { p: new T.Vector3(0, 0.3, 11.5), t: new T.Vector3(0, 0.3, 0) }
  let tp = HOME.p.clone()
  let tt = HOME.t.clone()
  let cp = tp.clone()
  let ct = tt.clone()
  let rot = 0
  let drag = 0
  let focusKey = null

  const setCamFocus = (k) => {
    focusKey = k
    setFocus(k)
    if (!k) {
      tp.copy(HOME.p)
      tt.copy(HOME.t)
      return
    }
    const P = PARTS[k]
    tt.set(P.c[0], P.c[1] + GY, P.c[2])
    tp.set(P.c[0] + P.d * 0.22, P.c[1] + GY + P.d * 0.08, P.d)
  }

  /* Interacción: arrastrar para girar, click para enfocar */
  const ray = new T.Raycaster()
  const mv = new T.Vector2()
  let down = null

  const onDown = (e) => {
    down = { x: e.clientX, y: e.clientY, r: drag }
    stage.setPointerCapture(e.pointerId)
  }
  const onMove = (e) => {
    if (down && !focusKey) drag = down.r + (e.clientX - down.x) * 0.01
  }
  const onUp = (e) => {
    if (!down) return
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y)
    down = null
    if (moved > 5) return
    const r = renderer.domElement.getBoundingClientRect()
    mv.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    ray.setFromCamera(mv, camera)
    const hit = ray.intersectObjects(hotspots)[0]
    let key = hit?.object.userData.k
    if (!key) {
      const groups = Object.values(grp)
      const h2 = ray.intersectObjects(groups, true)[0]
      if (h2) {
        let o = h2.object
        while (o && !groups.includes(o)) o = o.parent
        key = Object.keys(grp).find((kk) => grp[kk] === o)
      }
    }
    setCamFocus(key && key !== focusKey ? key : null)
  }
  stage.addEventListener('pointerdown', onDown)
  stage.addEventListener('pointermove', onMove)
  stage.addEventListener('pointerup', onUp)

  const resize = () => {
    const w = stage.clientWidth
    const h = stage.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(stage)
  resize()

  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let raf = 0
  const loop = (ms) => {
    raf = requestAnimationFrame(loop)
    const t = ms * 0.001
    const target = focusKey ? 0 : drag + (calm ? 0 : Math.sin(t * 0.5) * 0.35)
    rot += (target - rot) * 0.07
    G.rotation.y = rot
    cp.lerp(tp, 0.065)
    ct.lerp(tt, 0.065)
    camera.position.copy(cp)
    camera.lookAt(ct)
    for (const k in grp)
      grp[k].traverse((o) => {
        if (o.isMesh) {
          const on = !focusKey || focusKey === k
          o.material.opacity += ((on ? 1 : 0.18) - o.material.opacity) * 0.1
        }
      })
    hotspots.forEach((h, i) => {
      h.visible = !focusKey
      const s = 1 + 0.25 * Math.sin(t * 3 + i)
      h.userData.ring.scale.setScalar(1 + ((t * 1.2 + i * 0.3) % 1) * 0.9)
      h.userData.ring.material.opacity = 1 - ((t * 1.2 + i * 0.3) % 1)
      h.scale.setScalar(s)
      h.userData.ring.lookAt(camera.position)
    })
    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(loop)

  /* Limpieza completa al desmontar */
  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    stage.removeEventListener('pointerdown', onDown)
    stage.removeEventListener('pointermove', onMove)
    stage.removeEventListener('pointerup', onUp)
    scene.traverse((o) => {
      o.geometry?.dispose?.()
      const mats = Array.isArray(o.material) ? o.material : [o.material]
      mats.forEach((m) => m?.dispose?.())
    })
    renderer.dispose()
    renderer.domElement.remove()
  }
}

/* ---------- Sección "Anatomía de una guitarra" ---------- */
export default function GuitarAnatomy() {
  const stageRef = useRef(null)
  const focusRef = useRef(null)
  const [focus, setFocus] = useState(null)
  const [glError, setGlError] = useState(false)

  const setFocusSafe = useCallback((key) => {
    focusRef.current = key
    setFocus(key)
  }, [])

  useEffect(() => {
    let cleanup
    try {
      cleanup = buildGuitarScene(stageRef.current, setFocusSafe)
    } catch {
      setGlError(true)
    }
    return () => cleanup?.()
  }, [setFocusSafe])

  const part = focus ? PARTS[focus] : null

  return (
    <section
      id="guitarra"
      className="relative px-6 py-[110px] md:px-[5vw]"
      style={{ background: 'radial-gradient(800px 600px at 30% 50%, #31211a 0, #17110e 70%)' }}
    >
      <Reveal>
        <h2 className="hl bg-paper font-serif text-[clamp(38px,5.5vw,72px)] leading-[1.05] text-ink">
          Anatomía de una guitarra
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-3 font-hand text-3xl text-brass md:text-4xl">toca, gira y descubre</p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-4 max-w-[34em] text-paper/85">
          Gírala arrastrando y toca los puntos dorados para acercarte a cada pieza.
        </p>
      </Reveal>

      <div className="mt-10 grid items-center gap-[4vw] lg:grid-cols-[1.1fr_0.9fr]">
        {/* Escenario 3D */}
        <div
          ref={stageRef}
          role="img"
          aria-label="Guitarra 3D interactiva"
          data-cursor
          className="relative aspect-[4/4.6] max-h-[78vh] w-full cursor-grab touch-pan-y border-[10px] border-paper bg-[radial-gradient(circle_at_50%_40%,#3b2a20,#120d0a)] shadow-[0_20px_50px_rgba(0,0,0,0.6)] active:cursor-grabbing"
        >
          <p className="pointer-events-none absolute inset-x-0 -bottom-11 text-center font-hand text-[38px] leading-none text-paper/90">
            Teba Guitars · modelo de taller
          </p>
          {glError && (
            <p className="p-8 text-paper/80">No se pudo cargar el visor 3D.</p>
          )}
        </div>

        {/* Panel de pieza + accesos */}
        <div>
          <motion.div
            key={focus ?? 'home'}
            initial={{ rotate: -2, scale: 0.95 }}
            animate={{ rotate: [-2, 2.4, 1.5], scale: [0.95, 1.02, 1] }}
            transition={{ duration: 0.55 }}
            className="rotate-[1.5deg] bg-paper p-4 pb-7 text-ink shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="min-h-[300px] border-2 border-dashed border-[#b9a67f] px-6 py-6">
              <h3 className="font-serif text-[38px] leading-tight">
                {part ? part.n : PANEL_HOME.title}
              </h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={focus ?? 'home'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mt-2.5 text-[#3d3126]">{part ? part.t : PANEL_HOME.text}</p>
                  {part && (
                    <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[#3d3126]">
                      {part.l.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-2">
            {Object.entries(PARTS).map(([k, p]) => (
              <button
                key={k}
                onClick={() => setFocusSafe(k)}
                className={`border border-brass px-3.5 py-1.5 text-[15px] font-medium text-brass transition-colors duration-200 ${
                  focus === k ? 'bg-brass text-ink' : 'hover:bg-brass/15'
                }`}
              >
                {p.n}
              </button>
            ))}
            <button
              onClick={() => setFocusSafe(null)}
              className={`border border-brass px-3.5 py-1.5 text-[15px] font-medium text-brass transition-colors duration-200 ${
                focus === null ? 'bg-brass text-ink' : 'hover:bg-brass/15'
              }`}
            >
              Vista completa
            </button>
          </div>

          <p className="mt-3.5 flex items-center gap-2 text-sm text-paper/70">
            <Rotate3d size={15} aria-hidden />
            Arrastra para girar.
            <MousePointerClick size={15} aria-hidden className="ml-2" />
            Pulsa de nuevo la pieza o “Vista completa” para volver.
          </p>
        </div>
      </div>
    </section>
  )
}
