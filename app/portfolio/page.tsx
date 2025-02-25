/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { Navigation } from '../../components/Navigation';
import { Hero } from '../../components/Hero';
import About from '../../components/About';
import { Skills } from '../../components/Skills';
import { Projects } from '../../components/Projects';
import { Contact } from '../../components/Contact';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { skills } from '../../data/Skills';
import { projects } from '../../data/Projects';

const Portfolio = () => {
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
        staggerChildren: 0.1 
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3, 
        ease: "easeIn"
      }
    }
  };

  const sectionVariants = {
    initial: {
      opacity: 0,
      y: 20 
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
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
          className="fixed top-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 origin-left z-50"
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
          <div 
            className={`relative ${!isMobile ? 'will-change-transform' : ''}`} 
            style={{
              perspective: isMobile ? 'none' : '1000px',
              transformStyle: isMobile ? 'flat' : 'preserve-3d',
              overflowX: 'hidden' 
            }}
          >
            <Navigation scrolled={scrolled} />
            
            <div className="space-y-16 md:space-y-24">
              <Hero />
              
              <motion.div
                variants={sectionVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                className="px-4 md:px-0"
              >
                <About />
              </motion.div>

              <motion.div
                variants={sectionVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                className="px-4 md:px-0"
              >
                <Skills skills={skills as any} />
              </motion.div>

              <motion.div
                variants={sectionVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                className="px-4 md:px-0"
              >
                <Projects 
                  projects={projects.map(project => ({
                    ...project,
                    demo: project.demo || ''
                  }))} 
                />
              </motion.div>

              <motion.div
                variants={sectionVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                className="px-4 md:px-0"
              >
                <Contact />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Portfolio;