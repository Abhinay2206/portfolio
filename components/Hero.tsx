import { ArrowDown, MessageSquare, Github, Linkedin, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"
import { TypeAnimation } from "react-type-animation"

// Magnetic button component for premium CTA effect
const MagneticButton = ({ children, className, onClick, ...props }: React.PropsWithChildren<{
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}>) => {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.12)
    y.set((e.clientY - centerY) * 0.12)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  const handleResumeDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Abhinay_Karthik_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLetsTalkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Premium gradient mesh background */}
      <div className="absolute inset-0 bg-mesh" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-subtle opacity-40" />

      {/* Animated gradient orbs with soft glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="max-w-5xl mx-auto px-6 py-16 relative z-10"
        style={{ opacity, scale, y }}
      >
        <div className="text-center space-y-8">
          {/* Status badge with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex justify-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-xl"
              style={{
                background: 'rgba(124, 58, 237, 0.08)',
                border: '1px solid rgba(124, 58, 237, 0.15)',
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(124, 58, 237, 0.15)' }}
            >
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-violet-700 dark:text-violet-300">Available for work</span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white">
                Hi, I&apos;m{" "}
                <span className="text-shimmer neon-glow inline-block animate-pulse-scale">
                  Abhinay
                </span>
              </span>
            </h1>

            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-600 dark:text-gray-300">
              <TypeAnimation
                sequence={[
                  "I Build Digital Experiences",
                  3000,
                  "I Create AI Solutions",
                  3000,
                  "I Design User Interfaces",
                  3000,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                cursor={true}
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Full-Stack Developer & ML Enthusiast crafting exceptional digital experiences
            through modern web applications and innovative machine learning solutions.
          </motion.p>

          {/* CTA Buttons with premium effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <MagneticButton
              onClick={handleResumeDownload}
              className="ripple-button group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-medium overflow-hidden"
              style={{
                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3), 0 2px 8px rgba(124, 58, 237, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <ArrowDown size={18} className="animate-soft-bounce" />
              <span className="relative z-10">Download Resume</span>
            </MagneticButton>

            <motion.button
              onClick={handleLetsTalkClick}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-zinc-800/60 border-[1.5px] border-violet-600/20 dark:border-violet-400/20 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
              whileHover={{
                y: -2,
                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                borderColor: 'rgba(124, 58, 237, 0.4)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare size={18} className="text-violet-600 dark:text-violet-400" />
              <span className="text-violet-600 dark:text-violet-400">Let&apos;s Talk</span>
            </motion.button>
          </motion.div>

          {/* Social Links with premium hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center justify-center gap-4 pt-6"
          >
            {[
              { icon: <Github size={20} />, href: "https://github.com/Abhinay2206", label: "GitHub" },
              { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/bakkeraabhinay", label: "LinkedIn" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-gray-600 dark:text-gray-300 transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-zinc-800/60 border border-black/5 dark:border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  boxShadow: '0 8px 20px rgba(124, 58, 237, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                }}
                whileTap={{ scale: 0.95 }}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with subtle animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full flex justify-center pt-2 border-2 border-violet-600/20 dark:border-violet-400/20 bg-white/40 dark:bg-zinc-800/40 backdrop-blur-sm"
        >
          <motion.div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
