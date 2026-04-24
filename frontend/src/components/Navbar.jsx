import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const links = ['About', 'Education', 'Experience', 'Projects', 'Skills', 'Certifications', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver — highlight active section
  useEffect(() => {
    const observers = [];
    links.forEach((l) => {
      const el = document.getElementById(l.toLowerCase());
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(l); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    // Close menu first, then scroll after menu finishes collapsing
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-0.5 z-[60]"
        css={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4)' }}
      >
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4)' }} />
      </motion.div>

      <motion.nav
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0.5 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-glass py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.span
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
            className="text-xl font-black cursor-pointer select-none"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            S.
          </motion.span>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l} className="relative">
                <button
                  onClick={() => scrollTo(l)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    active === l ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {active === l && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <HiX size={24} /> : <HiMenu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu — overflow-visible so clicks are never clipped */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden glass border-t border-white/5"
            >
              <ul className="px-4 py-3 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.li key={l}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <button
                      onPointerDown={() => scrollTo(l)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        active === l
                          ? 'text-white bg-blue-500/15 border border-blue-500/30'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {l}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
