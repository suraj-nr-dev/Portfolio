import { useCallback, useState } from 'react';
import Loader from './components/Loader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import useTheme from './hooks/useTheme.js';

export default function App() {
  // `ready` flips when the loader starts leaving, so the hero animates in
  // underneath it; `loaderDone` unmounts the loader once it has faded out.
  const [ready, setReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleExitStart = useCallback(() => setReady(true), []);
  const handleDone = useCallback(() => setLoaderDone(true), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {!loaderDone && <Loader onExitStart={handleExitStart} onDone={handleDone} />}
      <CustomCursor />
      <ScrollProgress />

      {/* Fixed, decorative floating shapes behind every section */}
      <div className="backdrop" aria-hidden="true">
        <span className="backdrop__blob backdrop__blob--one" />
        <span className="backdrop__blob backdrop__blob--two" />
        <span className="backdrop__blob backdrop__blob--three" />
      </div>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="main">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
