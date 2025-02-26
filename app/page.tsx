/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon,Info } from 'lucide-react';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hoverState, setHoverState] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [countdown, setCountdown] = useState(2);

  const loadingQuotes = [
    "Loading innovation...",
    "Assembling pixels...",
    "Almost ready..."
  ];

  const handleNavigate = () => {
    setTimeout(() => {
      router.push('/portfolio');
    }, 3000);
  };

  useEffect(() => {
    setMounted(true);
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ 
        x: (clientX / window.innerWidth) * 2 - 1,
        y: (clientY / window.innerHeight) * 2 - 1
      });
    };

    const handleScroll = () => {
      const position = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (position / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          handleNavigate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(countdownInterval);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(false);
      setIsLoading(true);
      
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      const quoteInterval = setInterval(() => {
        setCurrentQuote(prev => (prev + 1) % loadingQuotes.length);
      }, 800);

      setTimeout(() => {
        clearInterval(quoteInterval);
        router.push('/portfolio');
      }, 2300);
    }, 2300);

    return () => clearTimeout(timer);
  }, [loadingQuotes.length, router]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative min-h-screen w-screen overflow-hidden transition-colors duration-700 ${
        isDark 
          ? 'bg-[#030014] bg-grid-white/[0.05]' 
          : 'bg-[#fafafa] bg-grid-black/[0.05]'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-6 sm:top-8 left-6 sm:left-8 z-50 flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl ${
          isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
        } backdrop-blur-xl text-sm sm:text-base font-medium`}
      >
        <Info className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Redirecting in {countdown}s</span>
      </motion.div>

      <div className="absolute inset-0 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-violet-500/30 via-transparent to-fuchsia-500/30 pointer-events-none" />

      <motion.div 
        className="pointer-events-none fixed inset-0 z-30"
        animate={{
          background: `radial-gradient(
            800px circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, 
            ${isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)'}, 
            transparent
          )`
        }}
        transition={{ type: "spring", bounce: 0.2, damping: 10 }}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 origin-left z-50"
        style={{ scaleX }}
      />

      <motion.button
        onClick={toggleTheme}
        onHoverStart={() => setHoverState(true)}
        onHoverEnd={() => setHoverState(false)}
        className={`fixed top-6 sm:top-8 right-6 sm:right-8 z-50 p-3.5 sm:p-4 rounded-2xl ${
          isDark 
            ? 'bg-white/10 text-yellow-400 hover:bg-white/15' 
            : 'bg-black/10 text-violet-600 hover:bg-black/15'
        } backdrop-blur-xl transition-all duration-500 shadow-lg`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={isDark ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          {isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
        </motion.div>
      </motion.button>

      {/* Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-[2px] w-[2px] rounded-full ${
                isDark ? 'bg-violet-400/30' : 'bg-violet-500/30'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-2xl bg-black/70 px-6"
          >
            <motion.div 
              className="relative w-72 h-1.5 bg-white/20 rounded-full overflow-hidden mb-10"
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            <motion.p
              className="text-violet-200 font-medium text-center text-base sm:text-lg tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentQuote}
            >
              {loadingQuotes[currentQuote]}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
            <div className="max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h1
                  key="welcome"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5, y: 1000 }}
                  transition={{ duration: 0.8, ease: "easeIn" }}
                  className={`text-5xl sm:text-7xl md:text-9xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r ${
                    isDark 
                      ? 'from-violet-400 via-fuchsia-300 to-pink-400'
                      : 'from-violet-600 via-fuchsia-600 to-pink-600'
                  }`}
                >
                  Welcome
                </motion.h1>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
