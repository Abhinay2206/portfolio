import { ArrowDown, MessageSquare, Github, Linkedin, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  const fallVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        damping: 12,
        stiffness: 100,
        bounce: 0.3
      }
    })
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/data/resume.pdf';
    link.download = 'Abhinay_Karthik_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden perspective-1000">
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-300/40 via-fuchsia-300/20 to-transparent dark:from-violet-800/30 dark:via-fuchsia-800/20 animate-pulse" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] dark:opacity-[0.06] animate-[pulse_8s_ease-in-out_infinite]" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/30 dark:via-black/20 dark:to-black/30 backdrop-blur-[2px]"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_20%,_rgba(139,92,246,0.1)_70%)]" />
      </motion.div>

      <motion.div 
        className="max-w-[90rem] mx-auto px-8 py-40 relative z-10"
        style={{ opacity, scale, y }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div 
          className="space-y-16"
          style={{ 
            filter: `blur(${blur}px)`,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.div 
            className="flex items-center gap-6 flex-wrap"
            variants={fallVariants}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="px-6 py-3 rounded-full text-base font-medium bg-violet-100/80 backdrop-blur-sm dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800/50 hover:bg-violet-200/80 dark:hover:bg-violet-800/50 transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
              whileHover={{ 
                scale: 1.05,
                rotate: -1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              variants={floatVariants}
              animate="animate"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                ✨ Available for work
              </span>
            </motion.div>
            <div className="flex gap-4">
              <motion.a 
                href="https://github.com/Abhinay2206" 
                className="p-3 rounded-xl bg-violet-100/80 backdrop-blur-sm dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  backgroundColor: "rgba(139, 92, 246, 0.2)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={22} className="transform hover:rotate-12 transition-transform" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/bakkeraabhinay" 
                className="p-3 rounded-xl bg-violet-100/80 backdrop-blur-sm dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: -5,
                  backgroundColor: "rgba(139, 92, 246, 0.2)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={22} className="transform hover:-rotate-12 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-10"
            variants={fallVariants}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-6xl font-bold leading-tight tracking-tight">
              <motion.span 
                className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 dark:from-violet-400 dark:via-fuchsia-300 dark:to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
                whileHover={{ scale: 1.02 }}
              >
                <TypeAnimation
                  sequence={[
                    "Hi, I'm Abhinay Karthik",
                    3000,
                    "I Build Digital Experiences",
                    3000,
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                  cursor={true}
                />
              </motion.span>
              <motion.span 
                className="block mt-8 text-5xl text-gray-700 dark:text-gray-300"
                variants={fallVariants}
                custom={2}
                whileHover={{ scale: 1.02 }}
              >
                Full-Stack Developer & ML Enthusiast
              </motion.span>
            </h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed"
              variants={fallVariants}
              custom={3}
            >
              Crafting exceptional digital experiences through modern web applications and pushing the boundaries of machine learning innovation.
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-6 pt-8"
            variants={fallVariants}
            custom={4}
            initial="hidden"
            animate="visible"
          >
            <motion.button 
              onClick={handleDownloadResume}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 text-white text-lg font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
              whileHover={{ 
                scale: 1.05, 
                backgroundPosition: "right center",
                boxShadow: "0 20px 40px -15px rgba(139, 92, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundSize: "200% auto" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute inset-0 bg-white/10 rounded-xl"
                  />
                )}
              </AnimatePresence>
              <ArrowDown size={20} className="animate-bounce" />
              <span>Download Resume</span>
            </motion.button>
            <motion.button 
              className="flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-violet-300 dark:border-violet-700 hover:border-violet-500 dark:hover:border-violet-600 text-lg font-medium backdrop-blur-sm relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(139, 92, 246, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ x: [-100, 400] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
              <MessageSquare size={20} className="text-violet-600 dark:text-violet-400 transform group-hover:rotate-12 transition-transform" />
              <a href="#contact" className="text-violet-600 dark:text-violet-400">Let&apos;s Talk</a>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};