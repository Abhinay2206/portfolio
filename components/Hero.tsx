'use client';

import { ArrowDown, MessageSquare, Github, Linkedin, ChevronDown } from "lucide-react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { TypeAnimation } from "react-type-animation";
import Marquee from "react-fast-marquee";

/* ── Constants ─────────────────────────────────────── */
const NAME_LETTERS = "ABHINAY".split("");

const FLOATING_TAGS = [
  { name: "React", color: "#61DAFB", x: 72, y: 12, dur: 6.5, delay: 0 },
  { name: "Node.js", color: "#68A063", x: 88, y: 35, dur: 7.8, delay: 1.2 },
  { name: "TypeScript", color: "#3B82F6", x: 62, y: 58, dur: 9.0, delay: 0.6 },
  { name: "MongoDB", color: "#4ADE80", x: 82, y: 72, dur: 6.2, delay: 2.1 },
  { name: "Python", color: "#FCD34D", x: 55, y: 28, dur: 8.4, delay: 0.3 },
  { name: "Next.js", color: "#a5b4fc", x: 91, y: 55, dur: 7.0, delay: 1.8 },
  { name: "TensorFlow", color: "#FB923C", x: 68, y: 82, dur: 10, delay: 0.9 },
  { name: "PostgreSQL", color: "#60a5fa", x: 76, y: 44, dur: 7.5, delay: 1.5 },
  { name: "Express", color: "#94a3b8", x: 58, y: 90, dur: 8.8, delay: 2.4 },
  { name: "Scikit-learn", color: "#f472b6", x: 93, y: 18, dur: 6.8, delay: 0.7 },
];

const MARQUEE_ITEMS = [
  "React", "Node.js", "TypeScript", "MongoDB", "Python", "Next.js",
  "TensorFlow", "PostgreSQL", "Express", "Tailwind CSS", "Docker",
  "Git", "Scikit-learn", "Flask", "Prisma", "Socket.io",
];

/* ── Magnetic button ───────────────────────────────── */
const MagBtn = ({ children, className, onClick, style }: React.PropsWithChildren<{ className?: string; onClick?: () => void; style?: React.CSSProperties }>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 16 });
  const sy = useSpring(y, { stiffness: 160, damping: 16 });
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy, ...style }}
      onMouseMove={e => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.14); y.set((e.clientY - r.top - r.height / 2) * 0.14); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick} className={className} whileTap={{ scale: 0.97 }}
    >{children}</motion.button>
  );
};

