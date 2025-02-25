import { Mail, Github, Linkedin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

  const socialLinks = [
    {
      icon: <Mail className="w-7 h-7" />,
      title: "Email",
      link: "mailto:bakkeraabhinay@gmail.com",
      display: "bakkeraabhinay@gmail.com",
      color: "from-violet-600 to-fuchsia-600"
    },
    {
      icon: <Github className="w-7 h-7" />,
      title: "GitHub", 
      link: "https://github.com/Abhinay2206",
      display: "github.com/Abhinay2206",
      color: "from-fuchsia-600 to-indigo-600"
    },
    {
      icon: <Linkedin className="w-7 h-7" />,
      title: "LinkedIn",
      link: "https://linkedin.com/in/bakkeraabhinay",
      display: "linkedin.com/in/bakkeraabhinay", 
      color: "from-indigo-600 to-violet-600"
    }
  ];

  return (
    <section ref={containerRef} id="contact" className="py-32 sm:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-violet-200/30 via-transparent to-transparent dark:from-violet-800/20" />
      
      <motion.div 
        className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10"
        style={{ opacity, scale, y }}
      >
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent animate-gradient tracking-tight"
          >
            Let&apos;s Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-300"
          >
            Feel free to reach out through any of these platforms
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.title}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg dark:shadow-2xl border border-gray-100/50 dark:border-gray-700/50 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-500"
              whileHover={{ 
                scale: 1.03,
                y: -5,
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-[0.07] dark:group-hover:opacity-[0.1] transition-opacity duration-500" />
              
              <div className="p-8 sm:p-10 flex flex-col items-center text-center space-y-5">
                <motion.div 
                  className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-400/10 dark:to-fuchsia-400/10 text-violet-600 dark:text-violet-400"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                >
                  {social.icon}
                </motion.div>
                
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {social.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {social.display}
                  </p>
                </div>

                <motion.div
                  className="flex items-center space-x-2 text-violet-600 dark:text-violet-400 font-medium"
                  whileHover={{ x: 5 }}
                >
                  <span>Connect</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};