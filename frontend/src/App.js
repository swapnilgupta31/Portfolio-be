import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import About           from './components/About';
import Education       from './components/Education';
import Experience      from './components/Experience';
import Projects        from './components/Projects';
import Skills          from './components/Skills';
import Certifications  from './components/Certifications';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import WhatsAppButton  from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
