'use client';

import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt3D } from './Tilt3D';
import { GradientBorder } from './GradientBorder';

export interface ProjectsProps {
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

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMoreDetailsClick = (title: string) => {
    if (isMounted) {
      router.push(`/projectDetails?title=${encodeURIComponent(title)}`);
    }
  };

  return (
    <section ref={containerRef} id="projects" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-mesh opacity-40" />

      <motion.div
        className="max-w-5xl mx-auto px-6 relative z-10"
        style={{ opacity, y }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((project, index) => {
            const isFeatured = index < 2; // First two are featured

            const CardContent = (
              <motion.div
                className="group relative p-6 rounded-2xl transition-all duration-500 overflow-hidden bg-white/75 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] h-full"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 150,
                  damping: 12
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700" />
                </div>

                <div className="relative z-10">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-300 bg-gradient-to-br from-violet-100/80 to-indigo-100/60 dark:from-violet-900/30 dark:to-indigo-900/20 text-violet-600 dark:text-violet-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/4 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                      >
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => handleMoreDetailsClick(project.title)}
                      className="ripple-button group/btn relative flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium overflow-hidden shadow-[0_4px_12px_rgba(124,58,237,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 6px 20px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                      <span className="relative z-10">View Details</span>
                      <ExternalLink size={14} className="relative z-10" />
                    </motion.button>

                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 text-sm font-medium transition-all duration-300 bg-white/60 dark:bg-zinc-800/60 border border-black/6 dark:border-white/6 shadow-[0_2px_4px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );

            return (
              <div key={project.title}>
                {isFeatured ? (
                  <GradientBorder className="rounded-2xl">
                    <Tilt3D intensity={8} scale={1.02}>
                      {CardContent}
                    </Tilt3D>
                  </GradientBorder>
                ) : (
                  <Tilt3D intensity={8} scale={1.02}>
                    {CardContent}
                  </Tilt3D>
                )}
              </div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.a
            href="/projects"
            className="ripple-button group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium overflow-hidden shadow-[0_8px_24px_rgba(124,58,237,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]"
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: '0 12px 30px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">Explore All Projects</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
