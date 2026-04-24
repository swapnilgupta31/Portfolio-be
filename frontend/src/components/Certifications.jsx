import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiBadgeCheck, HiExternalLink } from 'react-icons/hi';
import { SiGooglecloud, SiGoogle, SiGithubcopilot } from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';

const certs = [
  {
    title: 'Google Associate Cloud Engineer',
    issuer: 'Google Cloud',
    logo: <SiGooglecloud size={26} />,
    color: '#4285f4',
    link: 'https://www.credly.com/badges/00d21dd7-dc3e-4c00-b084-d9eb7a948c22/public_url',
  },
  {
    title: 'Google Generative AI Leader',
    issuer: 'Google',
    logo: <SiGoogle size={24} />,
    color: '#10b981',
    link: 'https://www.credly.com/badges/bf2f255e-559b-4ce3-a111-041a93184555/public_url',
  },
  {
    title: 'Azure AI Engineer Associate (AI-102)',
    issuer: 'Microsoft Azure',
    logo: <FaMicrosoft size={24} />,
    color: '#0ea5e9',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/swapnilgupta-7328/5245F8B8FC59558E?sharingId=4374E4103750436C',
  },
  {
    title: 'GitHub Copilot Certification (GH-300)',
    issuer: 'GitHub',
    logo: <SiGithubcopilot size={26} />,
    color: '#8b5cf6',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/PeeyoushGuptaSwapnil-9358/548655364A5049C1?sharingId=BDD8F2F98442EA80',
  },
  {
    title: 'Azure Developer Associate (AZ-204)',
    issuer: 'Microsoft Azure',
    logo: <FaMicrosoft size={24} />,
    color: '#3b82f6',
    link: 'https://learn.microsoft.com/en-us/users/swapnilgupta-7328/credentials/11ba01a6da8dedd',
  },
  {
    title: 'Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft Azure',
    logo: <FaMicrosoft size={24} />,
    color: '#06b6d4',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/PeeyoushGuptaSwapnil-9358/D73E161D3F257EAA?sharingId=BDD8F2F98442EA80',
  },
  {
    title: 'Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft Azure',
    logo: <FaMicrosoft size={24} />,
    color: '#f59e0b',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/PeeyoushGuptaSwapnil-9358/1D5AB8145204FB3D?sharingId=BDD8F2F98442EA80',
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="py-24" style={{ background: '#0f172a' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Certifications
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle"
        >
          Verified credentials & achievements
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map(({ title, issuer, logo, color, link }, i) => (
            <motion.a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="glass-card p-6 flex items-start gap-4 group relative overflow-hidden cursor-pointer"
              style={{ textDecoration: 'none' }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `radial-gradient(circle at 0% 50%, ${color}18, transparent 70%)` }}
              />

              {/* External link icon — appears on hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color }}>
                <HiExternalLink size={14} />
              </div>

              {/* Official brand logo */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  boxShadow: `0 0 18px ${color}25`,
                  color,
                }}
              >
                {logo}
              </div>

              {/* Text */}
              <div className="relative z-10 flex-1 min-w-0">
                <h3 className="text-white font-bold leading-snug text-sm">
                  {title}
                </h3>
                <p className="text-slate-400 text-xs mt-1">{issuer}</p>
                <div className="flex items-center gap-1 mt-2">
                  <HiBadgeCheck size={13} style={{ color }} />
                  <span className="text-xs font-semibold" style={{ color }}>Verified</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Count badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center mt-10"
        >
          <div className="glass px-5 py-2 rounded-full flex items-center gap-2 text-sm text-slate-400">
            <HiBadgeCheck size={16} className="text-accent-blue" />
            <span>{certs.length} certifications earned</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
