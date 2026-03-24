import Cursor from './components/Cursor'
import ProgressBar from './components/ProgressBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import FloatingPlayer from './components/FloatingPlayer'

function Aurora() {
  return (
    <div className="aurora">
      <div className="aurora-blob" />
      <div className="aurora-blob" />
      <div className="aurora-blob" />
      <div className="aurora-blob" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <ProgressBar />
      <Aurora />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Gallery />
        <Contact />
      </main>
      <FloatingPlayer />
    </>
  )
}
