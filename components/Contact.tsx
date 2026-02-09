import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  const socialLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      link: "mailto:bakkeraabhinay@gmail.com",
      display: "bakkeraabhinay@gmail.com",
    },
    {
      icon: <Github className="w-5 h-5" />,
      title: "GitHub",
      link: "https://github.com/Abhinay2206",
      display: "github.com/Abhinay2206",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      title: "LinkedIn",
      link: "https://linkedin.com/in/bakkeraabhinay",
      display: "linkedin.com/in/bakkeraabhinay",
    }
  ];

  return (
    <section ref={containerRef} id="contact" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-mesh opacity-50" />

      <motion.div
        className="max-w-4xl mx-auto px-6 relative z-10"
        style={{ opacity, y }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.title}
              href={social.link}
              target={social.title !== 'Email' ? '_blank' : undefined}
              rel={social.title !== 'Email' ? 'noopener noreferrer' : undefined}
              className="group relative p-5 rounded-xl text-center transition-all duration-500 overflow-hidden bg-white/75 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 180,
                damping: 13
              }}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 0 30px rgba(124, 58, 237, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div
                  className="inline-flex items-center justify-center p-3 rounded-xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 bg-gradient-to-br from-violet-100/80 to-indigo-100/60 dark:from-violet-900/30 dark:to-indigo-900/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.2)]"
                >
                  <span className="text-violet-600 dark:text-violet-400">{social.icon}</span>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {social.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 truncate">
                  {social.display}
                </p>

                <div className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400">
                  <span>Connect</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mt-16 pt-8 border-t border-gray-200/50 dark:border-zinc-800/50"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Abhinay Karthik. Built with Next.js & Tailwind CSS.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;