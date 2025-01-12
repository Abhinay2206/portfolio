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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/40 via-transparent to-transparent dark:from-violet-900/10" />
      <motion.div 
        className="max-w-7xl mx-auto px-6 relative z-10"
        style={{ opacity, scale, y }}
      >
        <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.title} 
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-violet-500 dark:hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500" />
              <div className="absolute -inset-x-2 -inset-y-2 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
              
              <div className="p-8 relative">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-4 py-1.5 rounded-full text-sm bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 hover:scale-110 hover:rotate-1 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => handleMoreDetailsClick(project.title)} 
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all duration-300"
                  >
                    <ExternalLink size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    More Details
                  </button>
                  <a 
                    href={project.github} 
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <Github size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <a
            href="/projects"
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white overflow-hidden shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">View More Projects</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
