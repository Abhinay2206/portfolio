'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowLeftIcon, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/Projects';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';

const ProjectDetailsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams?.get('title') || '';
  const currentProjectIndex = projects.findIndex((proj) => proj.title === title);
  const project = projects[currentProjectIndex] || projects[0];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigatePrevProject();
      } else if (e.key === 'ArrowRight') {
        navigateNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProjectIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex, project.projectDetails.images]);

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Header */}
      <div className="relative pt-24 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/50 via-transparent to-transparent dark:from-violet-950/20" />

        <div className="max-w-4xl mx-auto relative">
          {/* Back button and navigation */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              onClick={() => router.push('/projects')}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700 shadow-sm transition-all duration-300"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftIcon size={18} className="text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Back to Projects</span>
            </motion.button>

            <div className="flex gap-2">
              <motion.button
                onClick={navigatePrevProject}
                disabled={currentProjectIndex === 0}
                className={`p-2 rounded-lg border border-gray-200 dark:border-zinc-800 ${currentProjectIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:border-violet-300 dark:hover:border-violet-700'}`}
                whileHover={currentProjectIndex !== 0 ? { scale: 1.05 } : {}}
                whileTap={currentProjectIndex !== 0 ? { scale: 0.95 } : {}}
              >
                <ChevronLeft size={18} className="text-gray-600 dark:text-gray-400" />
              </motion.button>
              <motion.button
                onClick={navigateNextProject}
                disabled={currentProjectIndex === projects.length - 1}
                className={`p-2 rounded-lg border border-gray-200 dark:border-zinc-800 ${currentProjectIndex === projects.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:border-violet-300 dark:hover:border-violet-700'}`}
                whileHover={currentProjectIndex !== projects.length - 1 ? { scale: 1.05 } : {}}
                whileTap={currentProjectIndex !== projects.length - 1 ? { scale: 0.95 } : {}}
              >
                <ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>
          </div>

          {/* Title and meta */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6"
          >
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>10 min read</span>
            </div>
          </motion.div>

          {/* Tech tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300"
              >
                <Tag size={12} />
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} />
                View Live Demo
              </motion.a>
            )}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 font-medium hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={16} />
              Source Code
            </motion.a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {project.projectDetails.overview}
          </p>
        </motion.section>

        {/* Images Carousel */}
        {project.projectDetails.images && project.projectDetails.images.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="aspect-video relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-zinc-800"
              >
                <Image
                  src={`/images/${project.projectDetails.images[currentImageIndex].url}`}
                  alt={project.projectDetails.images[currentImageIndex].caption}
                  fill
                  className="object-contain bg-gray-50 dark:bg-zinc-900"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-sm text-center">
                    {project.projectDetails.images[currentImageIndex].caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {project.projectDetails.images.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-3">
                <motion.button
                  onClick={prevImage}
                  className="p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-md border border-gray-200 dark:border-zinc-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
                </motion.button>
                <motion.button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-md border border-gray-200 dark:border-zinc-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>
            )}
          </motion.section>
        )}

        {/* Challenges & Solutions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 space-y-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Development Journey</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold text-violet-600 dark:text-violet-400 mb-4">Challenges</h3>
              <ul className="space-y-3">
                {project.projectDetails.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Solutions</h3>
              <ul className="space-y-3">
                {project.projectDetails.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Impact */}
        {project.projectDetails.impact && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 border border-violet-200 dark:border-violet-900/50"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Impact & Results</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.projectDetails.impact}
            </p>
          </motion.section>
        )}
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    }>
      <ProjectDetailsContent />
    </Suspense>
  );
};

export default ProjectDetails;
