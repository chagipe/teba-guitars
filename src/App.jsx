import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Reviews from './components/Reviews'
import WorksGallery from './components/WorksGallery'
import Process from './components/Process'
import About from './components/About'
import FAQ from './components/FAQ'
import Location from './components/Location'
import Packages from './components/Packages'
import Configurator from './components/Configurator'

/* El visor 3D (three.js) se carga bajo demanda */
const GuitarAnatomy = lazy(() => import('./components/GuitarAnatomy'))

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-sans text-paper antialiased">
      <CustomCursor />
      <Intro />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Suspense fallback={null}>
          <GuitarAnatomy />
        </Suspense>
        <Process />
        <WorksGallery />
        <Reviews />
        <About />
        <FAQ />
        <Location />
        <Packages />
        <Configurator />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
