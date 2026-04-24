import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { motion } from 'framer-motion';

const socials = [
  { icon: <FaGithub size={18} />, href: 'https://github.com/swapnilgupta31', label: 'GitHub' },
  { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/swapnil-gupta-/', label: 'LinkedIn' },
  { icon: <FaWhatsapp size={18} />, href: 'https://wa.me/918979180931', label: 'WhatsApp' },
  { icon: <HiMail size={18} />, href: 'mailto:swapnilgupta.se@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/5" style={{ background: '#0a0f1e' }}>
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,#3b82f6,#8b5cf6,transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span
            className="text-xl font-black"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            Swapnil Gupta
          </span>
          <p className="text-slate-500 text-sm mt-1">Software Engineer · Full Stack Developer</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon, href, label }, i) => (
            <motion.a
              key={i} href={href} target="_blank" rel="noreferrer" aria-label={label}
              whileHover={{ scale: 1.2, y: -2 }}
              className="glass w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              {icon}
            </motion.a>
          ))}
        </div>

        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Swapnil Gupta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
