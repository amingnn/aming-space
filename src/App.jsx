import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

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
      <Aurora />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Gallery />
        <Contact />
      </main>
    </>
  )
}
