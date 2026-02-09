import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Flame, Trophy } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import SkillsSphere to avoid SSR issues with THREE.js
const SkillsSphere = dynamic(() => import('./SkillsSphere'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] lg:h-[700px]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-violet-600/30 border-t-violet-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading 3D Skills Sphere...</p>
      </div>
    </div>
  ),
});

interface Skill {
  name: string;
  proficiency: number;
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface SkillCategory {
  [key: string]: Skill[];
}

export interface SkillsProps {
  skills: SkillCategory;
}

const getProficiencyColor = (proficiency: number) => {
  if (proficiency >= 90) return 'from-violet-500 to-purple-500';
  if (proficiency >= 70) return 'from-indigo-500 to-violet-500';
  if (proficiency >= 50) return 'from-blue-500 to-indigo-500';
  return 'from-cyan-500 to-blue-500';
};

const getProficiencyIcon = (experience: string) => {
  switch (experience) {
    case 'Expert':
      return <Trophy className="w-3.5 h-3.5 text-amber-500" />;
    case 'Advanced':
      return <Flame className="w-3.5 h-3.5 text-orange-500" />;
    default:
      return <Star className="w-3.5 h-3.5 text-blue-500" />;
  }
};

// Fallback grid component
const SkillsGrid: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {Object.entries(skills).map(([category, items], categoryIndex) => (
        <motion.div
          key={category}
          className="group relative p-5 rounded-xl transition-all duration-500 overflow-hidden bg-white/70 dark:bg-zinc-900/75 backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: categoryIndex * 0.1, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{
            y: -6,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 0 30px rgba(124, 58, 237, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent mb-5">
              {category}
            </h3>

            <div className="space-y-4">
              {items.map((skill: Skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      {getProficiencyIcon(skill.experience)}
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full rounded-full overflow-hidden bg-black/5 dark:bg-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"
                  >
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency)} shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [use3D, setUse3D] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  useEffect(() => {
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebGLSupported(!!gl);
  }, []);

  return (
    <section ref={containerRef} id="skills" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-mesh opacity-40" />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        style={{ opacity, y }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>

          {/* View Toggle */}
          {webGLSupported && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setUse3D(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${!use3D
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/60 dark:bg-zinc-800/60 text-gray-700 dark:text-gray-300 border border-violet-600/20'
                  }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setUse3D(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${use3D
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/60 dark:bg-zinc-800/60 text-gray-700 dark:text-gray-300 border border-violet-600/20'
                  }`}
              >
                3D Sphere
              </button>
            </div>
          )}
        </motion.div>

        {/* 3D Sphere or Grid View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {webGLSupported && use3D ? (
            <SkillsSphere skills={skills} />
          ) : (
            <SkillsGrid skills={skills} />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;