/* ── Hero ──────────────────────────────────────────── */
export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yAnim = useTransform(scrollYProgress, [0, 0.6], [0, 100]);

  /* theme detection */
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains('dark'));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  /* mouse spotlight */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - left) / width) * 100, y: ((e.clientY - top) / height) * 100 });
  }, []);

  const downloadCV = () => { const a = document.createElement("a"); a.href = "/resume.pdf"; a.download = "Abhinay_Karthik_Resume.pdf"; a.click(); };
  const toContact = (e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); };
  const toNext = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  /* theme tokens */
  const bg = isDark ? '#03000f' : '#f8f7ff';
  const orb1 = isDark ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.10)';
  const orb2 = isDark ? 'rgba(79,70,229,0.20)' : 'rgba(79,70,229,0.08)';
  const spotLight = isDark
    ? `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.10) 0%, transparent 70%)`
    : `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.06) 0%, transparent 70%)`;
  const dotColor = isDark ? 'rgba(139,92,246,0.45)' : 'rgba(139,92,246,0.20)';
  const nameCol1 = isDark ? '#ffffff' : '#1e1b4b';
  const nameCol2 = isDark ? '#a78bfa' : '#7c3aed';
  const subtitleC = isDark ? '#71717a' : '#9ca3af';
  const roleGrad = isDark ? 'linear-gradient(90deg,#a5b4fc,#7c3aed)' : 'linear-gradient(90deg,#4f46e5,#7c3aed)';
  const descCol = isDark ? '#a1a1aa' : '#6b7280';
  const badgeBg = isDark ? 'rgba(109,40,217,0.18)' : 'rgba(109,40,217,0.08)';
  const badgeBord = isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)';
  const badgeText = isDark ? '#c4b5fd' : '#6d28d9';
  const sec2Bg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
  const sec2Bord = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.10)';
  const sec2Text = isDark ? '#d4d4d8' : '#374151';
  const socialBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const socialBrd = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.09)';
  const socialCol = isDark ? '#a1a1aa' : '#6b7280';
  const statVal = isDark ? '#ffffff' : '#111827';
  const statLbl = isDark ? '#52525b' : '#9ca3af';
  const divCol = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const mqdText = isDark ? '#52525b' : '#9ca3af';
  const mqdDot = isDark ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.25)';
  const scrollC = isDark ? '#3f3f46' : '#d1d5db';
  const botFade = isDark ? '#03000f' : '#f8f7ff';
  const tagBg = isDark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.8)';

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* ── Layered background ── */}
      <div className="absolute inset-0" style={{ background: bg }}>
        {/* Mouse spotlight */}
        <div className="absolute inset-0 transition-all duration-300 pointer-events-none" style={{ background: spotLight }} />
        {/* Aurora orb 1 */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 900, height: 900, background: `radial-gradient(circle, ${orb1} 0%, transparent 65%)`, filter: 'blur(80px)', top: '-20%', left: '-15%' }}
          animate={{ x: [0, 50, 0], y: [0, 35, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        {/* Aurora orb 2 */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 700, height: 700, background: `radial-gradient(circle, ${orb2} 0%, transparent 65%)`, filter: 'blur(80px)', bottom: '-15%', right: '-10%' }}
          animate={{ x: [0, -40, 0], y: [0, -45, 0] }} transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.18, backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`, backgroundSize: '36px 36px' }} />
        {/* Horizontal lines */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04, backgroundImage: 'linear-gradient(0deg, transparent calc(100% - 1px), rgba(139,92,246,0.5) 100%)', backgroundSize: '100% 80px' }} />
      </div>

      {/* ── Main content ── */}
      <motion.div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 pb-4" style={{ opacity, y: yAnim }}>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4 w-full">

          {/* LEFT: text */}
          <div className="flex-1 lg:max-w-[55%] text-center lg:text-left space-y-6">

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{ background: badgeBg, border: `1px solid ${badgeBord}`, color: badgeText }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities
              </span>
            </motion.div>

            {/* Hi label */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="text-xs font-light tracking-[0.5em] uppercase mb-3" style={{ color: subtitleC }}>
                Hi, I&apos;m
              </div>

              {/* Staggered letters */}
              <div className="flex items-end justify-center lg:justify-start gap-[1px] sm:gap-0.5">
                {NAME_LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="font-black leading-none select-none cursor-default"
                    style={{
                      fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                      display: 'inline-block',
                      backgroundImage: hoveredLetter === i
                        ? 'linear-gradient(135deg,#f472b6,#a78bfa,#60a5fa)'
                        : `linear-gradient(135deg, ${nameCol1} 0%, ${nameCol2} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: hoveredLetter === i ? 'drop-shadow(0 0 20px rgba(167,139,250,0.8))' : 'none',
                      transition: 'filter 0.2s',
                    }}
                    initial={{ opacity: 0, y: 60, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 200, damping: 16 }}
                    whileHover={{ scale: 1.15, y: -8 }}
                    onHoverStart={() => setHoveredLetter(i)}
                    onHoverEnd={() => setHoveredLetter(null)}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Role typewriter */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              className="text-lg sm:text-xl md:text-2xl font-semibold"
              style={{ backgroundImage: roleGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              <TypeAnimation
                sequence={["Full-Stack Developer", 2400, "ML Engineer", 2400, "UI / UX Craftsman", 2400, "Open Source Builder", 2400]}
                wrapper="span" speed={50} repeat={Infinity} cursor
              />
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
              className="text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed" style={{ color: descCol }}>
              I architect fast, beautiful, intelligent products - from scalable backends to pixel-perfect interfaces.
            </motion.p>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <MagBtn onClick={downloadCV}
                className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-semibold text-sm overflow-hidden w-full sm:w-auto justify-center"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9,#4f46e5)', boxShadow: '0 0 0 1px rgba(139,92,246,0.35), 0 8px 32px rgba(109,40,217,0.4)' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <ArrowDown size={15} className="relative z-10" />
                <span className="relative z-10">Download Resume</span>
              </MagBtn>
              <motion.button onClick={toContact}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-semibold w-full sm:w-auto justify-center"
                style={{ background: sec2Bg, border: `1px solid ${sec2Bord}`, color: sec2Text }}
                whileHover={{ background: 'rgba(139,92,246,0.10)', borderColor: 'rgba(139,92,246,0.35)', boxShadow: '0 0 24px rgba(139,92,246,0.12)' }}
                whileTap={{ scale: 0.97 }}>
                <MessageSquare size={15} /> Let&apos;s Talk
              </motion.button>
            </motion.div>

            {/* Socials + stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-1">
              <div className="flex gap-2.5">
                {[{ icon: <Github size={16} />, href: "https://github.com/Abhinay2206", label: "GitHub" },
                { icon: <Linkedin size={16} />, href: "https://linkedin.com/in/bakkeraabhinay", label: "LinkedIn" }]
                  .map(s => (
                    <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-xl"
                      style={{ background: socialBg, border: `1px solid ${socialBrd}`, color: socialCol }}
                      whileHover={{ scale: 1.15, color: '#7c3aed', background: 'rgba(124,58,237,0.12)', borderColor: 'rgba(124,58,237,0.35)', y: -2 }}
                      whileTap={{ scale: 0.93 }}>
                      {s.icon}
                    </motion.a>
                  ))}
              </div>
              <div className="flex items-center gap-4">
                {[['15+', 'Projects'], ['2+', 'Years'], ['7+', 'Technologies']].map(([val, lbl], i) => (
                  <div key={lbl} className="flex items-center gap-4">
                    {i > 0 && <div className="w-px h-6" style={{ background: divCol }} />}
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 + i * 0.1 }}>
                      <div className="text-base font-bold" style={{ color: statVal }}>{val}</div>
                      <div className="text-[10px] uppercase tracking-widest" style={{ color: statLbl }}>{lbl}</div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Floating tech chips */}
          <motion.div
            className="flex-1 relative hidden lg:block"
            style={{ height: '500px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          >
            {FLOATING_TAGS.map((tag, i) => (
              <motion.div
                key={tag.name}
                className="absolute"
                style={{ left: `${tag.x - 50}%`, top: `${tag.y}%` }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  y: [0, -18, 0],
                  x: [0, i % 2 === 0 ? 8 : -8, 0],
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  y: { delay: 0.8 + tag.delay, duration: tag.dur, repeat: Infinity, ease: 'easeInOut' },
                  x: { delay: 0.8 + tag.delay, duration: tag.dur * 1.3, repeat: Infinity, ease: 'easeInOut' },
                  scale: { delay: 0.8 + tag.delay, duration: tag.dur, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { delay: 0.4 + i * 0.1, duration: 0.5 },
                }}
                whileHover={{ scale: 1.18, y: -4, zIndex: 10 }}
              >
                <div className="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-default"
                  style={{
                    background: tagBg,
                    border: `1px solid ${tag.color}35`,
                    color: tag.color,
                    backdropFilter: 'blur(12px)',
                    boxShadow: `0 4px 20px ${tag.color}20, 0 0 0 1px ${tag.color}12`,
                    textShadow: isDark ? `0 0 12px ${tag.color}80` : 'none',
                  }}
                >
                  {tag.name}
                </div>
              </motion.div>
            ))}

            {/* Central pulsing ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[1, 1.5, 2].map((scale, i) => (
                <motion.div key={i} className="absolute rounded-full border"
                  style={{ width: 180, height: 180, borderColor: isDark ? `rgba(124,58,237,${0.15 - i * 0.04})` : `rgba(124,58,237,${0.1 - i * 0.03})` }}
                  animate={{ scale: [scale, scale + 0.12, scale], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                />
              ))}
              <motion.div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-black"
                style={{ background: isDark ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.3)', color: isDark ? '#c4b5fd' : '#7c3aed', boxShadow: '0 0 40px rgba(124,58,237,0.2)' }}
                animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                &lt;/&gt;
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Infinite tech marquee ── */}
      <motion.div className="relative z-10 py-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to right, ${botFade} 0%, transparent 15%, transparent 85%, ${botFade} 100%)`, zIndex: 2 }} />
        <Marquee speed={35} gradient={false} className="overflow-hidden">
          {MARQUEE_ITEMS.map((item) => (
            <span key={item} className="inline-flex items-center gap-2 mx-5 text-xs font-medium" style={{ color: mqdText }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: mqdDot }} />
              {item}
            </span>
          ))}
        </Marquee>
      </motion.div>

      {/* Bottom section fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 z-10 pointer-events-none" style={{ background: `linear-gradient(to top, ${botFade}, transparent)` }} />

      {/* Scroll hint */}
      <motion.button onClick={toNext} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 hover:text-violet-500 transition-colors"
        style={{ color: scrollC }}>
        <span className="text-[9px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={15} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
