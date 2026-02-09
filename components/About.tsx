import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, School, Code, Brain } from 'lucide-react';
import { Tilt3D } from './Tilt3D';

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  const infoCards = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Education",
      description: "B.Tech Second Year Student"
    },
    {
      icon: <School className="w-5 h-5" />,
      title: "Institution",
      description: "Neil Gogte Institute of Technology"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Web Development",
      description: "Building intuitive digital experiences"
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Problem Solving",
      description: "Finding innovative solutions"
    }
  ];

  return (
    <section ref={containerRef} id="about" className="py-24 lg:py-32 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-mesh opacity-50" />

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
              About Me
            </span>
          </h2>
        </motion.div>

        {/* Main content card with premium glassmorphism */}
        <motion.div
          className="mb-12 p-6 sm:p-8 lg:p-10 rounded-2xl transition-all duration-500 bg-white/75 dark:bg-zinc-900/80 backdrop-blur-xl border-2 border-violet-500/30 dark:border-violet-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8),0_0_0_1px_rgba(124,58,237,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06),0_0_60px_rgba(124,58,237,0.2)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{
            scale: 1.01,
            boxShadow: '0 20px 60px  rgba(0, 0, 0, 0.12), 0 0 80px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(124, 58, 237, 0.6)',
          }}
        >
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p className="text-lg">
              I am <span className="font-semibold text-violet-600 dark:text-violet-400">Abhinay Karthik</span>,
              a focused and determined third-year B.Tech student at Neil Gogte Institute of Technology.
              My academic journey is driven by an unquenchable thirst for knowledge in technology and a passion
              for web development and problem-solving.
            </p>
            <p className="text-lg">
              I am an emerging <span className="font-semibold text-purple-600 dark:text-purple-400">technology contributor</span>,
              particularly in web development and UI/UX design. My pathway started with an enthusiasm for programming
              that has developed over time, and now I enjoy building beautiful digital experiences with the user in mind.
            </p>
          </div>
        </motion.div>

        {/* Info cards grid with premium effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map((card, index) => (
            <Tilt3D key={card.title} intensity={10} scale={1.03}>
              <motion.div
                className="group relative p-5 rounded-xl transition-all duration-500 cursor-default overflow-hidden bg-white/70 dark:bg-zinc-900/75 backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] h-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div
                    className="p-2.5 rounded-xl w-fit mb-3 transition-all duration-300 group-hover:scale-110 animate-float-icon bg-gradient-to-br from-violet-100/80 to-indigo-100/60 dark:from-violet-900/30 dark:to-indigo-900/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  >
                    <span className="text-violet-600 dark:text-violet-400">{card.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            </Tilt3D>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;