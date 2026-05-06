'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Maximize2, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectMockupCardProps {
  project: Project;
  index: number;
  onExpand: (project: Project) => void;
}

const ACCENTS = [
  { glow: '#7c3aed', tag: 'from-violet-600 to-purple-600' },
  { glow: '#2563eb', tag: 'from-blue-600 to-cyan-600' },
  { glow: '#059669', tag: 'from-emerald-600 to-teal-600' },
  { glow: '#d97706', tag: 'from-amber-600 to-orange-600' },
  { glow: '#dc2626', tag: 'from-rose-600 to-pink-600' },
];

const TECH_LAYER_LABELS = [
  { key: 'React', label: 'Frontend' },
  { key: 'Next', label: 'Frontend' },
  { key: 'Node', label: 'Backend' },
  { key: 'Express', label: 'Backend' },
  { key: 'Flask', label: 'Backend' },
  { key: 'MongoDB', label: 'Database' },
  { key: 'PostgreSQL', label: 'Database' },
  { key: 'TensorFlow', label: 'AI / ML' },
  { key: 'PyTorch', label: 'AI / ML' },
  { key: 'scikit', label: 'AI / ML' },
];

function getArchLayers(tech: string[]): string[] {
  const layers = new Set<string>();
  tech.forEach(t => {
    const match = TECH_LAYER_LABELS.find(l => t.toLowerCase().includes(l.key.toLowerCase()));
    if (match) layers.add(match.label);
  });
  return Array.from(layers).slice(0, 3);
}

export const ProjectMockupCard: React.FC<ProjectMockupCardProps> = ({ project, index, onExpand }) => {
  const accent = ACCENTS[index % ACCENTS.length];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 180, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 180, damping: 20 });
  const glowOpacity = useTransform(springRotX, [-12, 0, 12], [0.35, 0.12, 0.35]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rotY.set(((e.clientX - rect.left) / rect.width - 0.5) * 18);
    rotX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 12);
  };

  const handleMouseLeave = () => { rotX.set(0); rotY.set(0); setIsHovered(false); };

  const archLayers = getArchLayers(project.tech);

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer select-none"
      style={{ perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 140, damping: 14 }}
    >
      <motion.div
        style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Glow */}
        <motion.div
          className="absolute -inset-3 rounded-[28px] blur-2xl pointer-events-none hidden dark:block"
          style={{ backgroundColor: accent.glow, opacity: glowOpacity }}
        />
        <motion.div
          className="absolute -inset-3 rounded-[28px] blur-xl pointer-events-none dark:hidden"
          style={{ backgroundColor: accent.glow, opacity: useTransform(glowOpacity, v => v * 0.4) }}
        />

        {/* Card frame */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl
          border border-gray-200/80 bg-white/95
          dark:border-white/10 dark:bg-zinc-900/95
          backdrop-blur-xl
          dark:shadow-2xl"
        >
          {/* Browser-style top bar */}
          <div className="flex items-center justify-between px-4 py-2.5
            bg-gray-100/90 border-b border-gray-200/60
            dark:bg-zinc-800/90 dark:border-white/5"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/80" />
            </div>

            {/* URL bar */}
            <div className="flex-1 mx-4">
              <div className="mx-auto max-w-[200px] px-3 py-1 rounded-lg text-[10px] font-mono truncate text-center
                bg-gray-200/70 text-gray-500 border border-gray-300/50
                dark:bg-zinc-700/60 dark:text-zinc-400 dark:border-white/5"
              >
                {project.demo && project.demo !== 'https://project2.demo' && project.demo !== 'https://eventmaster.demo'
                  ? project.demo.replace('https://', '')
                  : 'github.com/' + project.github.split('github.com/')[1]
                }
              </div>
            </div>

            <button
              onClick={() => onExpand(project)}
              className="p-1.5 rounded-lg transition-all
                text-gray-400 hover:text-gray-700 hover:bg-gray-200/60
                dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
              title="Expand details"
            >
              <Maximize2 size={13} />
            </button>
          </div>

          {/* Accent strip */}
          <div className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r ${accent.tag}`} style={{ top: '40px' }} />

          {/* Content */}
          <div className="p-6 min-h-[220px] flex flex-col justify-between">
            <div>
              {/* Title */}
              <motion.h3
                className="text-lg font-bold mb-2.5 leading-tight line-clamp-2"
                animate={{
                  color: isHovered
                    ? '#7c3aed'
                    : undefined,
                }}
                transition={{ duration: 0.3 }}
                style={{ color: isHovered ? '#7c3aed' : undefined }}
              // Use className for base (dark: handles dark mode, hover handles light)
              >
                <span className="text-gray-900 dark:text-white" style={isHovered ? { color: '#a78bfa' } : {}}>
                  {project.title}
                </span>
              </motion.h3>

              {/* Description */}
              <p className="text-sm leading-relaxed line-clamp-2 mb-4 text-gray-500 dark:text-zinc-400">
                {project.description}
              </p>

              {/* Architecture layers */}
              {archLayers.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Layers size={12} className="text-gray-400 dark:text-zinc-500" />
                  {archLayers.map((layer) => (
                    <span key={layer}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold
                        bg-violet-100 text-violet-700 border border-violet-200
                        dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/20"
                    >
                      {layer}
                    </span>
                  ))}
                </div>
              )}

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium
                      bg-gray-100 text-gray-600 border border-gray-200
                      dark:bg-white/5 dark:text-zinc-300 dark:border-white/10"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] text-gray-400 dark:text-zinc-500">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-5">
              <motion.button
                onClick={() => onExpand(project)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r ${accent.tag} text-white text-xs font-semibold shadow-md`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Maximize2 size={12} /> Details
              </motion.button>

              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all
                  bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600
                  dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-zinc-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github size={12} /> Code
              </motion.a>

              {project.demo && project.demo !== 'https://project2.demo' && project.demo !== 'https://eventmaster.demo' && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all
                    bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600
                    dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-zinc-300"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ExternalLink size={12} /> Demo
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Laptop hinge */}
        <div
          className="h-3 mx-6 rounded-b-xl border border-t-0
            bg-gray-200/80 border-gray-200/50
            dark:bg-zinc-800/60 dark:border-white/5"
          style={{ transform: 'translateZ(-4px) translateY(-2px)', transformStyle: 'preserve-3d' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectMockupCard;
