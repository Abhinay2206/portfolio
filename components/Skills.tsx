import { Skills as SkillsType } from '../types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SkillsProps {
  skills: SkillsType;
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

    return (
      <section ref={containerRef} className="py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-200/30 via-fuchsia-100/20 to-transparent dark:from-violet-800/20 dark:via-fuchsia-900/10" />
        <motion.div 
          className="max-w-7xl mx-auto px-6 relative z-10"
          style={{ opacity, scale, y }}
        >
          <h2 className="text-6xl font-bold mb-16 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent animate-gradient tracking-tight">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <motion.div 
                key={category} 
                className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100/50 dark:border-gray-800/50 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-indigo-500/5 dark:from-violet-400/10 dark:via-fuchsia-400/10 dark:to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015] dark:opacity-[0.03] group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />
                <div className="p-8 relative">
                  <motion.h3 
                    className="text-2xl font-bold mb-8 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    {category}
                  </motion.h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill: string) => (
                      <motion.span 
                        key={skill} 
                        className="px-5 py-2.5 rounded-2xl text-sm font-medium bg-violet-50/80 dark:bg-violet-900/20 text-violet-700 dark:text-violet-200 backdrop-blur-sm hover:bg-violet-100 dark:hover:bg-violet-800/30 transition-all duration-300 cursor-default"
                        whileHover={{ 
                          scale: 1.05, 
                          rotate: 2,
                          boxShadow: '0 10px 30px -10px rgba(139, 92, 246, 0.3)'
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    );
};