import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { HiCode, HiDatabase, HiGlobe, HiSparkles } from 'react-icons/hi';

const stats = [
  { label: 'Years Learning', value: 4, suffix: '+' },
  { label: 'Projects Built', value: 15, suffix: '+' },
  { label: 'Certifications', value: 7, suffix: '' },
  { label: 'Professional Experiences', value: 3, suffix: '' },
];

const highlights = [
  { icon: <HiCode size={22} />, title: 'Backend Engineering', desc: 'ASP.NET Core, REST APIs, JWT, Identity Framework, clean architecture, scalable backend systems', color: '#3b82f6' },
  { icon: <HiGlobe size={22} />, title: 'Frontend Development', desc: 'React.js, Angular, responsive UI, SPA development, Tailwind CSS, seamless user experience', color: '#8b5cf6' },
  { icon: <HiDatabase size={22} />, title: 'Database & Cloud', desc: 'SQL Server, MongoDB, MySQL, Azure, AWS, DevOps, CI/CD pipelines', color: '#06b6d4' },
  { icon: <HiSparkles size={22} />, title: 'Generative AI & ML', desc: 'GenAI modules, AI automation, Machine Learning, Face Detection System, intelligent workflow solutions', color: '#f59e0b' },
];

// Animated counter
function Counter({ value, suffix, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(value / 30);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 40);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <>{count}{suffix}</>;
}

// 3D tilt card
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMouse} onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative" style={{ background: 'linear-gradient(180deg,#0f172a,#1a1f2e)' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title"
        >About Me</motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle"
        >Engineer. Builder. Problem Solver.</motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text + highlights */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I'm a <span className="text-accent-blue font-semibold">Software Engineer</span> with strong expertise in{' '}
              <span className="text-accent-blue font-semibold">.NET</span>,{' '}
              <span className="text-accent-purple font-semibold">React</span>,{' '}
              <span className="text-accent-purple font-semibold">Angular</span>,{' '}
              <span className="text-yellow-400 font-semibold">Generative AI</span>, and{' '}
              <span className="text-emerald-400 font-semibold">Cloud Platforms</span> — focused on building scalable,
              secure, and high-performance enterprise applications. I specialize in clean architecture, strong backend
              logic, and delivering seamless user experiences.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Currently working as an{' '}
              <span className="text-accent-purple font-semibold">Associate Software Engineer at Capgemini</span>, I
              contribute to enterprise-grade solutions for global clients like{' '}
              <span className="text-white font-medium">HP</span> and{' '}
              <span className="text-white font-medium">Mercedes-Benz</span>, building full-stack applications, secure
              APIs, and GenAI-powered modules. I've also worked on Machine Learning projects at{' '}
              <span className="text-accent-blue font-medium">CodeSquadz</span>, where I developed a Face Detection
              system with high accuracy. I enjoy transforming complex problems into efficient, intelligent, and
              production-ready solutions.
            </p>

            <div className="space-y-3">
              {highlights.map(({ icon, title, desc, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="flex items-start gap-4 glass-card p-4 cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}20`, color }}
                  >
                    {icon}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">{title}</h4>
                    <p className="text-slate-400 text-sm">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats with tilt + counter */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
            style={{ perspective: 1000 }}
          >
            {stats.map(({ label, value, suffix }, i) => (
              <TiltCard key={i} className="glass-card p-8 text-center cursor-default">
                <div
                  className="text-4xl font-black mb-2"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  <Counter value={value} suffix={suffix} inView={inView} />
                </div>
                <div className="text-slate-400 text-sm font-medium">{label}</div>
              </TiltCard>
            ))}

            {/* Avatar card */}
            <TiltCard className="col-span-2 glass-card p-8 text-center relative overflow-hidden cursor-default">
              <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }} />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-white"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}
                >
                  SG
                </motion.div>
                <p className="text-white font-bold text-lg">Swapnil Peeyoush Gupta</p>
                <p className="text-accent-blue text-sm">Software Engineer</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {['ASP.NET', 'React', 'Angular', 'GenAI', 'Azure', 'Cloud'].map((t, i) => (
                    <motion.span key={i} whileHover={{ scale: 1.1, y: -2 }}
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
                    >{t}</motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
