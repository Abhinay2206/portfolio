import { ArrowDown, MessageSquare, Github, Linkedin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-200/50 via-fuchsia-200/30 to-transparent dark:from-violet-900/30 dark:via-fuchsia-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20 dark:via-black/10 dark:to-black/20"
          animate={{ 
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div 
        className="max-w-[90rem] mx-auto px-8 py-40 relative z-10"
        style={{ opacity, scale }}
      >
        <motion.div 
          className="space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center gap-6 flex-wrap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="px-4 py-2 rounded-full text-base font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Available for work
            </motion.div>
            <div className="flex gap-4">
              <motion.a 
                href="https://github.com/Abhinay2206" 
                className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/bakkeraabhinay" 
                className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-6xl font-bold leading-tight">
              <motion.span 
                className="block text-violet-600 dark:text-violet-400"
              >
                <TypeAnimation
                  sequence={[
                    "Hi, I'm Abhinay Karthik",
                    3000,
                  ]}
                  wrapper="span"
                  speed={25}
                  repeat={0}
                />
              </motion.span>
              <motion.span 
                className="block mt-6 text-4xl text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Full-Stack Developer & ML Enthusiast
              </motion.span>
            </h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Crafting exceptional digital experiences through modern web applications and pushing the boundaries of machine learning innovation.
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.a 
              href="/data/resume.pdf"
              download
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-violet-600 text-white text-base hover:bg-violet-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowDown size={18} />
              <span>Download Resume</span>
            </motion.a>
            <motion.button 
              className="flex items-center gap-3 px-6 py-3 rounded-lg border-2 border-violet-300 dark:border-violet-700 hover:border-violet-500 dark:hover:border-violet-600 text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare size={18} className="text-violet-600 dark:text-violet-400" />
              <a href="#contact" className="text-violet-600 dark:text-violet-400">Let&apos;s Talk</a>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};