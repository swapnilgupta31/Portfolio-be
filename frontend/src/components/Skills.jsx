import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// ── Core Proficiency ─────────────────────────────────────────────────────────
const techSkills = [
  { name: '.NET Full Stack',           level: 92, colorA: '#3b82f6', colorB: '#6366f1' },
  { name: 'Core Programming',          level: 91, colorA: '#8b5cf6', colorB: '#a855f7' },
  { name: 'React / Angular',           level: 90, colorA: '#06b6d4', colorB: '#0ea5e9' },
  { name: 'Cloud (Azure / GCP)',        level: 92, colorA: '#f59e0b', colorB: '#f97316' },
  { name: 'Gen AI / ML',               level: 95, colorA: '#10b981', colorB: '#34d399' },
  { name: 'SQL Server / Database',      level: 86, colorA: '#ec4899', colorB: '#f43f5e' },
  { name: 'Java Spring Boot',           level: 81, colorA: '#14b8a6', colorB: '#06b6d4' },
  { name: 'Interpersonal & Marketing',  level: 90, colorA: '#a78bfa', colorB: '#8b5cf6' },
];

// ── Tech Stack — 6 structured subsections (no duplicates) ───────────────────
const techStack = [
  {
    title: 'Languages',
    color: '#3b82f6',
    icon: '{ }',
    items: ['Java', 'C#', 'Python', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Frameworks & Libraries',
    color: '#8b5cf6',
    icon: '⚙️',
    items: ['.NET Core', 'Spring Boot', 'Angular', 'React JS', 'React Native', 'Node.js', 'Express.js', 'Flask', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    title: 'Databases',
    color: '#ec4899',
    icon: '🗄️',
    items: ['SQL Server', 'MongoDB', 'MySQL'],
  },
  {
    title: 'Cloud & DevOps',
    color: '#f59e0b',
    icon: '☁️',
    items: ['Azure', 'Google Cloud', 'AWS', 'DevOps', 'Git', 'GitHub Copilot', 'SonarQube'],
  },
  {
    title: 'Concepts & Practices',
    color: '#10b981',
    icon: '💡',
    items: ['DSA', 'OOPs', 'REST API', 'SPA', 'IAM', 'JWT', 'Identity Framework', 'SDLC', 'STLC', 'Clean Architecture'],
  },
  {
    title: 'Integrations & Testing',
    color: '#a78bfa',
    icon: '🔗',
    items: ['SMTP', 'RabbitMQ', 'Razorpay', 'NUnit'],
  },
];

const CHIP_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ec4899', '#14b8a6', '#a78bfa', '#6366f1', '#f43f5e'];

// ── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target, inView, delay = 0) {
  const count   = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl  = animate(count, target, { duration: 1.4, delay, ease: 'easeOut' });
    const unsub = rounded.on('change', v => setDisplay(v));
    return () => { ctrl.stop(); unsub(); };
  }, [inView]); // eslint-disable-line

  return display;
}

// ── Ring Chart ───────────────────────────────────────────────────────────────
function RingChart({ name, level, colorA, colorB, inView, index }) {
  const SIZE = 110, STROKE = 8;
  const R    = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const id   = `grad-${index}`;
  const delay = 0.2 + index * 0.1;
  const count = useCounter(level, inView, delay);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.07, y: -5 }}
      className="glass-card p-5 flex flex-col items-center gap-3 cursor-default group"
    >
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={colorA} />
              <stop offset="100%" stopColor={colorB} />
            </linearGradient>
          </defs>
          <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE} />
          <motion.circle
            cx={SIZE/2} cy={SIZE/2} r={R} fill="none"
            stroke={`url(#${id})`} strokeWidth={STROKE} strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={inView ? { strokeDashoffset: CIRC - (level / 100) * CIRC } : {}}
            transition={{ duration: 1.4, delay, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${colorA}99)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black leading-none"
            style={{ background: `linear-gradient(135deg,${colorA},${colorB})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {count}%
          </span>
        </div>
        {inView && (
          <motion.div className="absolute inset-0 rounded-full pointer-events-none"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0, 0.25, 0], scale: [0.85, 1.1, 1.1] }}
            transition={{ duration: 1.0, delay: delay + 1.2, ease: 'easeOut' }}
            style={{ background: `radial-gradient(circle,${colorA}40,transparent 70%)` }}
          />
        )}
      </div>
      <p className="text-slate-300 text-xs font-semibold text-center leading-tight group-hover:text-white transition-colors">
        {name}
      </p>
    </motion.div>
  );
}

// ── Tech Stack Subsection Card ───────────────────────────────────────────────
function StackCard({ title, color, icon, items, inView, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
      className="glass-card p-5 group"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <h4 className="text-white font-bold text-sm">{title}</h4>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {items.map((item, j) => {
          const c = CHIP_COLORS[j % CHIP_COLORS.length];
          return (
            <motion.span
              key={item}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-2.5 py-1 rounded-lg text-xs font-medium cursor-default"
              style={{ background: `${c}15`, color: c, border: `1px solid ${c}30` }}
            >
              {item}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const visible = techStack;

  return (
    <section id="skills" className="py-24" style={{ background: 'linear-gradient(180deg,#1a1f2e,#0f172a)' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title"
        >Skills</motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle"
        >Technologies & tools I work with</motion.p>

        {/* ── Core Proficiency ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card p-8 mb-10"
        >
          <h3 className="text-white font-bold text-lg mb-7">Core Proficiency</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techSkills.map((s, i) => (
              <RingChart key={i} {...s} inView={inView} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Tech Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg">Tech Stack</h3>
            <span className="glass px-3 py-1 rounded-full text-xs text-slate-400">
              {techStack.reduce((acc, c) => acc + c.items.length, 0)}+ technologies
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((cat, i) => (
              <StackCard key={cat.title} {...cat} inView={inView} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
