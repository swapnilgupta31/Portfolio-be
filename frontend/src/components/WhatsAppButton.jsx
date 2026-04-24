import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/918979180931"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center group"
      style={{ background: 'linear-gradient(135deg,#25d366,#128c7e)', boxShadow: '0 0 25px rgba(37,211,102,0.5)' }}
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ background: '#25d366' }} />
      <FaWhatsapp size={26} className="text-white relative z-10" />

      {/* Tooltip */}
      <span className="absolute right-16 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
