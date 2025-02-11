import { Mail, Github, Linkedin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, FormEvent, useState } from 'react';

export const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:bakkeraabhinay@gmail.com?subject=Contact from ${formData.name}&body=From: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section ref={containerRef} id="contact" className="py-16 sm:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-100/40 via-transparent to-transparent dark:from-violet-900/10" />
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
        style={{ opacity, scale, y }}
      >
        <h2 className="text-4xl sm:text-6xl font-bold mb-8 sm:mb-16 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent animate-gradient tracking-tight text-center sm:text-left">
          Let&apos;s Connect
        </h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
          <motion.div 
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100/50 dark:border-gray-800/50 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-500"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-indigo-500/5 dark:from-violet-400/10 dark:via-fuchsia-400/10 dark:to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015] dark:opacity-[0.03] group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-500" />
            <div className="p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 border-0 focus:ring-2 focus:ring-violet-500 transition-all duration-300 placeholder:text-gray-400 text-base sm:text-lg"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 border-0 focus:ring-2 focus:ring-violet-500 transition-all duration-300 placeholder:text-gray-400 text-base sm:text-lg"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 border-0 focus:ring-2 focus:ring-violet-500 transition-all duration-300 placeholder:text-gray-400 text-base sm:text-lg"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <motion.button 
                  type="submit"
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white text-base sm:text-lg font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                  whileHover={{ scale: 1.02, backgroundPosition: "right center" }}
                  whileTap={{ scale: 0.98 }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div 
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100/50 dark:border-gray-800/50 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-500"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-indigo-500/5 dark:from-violet-400/10 dark:via-fuchsia-400/10 dark:to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015] dark:opacity-[0.03] group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-500" />
            <div className="p-6 sm:p-10 space-y-6 sm:space-y-8">
              <motion.a 
                href="mailto:bakkeraabhinay@gmail.com" 
                className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300 break-all">bakkeraabhinay@gmail.com</span>
              </motion.a>
              <motion.a 
                href="https://github.com/Abhinay2206" 
                className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 group-hover:scale-110 transition-transform duration-300">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300">github.com/Abhinay2206</span>
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/bakkeraabhinay" 
                className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 group-hover:scale-110 transition-transform duration-300">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300">linkedin.com/in/bakkeraabhinay</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
