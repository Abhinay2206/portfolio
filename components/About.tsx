import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, School, Code, Brain } from 'lucide-react';

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const infoCards = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education",
      description: "B.Tech Second Year Student"
    },
    {
      icon: <School className="w-6 h-6" />,
      title: "Institution",
      description: "Neil Gogte Institute of Technology"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Web Development",
      description: "Passionate about creating intuitive digital experiences"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Problem Solving",
      description: "Dedicated to finding innovative solutions"
    }
  ];

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
              About Me
            </span>
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
              About Me
            </span>
          </h2>
        </motion.div>

        <motion.div 
          className="group mb-12 relative overflow-hidden rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100/50 dark:border-gray-800/50 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-500"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-indigo-500/5 dark:from-violet-400/10 dark:via-fuchsia-400/10 dark:to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015] dark:opacity-[0.03] group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-500" />
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />
          <div className="p-8 md:p-12 relative">
            <motion.p 
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
              initial="hidden"
              whileInView="visible"
              custom={0}
              variants={textAnimation}
            >
              I am <span className="font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Abhinay Karthik</span>, 
              a focused and determined second-year B.Tech student at Neil Gogte Institute of Technology. 
              My academic voyage continues to be propelled by an unquenchable thirst for knowledge in technology and a passion 
              for web development and problem solving.
            </motion.p>
            <motion.p 
              className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
              initial="hidden"
              whileInView="visible"
              custom={1}
              variants={textAnimation}
            >
              I am an emerging <span className="font-semibold bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">technology contributor</span>, 
              specifically in the fast-paced fields of web development and user 
              interface/user experience design. My pathway started with an enthusiasm for programming that has developed over time, 
              and now I really enjoy building nice looking digital experiences with the user in mind.
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {infoCards.map((card, index) => (
            <motion.div 
              key={card.title}
              className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-100/50 dark:border-gray-800/50 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-500"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-indigo-500/5 dark:from-violet-400/10 dark:via-fuchsia-400/10 dark:to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015] dark:opacity-[0.03] group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />
              <div className="p-6 relative">
                <motion.div 
                  className="p-3 rounded-2xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 w-fit mb-4"
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;