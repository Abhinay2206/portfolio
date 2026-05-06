'use client';

import { ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectMockupCard } from './ProjectMockupCard';
import { ProjectModal } from './ProjectModal';

export interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  useEffect(() => { setIsMounted(true); }, []);

  return (
    <section ref={containerRef} id="projects" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-mesh opacity-40" />

      <motion.div className="max-w-6xl mx-auto px-6 relative z-10" style={{ opacity, y }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            Hover to tilt · click Details to expand
          </p>
        </motion.div>

        {/* Project mockup grid */}
        {isMounted && (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectMockupCard
                key={project.title}
                project={project}
                index={index}
                onExpand={setSelectedProject}
              />
            ))}
          </div>
        )}

        {/* View all */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.a
            href="/projects"
            className="ripple-button group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium overflow-hidden shadow-[0_8px_24px_rgba(124,58,237,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]"
            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 12px 30px rgba(124,58,237,0.35)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">Explore All Projects</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Detail modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Projects;
