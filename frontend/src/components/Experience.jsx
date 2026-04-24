import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiBriefcase } from 'react-icons/hi';

const experiences = [
  {
    company: 'Capgemini India Pvt Ltd',
    role: 'Associate Software Engineer',
    period: 'June 2025 – Present',
    color: '#3b82f6',
    points: [
      'Working as a Software Engineer building scalable full-stack enterprise applications',
      'Developing secure REST APIs using ASP.NET Core, JWT, and Identity Framework',
      'Building frontend modules using React.js and Angular for enterprise-grade solutions',
      'Working on Generative AI modules, automation workflows, and cloud integrations',
      'Delivering solutions for global clients including HP and Mercedes-Benz',
    ],
    tags: ['ASP.NET Core', 'React', 'Angular', 'SQL Server', 'JWT', 'Azure', 'GenAI'],
  },
  {
    company: 'Capgemini India Pvt Ltd',
    role: 'Software Analyst Intern',
    period: 'Jan 2025 – May 2025',
    color: '#8b5cf6',
    points: [
      'Worked as a .NET Backend Developer building RESTful APIs',
      'Used Angular for frontend development',
      'Built a full Pharmacy Management System with role-based secure access',
      'Improved inventory tracking and operational efficiency by 35%',
    ],
    tags: ['ASP.NET Core', 'Angular', 'SQL Server', 'REST API', 'JWT'],
  },
  {
    company: 'CodeSquadz Pvt Ltd, Noida',
    role: 'Machine Learning Trainee',
    period: 'June 2023 – Aug 2023',
    color: '#06b6d4',
    points: [
      'Built a Face Detection model using LBPH algorithm with high accuracy',
      'Worked on Data Science modules, preprocessing, and ML pipelines',
      'Explored Computer Vision and Machine Learning fundamentals',
      'Improved model accuracy and optimization through training iterations',
    ],
    tags: ['Python', 'OpenCV', 'LBPH', 'Machine Learning', 'Data Science'],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24" style={{ background: 'linear-gradient(180deg,#1a1f2e,#0f172a)' }}>
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title"
        >
          Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle"
        >
          Professional journey & industry experience
        </motion.p>

        <div className="space-y-8">
          {experiences.map(({ company, role, period, color, points, tags }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              whileHover={{ y: -4 }}
              className="glass-card p-8 relative overflow-hidden"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: `linear-gradient(180deg,${color},transparent)` }} />

              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                  >
                    <HiBriefcase size={20} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">{company}</h3>
                    <p style={{ color }} className="font-semibold">{role}</p>
                  </div>
                </div>
                <span className="glass px-3 py-1 rounded-full text-sm text-slate-400">{period}</span>
              </div>

              <ul className="space-y-2 mb-5 ml-16">
                {points.map((p, j) => (
                  <li key={j} className="flex items-start gap-2 text-slate-300">
                    <span className="glow-dot mt-2 flex-shrink-0" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 ml-16">
                {tags.map((t, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
