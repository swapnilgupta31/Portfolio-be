import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiAcademicCap } from 'react-icons/hi';

const education = [
  {
    degree: 'Bachelors in Technology - Computer Science',
    school: 'GLA University, Mathura',
    year: '2021 – 2025',
    score: '86%',
    color: '#3b82f6',
  },
  {
    degree: 'Intermediate',
    school: 'DAV Public School, Meerut',
    year: '2020',
    score: '91.6%',
    color: '#8b5cf6',
  },
  {
    degree: 'High School',
    school: 'TDS Public School, Aligarh',
    year: '2018',
    score: '92.2%',
    color: '#06b6d4',
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="py-24" style={{ background: '#1a1f2e' }}>
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title"
        >
          Education
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle"
        >
          Academic Background
        </motion.p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan opacity-30 hidden md:block" />

          <div className="space-y-6">
            {education.map(({ degree, school, year, score, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ x: 6 }}
                className="flex gap-6 items-start"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10"
                  style={{ background: `${color}20`, border: `1px solid ${color}40`, boxShadow: `0 0 20px ${color}20` }}
                >
                  <HiAcademicCap size={24} style={{ color }} />
                </div>

                {/* Card */}
                <div className="flex-1 glass-card p-6 hover:border-white/15 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-white font-bold text-lg">{degree}</h3>
                      <p className="text-slate-400 mt-1">{school}</p>
                      <p className="text-slate-500 text-sm mt-1">{year}</p>
                    </div>
                    <div
                      className="px-4 py-2 rounded-xl text-sm font-bold"
                      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                    >
                      {score}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
