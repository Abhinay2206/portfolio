/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { Navigation } from '../../components/Navigation';
import { Hero } from '../../components/Hero';
import About from '../../components/About';
import { Skills } from '../../components/Skills';
import { Projects } from '../../components/Projects';
import { Contact } from '../../components/Contact';
import { CustomCursor } from '../../components/CustomCursor';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { ParticleBackground } from '../../components/ParticleBackground';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { skills } from '../../data/Skills';
import { projects } from '../../data/Projects';

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Particle Background */}
        <ParticleBackground />

        {/* Animated Morphing Background */}
        <AnimatedBackground />

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 origin-left z-50"
          style={{ scaleX }}
        />

        <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 relative">
          <Navigation scrolled={scrolled} />

          <div className="space-y-0">
            <Hero />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <Skills skills={skills as any} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <Projects
                projects={projects.map(project => ({
                  ...project,
                  demo: project.demo || ''
                }))}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <Contact />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Portfolio;