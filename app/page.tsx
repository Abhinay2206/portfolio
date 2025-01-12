'use client';
import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { skills } from '../data/Skills';
import { projects } from '../data/Projects';

const Home = () => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pageVariants = {
    initial: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0,
        staggerChildren: 0
      }
    },
    exit: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 origin-left z-50"
          style={{ scaleX }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        <div className="min-h-screen bg-gray-50 text-gray-900 relative">
          <div className="relative">
            <Navigation scrolled={scrolled} />
            <Hero />
            <Skills skills={skills} />
            <Projects projects={projects} />
            <Contact />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
