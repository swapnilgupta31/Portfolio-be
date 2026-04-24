import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { HiDownload, HiMail, HiPhone } from 'react-icons/hi';
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';

const ROLES = ['Software Engineer', 'Full Stack Developer', '.NET Developer', 'React Developer', 'Problem Solver', 'Generative AI Leader', 'Microsoft Certified', 'Google Certified', 'AI Developer'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

// Floating particle dot
function Particle({ x, y, size, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: 'rgba(59,130,246,0.4)' }}
      animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 3,
}));

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const containerRef = useRef(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orb1X = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), { stiffness: 50, damping: 20 });
  const orb1Y = useSpring(useTransform(mouseY, [0, 1], [-30, 30]), { stiffness: 50, damping: 20 });
  const orb2X = useSpring(useTransform(mouseX, [0, 1], [30, -30]), { stiffness: 30, damping: 20 });
  const orb2Y = useSpring(useTransform(mouseY, [0, 1], [30, -30]), { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  // Typewriter
  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout;
    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)' }}
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      {/* Parallax orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ x: orb1X, y: orb1Y }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          css={{ background: 'radial-gradient(circle,#3b82f6,transparent)', filter: 'blur(60px)' }}
        >
          <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle,#3b82f6,transparent)', filter: 'blur(60px)' }} />
        </motion.div>
        <motion.div style={{ x: orb2X, y: orb2Y }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle,#8b5cf6,transparent)', filter: 'blur(60px)' }} />
        </motion.div>
        {/* Third orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 12, repeat: Infinity }}
          style={{ background: 'radial-gradient(circle,#06b6d4,transparent)', filter: 'blur(80px)' }}
        />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.5) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
          <motion.span
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ boxShadow: '0 0 8px #4ade80' }}
          />
          <span className="text-sm text-slate-300 font-medium">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1 {...fadeUp(0.2)} className="text-5xl md:text-7xl font-black mb-4 leading-tight">
          <motion.span
            className="text-white inline-block"
            whileHover={{ scale: 1.02 }}
          >
            Swapnil{' '}
          </motion.span>
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            Gupta
          </motion.span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div {...fadeUp(0.3)} className="text-xl md:text-2xl text-slate-300 font-medium mb-6 h-9 flex items-center justify-center gap-2">
          <span className="text-accent-blue">{'<'}</span>
          <span className="text-white font-semibold min-w-[220px] text-left">
            {displayed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-5 bg-accent-blue ml-0.5 align-middle"
            />
          </span>
          <span className="text-accent-blue">{'/>'}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p {...fadeUp(0.4)} className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Software Engineer with expertise in{' '}
          <motion.span whileHover={{ color: '#60a5fa' }} className="text-accent-blue font-semibold cursor-default">.NET</motion.span>,{' '}
          <motion.span whileHover={{ color: '#a78bfa' }} className="text-accent-purple font-semibold cursor-default">React</motion.span>,{' '}
          <motion.span whileHover={{ color: '#fbbf24' }} className="text-yellow-400 font-semibold cursor-default">cloud platforms</motion.span>, and{' '}
          <motion.span whileHover={{ color: '#34d399' }} className="text-emerald-400 font-semibold cursor-default">Generative AI</motion.span>,
          focused on designing scalable and efficient systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {[
            {
              el: 'a', href: 'https://drive.google.com/uc?export=download&id=1WiYtjldL9rTaiHIR-hKqYh7yQws7VaXq', target: '_blank', rel: 'noreferrer',
              className: 'btn-primary flex items-center gap-2',
              children: <><HiDownload size={18} /> Download Resume</>
            },
            {
              el: 'button', onClick: scrollToContact,
              className: 'btn-outline flex items-center gap-2',
              children: <><HiMail size={18} /> Contact Me</>
            },
          ].map(({ el: El, children, ...props }, i) => (
            <motion.div key={i} whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}>
              <El {...props}>{children}</El>
            </motion.div>
          ))}
          <motion.a
            href="https://wa.me/918979180931" target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
            style={{ background: 'linear-gradient(135deg,#25d366,#128c7e)', boxShadow: '0 0 20px rgba(37,211,102,0.3)' }}
          >
            <FaWhatsapp size={18} /> WhatsApp
          </motion.a>
        </motion.div>

        {/* Contact chips */}
        <motion.div {...fadeUp(0.6)} className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { href: 'tel:+918979180931', icon: <HiPhone size={14} />, label: '+91 8979180931' },
            { href: 'mailto:swapnilgupta.se@gmail.com', icon: <HiMail size={14} />, label: 'swapnilgupta.se@gmail.com' },
          ].map(({ href, icon, label }, i) => (
            <motion.a key={i} href={href}
              whileHover={{ scale: 1.05, borderColor: 'rgba(59,130,246,0.6)' }}
              className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-slate-300 hover:text-white transition-all"
            >
              <span className="text-accent-blue">{icon}</span> {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Socials */}
        <motion.div {...fadeUp(0.7)} className="flex justify-center gap-4">
          {[
            { icon: <FaGithub size={20} />, href: 'https://github.com/swapnilgupta31', color: '#fff' },
            { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/swapnil-gupta-/', color: '#0a66c2' },
            { icon: <FaWhatsapp size={20} />, href: 'https://wa.me/918979180931', color: '#25d366' },
          ].map(({ icon, href, color }, i) => (
            <motion.a key={i} href={href} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.25, y: -4, color }}
              whileTap={{ scale: 0.9 }}
              className="glass w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 transition-colors"
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-slate-500 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center p-1"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-accent-blue"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
