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
    <section ref={containerRef} id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-violet-100/40 via-transparent to-transparent dark:from-violet-900/10" />
      <motion.div 
        className="max-w-7xl mx-auto px-6 relative z-10"
        style={{ opacity, scale, y }}
      >
        <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                  placeholder="Your message..."
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
            <div className="space-y-8">
              <a href="mailto:bakkeraabhinay@gmail.com" className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={24} />
                </div>
                <span>bakkeraabhinay@gmail.com</span>
              </a>
              <a href="https://github.com/Abhinay2206" className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 group-hover:scale-110 transition-transform duration-300">
                  <Github size={24} />
                </div>
                <span>github.com/Abhinay2206</span>
              </a>
              <a href="https://linkedin.com/in/bakkeraabhinay" className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 group-hover:scale-110 transition-transform duration-300">
                  <Linkedin size={24} />
                </div>
                <span>linkedin.com/in/bakkeraabhinay</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
