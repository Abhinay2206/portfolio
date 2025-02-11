'use client';

import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMoreDetailsClick = (title: string) => {
    if (isMounted) { 
      router.push(`/projectDetails?title=${encodeURIComponent(title)}`);
    }
  };

  return (
    <section ref={containerRef} className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-200/30 via-fuchsia-100/20 to-transparent dark:from-violet-800/20 dark:via-fuchsia-900/10" />
      <motion.div 
        className="max-w-7xl mx-auto px-6 relative z-10"
        style={{ opacity, scale, y }}
      >
        <h2 className="text-6xl font-bold mb-20 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent animate-gradient tracking-tight">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.slice(0, 2).map((project) => ( 
            <motion.div 
              key={project.title} 
              className="group relative overflow-hidden rounded-3xl transition-all duration-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100/50 dark:border-gray-800/50 hover:border-violet-400 dark:hover:border-violet-600"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-indigo-500/5 dark:from-violet-400/10 dark:via-fuchsia-400/10 dark:to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015] dark:opacity-[0.03] group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-700" />
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />
              
              <div className="p-10 relative">
                <motion.h3 
                  className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tech.map((tech) => (
                    <motion.span 
                      key={tech} 
                      className="px-5 py-2.5 rounded-2xl text-sm font-medium bg-violet-50/80 dark:bg-violet-900/20 text-violet-700 dark:text-violet-200 backdrop-blur-sm hover:bg-violet-100 dark:hover:bg-violet-800/30 transition-all duration-300 cursor-default"
                      whileHover={{ 
                        scale: 1.05, 
                        rotate: 2,
                        boxShadow: '0 10px 30px -10px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <motion.button 
                    onClick={() => handleMoreDetailsClick(project.title)} 
                    className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-lg font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                    whileHover={{ scale: 1.05, backgroundPosition: "right center" }}
                    whileTap={{ scale: 0.95 }}
                    style={{ backgroundSize: "200% auto" }}
                  >
                    <ExternalLink size={20} />
                    <span>More Details</span>
                  </motion.button>
                  <motion.a 
                    href={project.github} 
                    className="flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-violet-300 dark:border-violet-700 hover:border-violet-500 dark:hover:border-violet-600 text-lg font-medium backdrop-blur-sm"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} className="text-violet-600 dark:text-violet-400" />
                    <span className="text-violet-600 dark:text-violet-400">Source Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="flex justify-center mt-20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/projects"
            className="group flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white text-xl font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-500"
          >
            <span className="relative z-10">Explore All Projects</span>
            <motion.span 
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
