export default function Footer() {
  return (
    <footer
      className="px-6 pb-[calc(30px+env(safe-area-inset-bottom,0px))] pt-7 text-center text-sm text-paper/70"
    >
      <span className="block font-hand text-[clamp(40px,5.5vw,72px)] leading-none text-paper">
        Teba
      </span>
      <small className="mt-2 block opacity-65">
        © 2026 Teba Guitars. Todos los derechos reservados.
      </small>
    </footer>
  )
}
