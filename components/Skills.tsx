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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/40 via-transparent to-transparent dark:from-violet-900/10 animate-pulse-slow" />
        <motion.div 
          className="max-w-7xl mx-auto px-6 relative z-10"
          style={{ opacity, scale, y }}
        >
          <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div 
                key={category} 
                className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-violet-500 dark:hover:border-violet-500 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500" />
                <div className="absolute -inset-x-2 -inset-y-2 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill: string) => (
                      <span 
                        key={skill} 
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 hover:scale-110 hover:rotate-1 transition-all duration-300 cursor-default hover:shadow-lg hover:shadow-violet-500/20 hover:bg-violet-200 dark:hover:bg-violet-800/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    );
};