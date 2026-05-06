'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Layers } from 'lucide-react';
import { useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ARCH_LAYERS: Record<string, { label: string; color: string }[]> = {
  'SafeStreets - Road Damage Detection and Management System': [
    { label: 'React + Material UI', color: '#61DAFB' },
    { label: 'Node.js + Express', color: '#68A063' },
    { label: 'MongoDB', color: '#47A248' },
    { label: 'Vision Transformer', color: '#a78bfa' },
  ],
  'BonkBot': [
    { label: 'React Dashboard', color: '#61DAFB' },
    { label: 'Node.js + Express', color: '#68A063' },
    { label: 'PostgreSQL', color: '#60a5fa' },
    { label: 'Solana Web3.js', color: '#9945FF' },
  ],
  'Real-Time Inventory Management System': [
    { label: 'React + Material UI', color: '#61DAFB' },
    { label: 'Node.js + Socket.io', color: '#68A063' },
    { label: 'MongoDB', color: '#47A248' },
    { label: 'TensorFlow + scikit', color: '#FF6F00' },
  ],
  'CNN Based Lake Water Quality Classification': [
    { label: 'React Frontend', color: '#61DAFB' },
    { label: 'Flask API', color: '#34d399' },
    { label: 'MongoDB + Redis', color: '#47A248' },
    { label: 'PyTorch CNN', color: '#ee4c2c' },
  ],
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900/95 backdrop-blur-2xl shadow-2xl z-10"
            style={{ boxShadow: '0 0 60px rgba(124,58,237,0.2), 0 20px 60px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {/* Header gradient bar */}
            <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600" />

            <div className="p-6 sm:p-8">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10"
              >
                <X size={16} />
              </button>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2 pr-8 leading-tight">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {project.projectDetails?.overview || project.description}
              </p>

              {/* Architecture Layers */}
              {ARCH_LAYERS[project.title] && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers size={14} className="text-violet-400" />
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Architecture Layers</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ARCH_LAYERS[project.title].map((layer) => (
                      <span
                        key={layer.label}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                        style={{
                          color: layer.color,
                          borderColor: `${layer.color}40`,
                          backgroundColor: `${layer.color}10`,
                          boxShadow: `0 0 12px ${layer.color}15`,
                        }}
                      >
                        {layer.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-900/30 text-violet-300 border border-violet-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenges & Solutions */}
              {project.projectDetails?.challenges && (
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                    <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">Challenges</div>
                    <ul className="space-y-2">
                      {project.projectDetails.challenges.slice(0, 3).map((c, i) => (
                        <li key={i} className="text-xs text-gray-400 flex gap-2">
                          <span className="text-red-400 mt-0.5">·</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/15">
                    <div className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-3">Solutions</div>
                    <ul className="space-y-2">
                      {project.projectDetails.solutions?.slice(0, 3).map((s, i) => (
                        <li key={i} className="text-xs text-gray-400 flex gap-2">
                          <span className="text-green-400 mt-0.5">·</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Impact */}
              {project.projectDetails?.impact && (
                <div className="mb-6 p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
                  <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">Impact</div>
                  <p className="text-sm text-gray-300">{project.projectDetails.impact}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 flex-wrap">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-violet-500/30 transition-all"
                >
                  <Github size={15} /> View Code
                </a>
                {project.demo && project.demo !== 'https://project2.demo' && project.demo !== 'https://eventmaster.demo' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all"
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
