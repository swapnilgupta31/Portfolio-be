import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiExternalLink, HiCode, HiX, HiChevronRight } from 'react-icons/hi';

const projects = [
  {
    title: 'CricZone',
    subtitle: 'Complete Cricket Solution Platform',
    desc: 'Built a full-stack cricket analytics platform offering live match updates, player statistics, team tracking, and responsive cross-platform experience for both web and mobile users.',
    longDesc: 'CricZone is a comprehensive cricket analytics platform delivering real-time match updates, deep player and team statistics, and a seamless cross-platform experience. The web app is built with React.js and the mobile app with React Native, sharing a unified Node.js + MongoDB backend optimized for performance.',
    tags: ['React.js', 'React Native', 'Node.js', 'MongoDB', 'Express.js'],
    color: '#3b82f6',
    emoji: '🏏',
    features: ['Real-time live match updates and score tracking', 'Player and team performance analytics', 'Cross-platform support (Web + Mobile)', 'Modern responsive UI with optimized performance'],
  },
  {
    title: 'Pharmacy Management System',
    subtitle: 'Medicine & Order Tracking Platform',
    desc: 'Developed a secure enterprise-grade Pharmacy Management System with role-based access, medicine inventory management, supplier handling, order tracking, and operational workflow optimization.',
    longDesc: 'Built at Capgemini, this enterprise-grade system handles the full lifecycle of pharmacy operations — inventory management, order processing, supplier coordination, and admin workflows — secured with JWT and Identity Framework role-based access control, improving operational efficiency by 35%.',
    tags: ['ASP.NET Core', 'Angular', 'SQL Server', 'JWT', 'Identity Framework'],
    color: '#8b5cf6',
    emoji: '💊',
    features: ['Role-based secure access control', 'Inventory and medicine order tracking', 'Supplier management and admin workflows', 'Improved operational efficiency by 35%'],
  },
  {
    title: 'Pet2Family',
    subtitle: 'Pet Adoption Platform',
    desc: 'Built a complete Pet Adoption Platform connecting shelters and adopters with smart pet matching, secure adoption workflows, and real-time user engagement features.',
    longDesc: 'Pet2Family bridges the gap between animal shelters and potential adopters. A Flask-based ML model handles smart pet matching based on adopter preferences, while the Node.js backend manages real-time notifications, adoption workflows, and shelter-adopter coordination.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Flask', 'Python'],
    color: '#06b6d4',
    emoji: '🐾',
    features: ['Smart pet matching system', 'Shelter and adopter management portal', 'Real-time notifications and workflow tracking', 'Streamlined adoption process with better user flow'],
  },
  {
    title: 'Helping Hand',
    subtitle: 'NGO Support & Donation Platform',
    desc: 'Developed a platform connecting NGOs, donors, and volunteers with streamlined request handling, donation workflows, and efficient support coordination for social impact initiatives.',
    longDesc: 'Helping Hand is a social impact platform that connects NGOs, donors, and volunteers on a unified system. It automates support request handling, donation workflows, and volunteer coordination — reducing response times and improving operational efficiency for social initiatives.',
    tags: ['ASP.NET Core', 'React.js', 'SQL Server', 'SMTP', 'Cloud Integration'],
    color: '#f59e0b',
    emoji: '🤝',
    features: ['NGO and donor connection platform', 'Request handling and support workflow automation', 'Faster coordination and response management', 'Improved operational efficiency for support activities'],
  },
];

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Modal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="glass-card p-8 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 glass w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <HiX size={16} />
        </button>

        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}>
            {project.emoji}
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">{project.title}</h3>
            <p className="font-medium text-sm" style={{ color: project.color }}>{project.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-300 leading-relaxed mb-5">{project.longDesc}</p>

        <div className="mb-5">
          <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-3">Key Features</h4>
          <ul className="space-y-2">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                <HiChevronRight style={{ color: project.color }} size={14} className="flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t, i) => (
            <span key={i} className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-24" style={{ background: '#0f172a' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title"
        >Projects</motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle"
        >Things I've Built</motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: 1200 }}>
          {projects.map((project, i) => {
            const { title, subtitle, desc, tags, color, emoji, features } = project;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              >
                <TiltCard className="glass-card p-6 flex flex-col group relative overflow-hidden h-full cursor-pointer"
                  onClick={() => setSelected(project)}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 0%,${color}18,transparent 70%)` }} />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${color}20`, border: `1px solid ${color}40`, boxShadow: `0 0 20px ${color}20` }}
                    >
                      {emoji}
                    </motion.div>
                    <div className="flex gap-2">
                      <motion.button whileHover={{ scale: 1.2, color: '#fff' }} whileTap={{ scale: 0.9 }}
                        className="glass w-9 h-9 rounded-lg flex items-center justify-center text-slate-400">
                        <HiCode size={16} />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.2, color: '#fff' }} whileTap={{ scale: 0.9 }}
                        className="glass w-9 h-9 rounded-lg flex items-center justify-center text-slate-400">
                        <HiExternalLink size={16} />
                      </motion.button>
                    </div>
                  </div>

                  <div className="relative z-10 mb-3">
                    <h3 className="text-white font-bold text-xl">{title}</h3>
                    <p className="text-sm font-medium" style={{ color }}>{subtitle}</p>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4 relative z-10 flex-1">{desc}</p>

                  <ul className="space-y-1 mb-5 relative z-10">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-400 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {tags.map((t, j) => (
                      <span key={j} className="px-2 py-1 rounded-lg text-xs font-medium"
                        style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Click hint */}
                  <motion.div
                    initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                    className="absolute bottom-4 right-4 text-xs text-slate-500 flex items-center gap-1"
                  >
                    Click for details <HiChevronRight size={12} />
                  </motion.div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
