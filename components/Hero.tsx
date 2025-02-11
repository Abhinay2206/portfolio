import { ArrowDown, MessageSquare, Github, Linkedin, Sparkles, Star, Code, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export const Hero = () => {
  const containerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Abhinay_Karthik_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const orbs = [
    { icon: <Code className="w-6 h-6" />, color: "from-violet-500/20" },
    { icon: <Star className="w-6 h-6" />, color: "from-fuchsia-500/20" },
    { icon: <Cpu className="w-6 h-6" />, color: "from-indigo-500/20" },
  ];

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden perspective-1000">
      {/* Animated background orbs */}
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute w-96 h-96 rounded-full bg-gradient-radial ${orb.color} to-transparent opacity-50 blur-xl`}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            delay: index * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${30 + index * 20}%`,
            top: `${20 + index * 15}%`,
          }}
        />
      ))}

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
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
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
          {/* Status badge with enhanced animation */}
          <motion.div 
            className="flex items-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="px-6 py-3 rounded-full text-base font-medium bg-violet-100/80 backdrop-blur-sm dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800/50 hover:bg-violet-200/80 dark:hover:bg-violet-800/50 transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
              whileHover={{ 
                scale: 1.05,
                rotate: [-1, 1, -1],
                transition: { duration: 0.3 }
              }}
            >
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Available for work
              </span>
            </motion.div>

            <div className="flex gap-4">
              {[
                { icon: <Github size={22} />, href: "https://github.com/Abhinay2206", rotate: 5 },
                { icon: <Linkedin size={22} />, href: "https://linkedin.com/in/bakkeraabhinay", rotate: -5 }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-3 rounded-xl bg-violet-100/80 backdrop-blur-sm dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: social.rotate,
                    backgroundColor: "rgba(139, 92, 246, 0.2)"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    {social.icon}
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
              <motion.div
                className="relative inline-block"
                whileHover={{ scale: 1.02 }}
              >
                <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 dark:from-violet-400 dark:via-fuchsia-300 dark:to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  <TypeAnimation
                    sequence={[
                      "Hi, I'm Abhinay Karthik",
                      3000,
                      "I Build Digital Experiences",
                      3000,
                      "I Create AI Solutions",
                      3000,
                    ]}
                    wrapper="span"
                    speed={40}
                    repeat={Infinity}
                    cursor={true}
                  />
                </span>
                <motion.span
                  className="absolute -z-10 blur-3xl opacity-50 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <TypeAnimation
                    sequence={[
                      "Hi, I'm Abhinay Karthik",
                      3000,
                      "I Build Digital Experiences",
                      3000,
                      "I Create AI Solutions",
                      3000,
                    ]}
                    wrapper="span"
                    speed={40}
                    repeat={Infinity}
                    cursor={false}
                  />
                </motion.span>
              </motion.div>
              <motion.span 
                className="block mt-8 text-4xl md:text-5xl text-gray-700 dark:text-gray-300"
                whileHover={{ scale: 1.02 }}
              >
                Full-Stack Developer & ML Enthusiast
              </motion.span>
            </h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Crafting exceptional digital experiences through modern web applications and pushing the boundaries of machine learning innovation.
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.button 
              onClick={handleResumeDownload}
              className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 text-white text-lg font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                backgroundPosition: "right center",
                boxShadow: "0 20px 40px -15px rgba(139, 92, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <ArrowDown size={20} className="animate-bounce" />
              <span className="relative z-10">Download Resume</span>
            </motion.button>

            <motion.button 
              className="group flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-violet-300 dark:border-violet-700 hover:border-violet-500 dark:hover:border-violet-600 text-lg font-medium backdrop-blur-sm relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(139, 92, 246, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
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

export default Hero;