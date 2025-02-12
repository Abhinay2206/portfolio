import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star, Flame, Trophy } from 'lucide-react';

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
  if (proficiency >= 90) return 'from-violet-500 to-fuchsia-500';
  if (proficiency >= 70) return 'from-blue-500 to-violet-500';
  if (proficiency >= 50) return 'from-cyan-500 to-blue-500';
  return 'from-green-500 to-cyan-500';
};

const getProficiencyIcon = (experience: string) => {
  switch (experience) {
    case 'Expert':
      return <Trophy className="w-4 h-4 text-yellow-500" />;
    case 'Advanced':
      return <Flame className="w-4 h-4 text-orange-500" />;
    default:
      return <Star className="w-4 h-4 text-blue-500" />;
  }
};

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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h2 className="text-6xl font-bold mb-16 tracking-tight relative">
            <span className="absolute -z-10 blur-3xl opacity-50 animate-pulse bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
              Skills & Expertise
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div 
              key={category}
              className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100/50 dark:border-gray-800/50 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
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
                <div className="space-y-4">
                  {items.map((skill: Skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          {getProficiencyIcon(skill.experience)}
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency)}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 inline-block">
                        {skill.experience}
                      </span>
                    </motion.div>
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