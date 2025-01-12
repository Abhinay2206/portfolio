'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeftIcon, Calendar, Clock, Tag } from 'lucide-react';
import { projects } from '../../data/Projects';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProjectDetails {
  overview: string;
  challenges: string[];
  solutions: string[];
  impact?: string;
}

const ProjectDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams?.get('title') || '';
  const project = projects.find((proj) => proj.title === title) || projects[0];

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const readingTime = '10 min read'; 

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50 dark:from-gray-900 dark:to-gray-800">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold text-white mb-6"
            >
              {project.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-6 text-white/80"
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{readingTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.button
          onClick={() => router.back()}
          className="group flex items-center gap-2 px-5 py-2.5 mb-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeftIcon size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </motion.button>

        <motion.div 
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {project.tech.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300"
            >
              <Tag size={14} />
              {tech}
            </motion.div>
          ))}
        </motion.div>

        <div className="flex gap-4 mb-16">
          <motion.a
            href={project.demo}
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
            View Live Demo
          </motion.a>
          <motion.a
            href={project.github}
            className="group flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-violet-500/20 hover:border-violet-500 dark:border-violet-400/20 dark:hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={18} className="text-violet-600 dark:text-violet-400 group-hover:rotate-12 transition-transform" />
            <span className="text-violet-600 dark:text-violet-400">Source Code</span>
          </motion.a>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Project Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {project.projectDetails.overview}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Development Journey</h2>
            
            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-violet-600 dark:text-violet-400">Challenges Faced</h3>
                <ul className="space-y-6">
                  {project.projectDetails.challenges.map((challenge, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-4 text-gray-600 dark:text-gray-300"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-500 font-bold">
                        {index + 1}
                      </span>
                      <span className="mt-1">{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-violet-600 dark:text-violet-400">Solutions & Approaches</h3>
                <ul className="space-y-6">
                  {project.projectDetails.solutions.map((solution, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-4 text-gray-600 dark:text-gray-300"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-500 font-bold">
                        {index + 1}
                      </span>
                      <span className="mt-1">{solution}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {project.projectDetails.impact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 dark:from-violet-600/20 dark:to-indigo-600/20 p-12 rounded-3xl shadow-lg"
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Impact & Results</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {project.projectDetails.impact}
              </p>
            </motion.div>
          )}
        </article>
      </div>
    </div>
  );
};

export default ProjectDetails;
