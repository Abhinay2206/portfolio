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
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', checkMobile);
      
      // Initial checks
      handleScroll();
      checkMobile();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn"
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
        className="relative"
      >
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 origin-left z-50"
          style={{ 
            scaleX,
            transformOrigin: "0%",
            willChange: "transform"
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "linear"
          }}
        />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className={`relative ${!isMobile ? 'will-change-transform' : ''}`} style={{
            perspective: isMobile ? 'none' : '1000px',
            transformStyle: isMobile ? 'flat' : 'preserve-3d'
          }}>
            <Navigation scrolled={scrolled} />
            <Hero />
            <Skills skills={skills} />
            <Projects projects={projects.map(project => ({
              ...project,
              demo: project.demo || ''
            }))} />
            <Contact />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
