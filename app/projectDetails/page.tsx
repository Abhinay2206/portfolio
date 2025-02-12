'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowLeftIcon, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/Projects';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';

interface ProjectDetails {
  overview: string;
  challenges: string[];
  solutions: string[];
  impact?: string;
  images: {
    url: string;
    caption: string;
  }[];
}

const ProjectDetailsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams?.get('title') || '';
  const currentProjectIndex = projects.findIndex((proj) => proj.title === title);
  const project = projects[currentProjectIndex] || projects[0];

  const [theme, setTheme] = useState('light');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigatePrevProject();
      } else if (e.key === 'ArrowRight') {
        navigateNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentProjectIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const readingTime = '10 min read';

  const navigatePrevProject = () => {
    if (currentProjectIndex > 0) {
      router.push(`/projectDetails?title=${encodeURIComponent(projects[currentProjectIndex - 1].title)}`);
    }
  };

  const navigateNextProject = () => {
    if (currentProjectIndex < projects.length - 1) {
      router.push(`/projectDetails?title=${encodeURIComponent(projects[currentProjectIndex + 1].title)}`);
    }
  };

  const nextImage = () => {
    if (project.projectDetails.images) {
      setCurrentImageIndex((prev) => 
        prev === project.projectDetails.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project.projectDetails.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.projectDetails.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme === 'dark' ? 'from-gray-900 to-gray-800' : 'from-white to-violet-50'}`}>
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <motion.div 
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold text-white mb-6 tracking-tight"
            >
              {project.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-6 text-white/90"
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
        <div className="flex justify-between items-center mb-12">
          <motion.button
            onClick={() => router.back()}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeftIcon size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </motion.button>

          <div className="flex gap-4">
            <motion.button
              onClick={navigatePrevProject}
              disabled={currentProjectIndex === 0}
              className={`p-2 rounded-lg ${currentProjectIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-100 dark:hover:bg-violet-900/30'}`}
              whileHover={currentProjectIndex !== 0 ? { scale: 1.1 } : {}}
            >
              <ChevronLeft size={24} className="text-violet-600 dark:text-violet-400" />
            </motion.button>
            <motion.button
              onClick={navigateNextProject}
              disabled={currentProjectIndex === projects.length - 1}
              className={`p-2 rounded-lg ${currentProjectIndex === projects.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-100 dark:hover:bg-violet-900/30'}`}
              whileHover={currentProjectIndex !== projects.length - 1 ? { scale: 1.1 } : {}}
            >
              <ChevronRight size={24} className="text-violet-600 dark:text-violet-400" />
            </motion.button>
          </div>
        </div>

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
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-all duration-300"
            >
              <Tag size={14} />
              {tech}
            </motion.div>
          ))}
        </motion.div>

        <div className="flex gap-4 mb-16">
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
              View Live Demo
            </motion.a>
          )}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
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

          {project.projectDetails.images && project.projectDetails.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="aspect-video relative rounded-xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={`/images/${project.projectDetails.images[currentImageIndex].url}`}
                    alt={project.projectDetails.images[currentImageIndex].caption}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-center">
                      {project.projectDetails.images[currentImageIndex].caption}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {project.projectDetails.images.length > 1 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                  <motion.button
                    onClick={prevImage}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    onClick={nextImage}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

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
                      className="flex items-start gap-4 text-gray-600 dark:text-gray-300 group"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-500 font-bold group-hover:scale-110 transition-transform">
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
                      className="flex items-start gap-4 text-gray-600 dark:text-gray-300 group"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-500 font-bold group-hover:scale-110 transition-transform">
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
              className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 dark:from-violet-600/20 dark:to-indigo-600/20 p-12 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
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

const ProjectDetails = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    }>
      <ProjectDetailsContent />
    </Suspense>
  );
};

export default ProjectDetails;
