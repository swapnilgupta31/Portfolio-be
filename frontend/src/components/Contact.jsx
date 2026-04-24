import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const info = [
  { icon: <HiPhone size={20} />, label: 'Phone', value: '+91 8979180931', href: 'tel:+918979180931', color: '#3b82f6' },
  { icon: <HiMail size={20} />, label: 'Email', value: 'swapnilgupta.se@gmail.com', href: 'mailto:swapnilgupta.se@gmail.com', color: '#8b5cf6' },
  { icon: <FaWhatsapp size={20} />, label: 'WhatsApp', value: 'Chat on WhatsApp', href: 'https://wa.me/918979180931', color: '#25d366' },
  { icon: <HiLocationMarker size={20} />, label: 'Location', value: 'Bengaluru, India', href: null, color: '#06b6d4' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm]     = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sending'|'success'|'error'

  const validate = () => {
    const e = {};
    if (!form.name.trim())               e.name    = 'Name is required';
    if (!form.email.trim())              e.email   = 'Email is required';
    else if (!EMAIL_RE.test(form.email)) e.email   = 'Enter a valid email';
    if (!form.phone.trim())              e.phone   = 'Phone is required';
    if (!form.message.trim())            e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      const apiBase = process.env.REACT_APP_API_URL || '';
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    `w-full glass px-4 py-3 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all duration-200 focus:border-accent-blue/60 focus:shadow-glow ${
      errors[field] ? 'border-red-500/60' : 'border-transparent'
    }`;

  return (
    <section id="contact" className="py-24" style={{ background: 'linear-gradient(180deg,#1a1f2e,#0f172a)' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="section-title"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle"
        >
          Have a project in mind? Let's talk.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <p className="text-slate-400 leading-relaxed mb-6">
              I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi — my inbox is always open!
            </p>
            {info.map(({ icon, label, value, href, color }, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, color }}>
                  {icon}
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
                  {href
                    ? <a href={href} target="_blank" rel="noreferrer" className="text-slate-200 text-sm hover:text-white font-medium transition-colors">{value}</a>
                    : <p className="text-slate-200 text-sm font-medium">{value}</p>
                  }
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3 glass-card p-8"
          >
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>
                ✅ Message sent! You'll receive a confirmation email shortly.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
                ❌ Something went wrong. Please try again or email directly.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="Your Name" className={inputClass('name')} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="Email Address" className={inputClass('email')} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <input name="phone" value={form.phone} onChange={handleChange}
                  placeholder="Phone Number" className={inputClass('phone')} />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange}
                  placeholder="Your message..." className={`${inputClass('message')} resize-none`} />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
              >
                {status === 'sending' ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                ) : (
                  <><HiPaperAirplane size={18} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
