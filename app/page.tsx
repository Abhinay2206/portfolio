/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, Info } from 'lucide-react';
import { useLoading } from '../context/LoadingProvider';
import { setProgress } from '../components/Loading';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  const { isLoading, setLoading } = useLoading();
  const [countdown, setCountdown] = useState(1);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    let countdownCleared = false;
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          countdownCleared = true;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Initialize loading progress
    const progressController = setProgress(setLoading);

    // After countdown completes, finish loading and navigate
    const timer = setTimeout(() => {
      progressController.loaded().then(() => {
        // Add a small delay to ensure the loading animation completes
        setTimeout(() => {
          router.push('/portfolio');
        }, 500);
      });
    }, 1500);

    return () => {
      if (!countdownCleared) {
        clearInterval(countdownInterval);
      }
      clearTimeout(timer);
    };
  }, [router, setLoading]);

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
      className={`relative min-h-screen w-screen overflow-hidden transition-colors duration-700 ${isDark
        ? 'bg-gradient-to-br from-[#030014] via-[#0a0520] to-[#030014]'
        : 'bg-gradient-to-br from-[#fafafa] via-[#f0f0f0] to-[#fafafa]'
        }`}
    >
      {/* Countdown Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        className={`fixed top-6 sm:top-8 left-6 sm:left-8 z-50 flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl ${isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
          } backdrop-blur-xl text-sm sm:text-base font-medium border border-violet-500/20`}
      >
        <Info className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Redirecting in {countdown}s</span>
      </motion.div>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Theme toggle button */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 sm:top-8 right-6 sm:right-8 z-50 p-3.5 sm:p-4 rounded-2xl ${isDark
          ? 'bg-white/10 text-yellow-400 hover:bg-white/15'
          : 'bg-black/10 text-violet-600 hover:bg-black/15'
          } backdrop-blur-xl transition-all duration-500 shadow-lg border border-violet-500/20`}
        whileHover={{
          scale: 1.05,
          boxShadow: isDark
            ? '0 0 15px 5px rgba(139, 92, 246, 0.3)'
            : '0 0 15px 5px rgba(139, 92, 246, 0.2)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={isDark ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          {isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
