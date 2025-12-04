/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, Info, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useLoading } from '../context/LoadingProvider';
import { setProgress } from '../components/Loading';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isLoading, setLoading } = useLoading();
  const [showContent, setShowContent] = useState(true);
  const [hoverState, setHoverState] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [countdown, setCountdown] = useState(2);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mouseAngle, setMouseAngle] = useState(0);

  // 3D effect refs
  const welcomeTextRef = useRef(null);
  const sphereRef = useRef(null);

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

      // Calculate normalized mouse position
      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x: normalizedX, y: normalizedY });

      // Calculate angle for rotating elements
      const angle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);
      setMouseAngle(angle);

      // Apply 3D effect to welcome text if ref exists
      if (welcomeTextRef.current) {
        const element = welcomeTextRef.current as HTMLElement;
        const rotateX = normalizedY * -10; // Inverse Y for natural tilt
        const rotateY = normalizedX * 10;
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      // Apply 3D effect to sphere if ref exists
      if (sphereRef.current) {
        const element = sphereRef.current as HTMLElement;
        const rotateX = normalizedY * 25;
        const rotateY = normalizedX * 25;
        element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
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

    // Initialize loading progress
    const progressController = setProgress(setLoading);

    // After welcome screen, complete loading
    const timer = setTimeout(() => {
      setShowContent(false);
      progressController.loaded().then(() => {
        router.push('/portfolio');
      });
    }, 2300);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(countdownInterval);
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
        ? 'bg-[#030014] bg-grid-white/[0.05]'
        : 'bg-[#fafafa] bg-grid-black/[0.05]'
        }`}
    >
      {/* Floating 3D sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-70 pointer-events-none">
        <div
          ref={sphereRef}
          className={`w-[500px] h-[500px] rounded-full ${isDark ? 'bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30' : 'bg-gradient-to-br from-violet-200/30 to-fuchsia-200/30'
            } blur-3xl transition-transform duration-200 ease-out`}
          style={{
            boxShadow: isDark
              ? '0 0 100px 20px rgba(139, 92, 246, 0.3), inset 0 0 60px rgba(192, 132, 252, 0.4)'
              : '0 0 100px 20px rgba(139, 92, 246, 0.2), inset 0 0 60px rgba(192, 132, 252, 0.3)'
          }}
        />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 z-0">
        <div className={`h-full w-full ${isDark ? 'bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)]' :
          'bg-[linear-gradient(to_right,#e0e0e0_1px,transparent_1px),linear-gradient(to_bottom,#e0e0e0_1px,transparent_1px)]'
          } bg-[size:4rem_4rem]`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>
      </div>

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

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-violet-500/30 via-transparent to-fuchsia-500/30 pointer-events-none animate-pulse" />

      {/* Enhanced mouse-follow effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30"
        animate={{
          background: `radial-gradient(
            1200px circle at ${50 + mousePosition.x * 40}% ${50 + mousePosition.y * 40}%, 
            ${isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.2)'}, 
            transparent
          )`
        }}
        transition={{ type: "spring", bounce: 0.2, damping: 10 }}
      />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Theme toggle button with enhanced effects */}
      <motion.button
        onClick={toggleTheme}
        onHoverStart={() => setHoverState(true)}
        onHoverEnd={() => setHoverState(false)}
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

      {/* Enhanced Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          {[...Array(300)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-[2px] w-[2px] rounded-full ${isDark ? 'bg-violet-400/40' : 'bg-violet-500/40'
                }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 2.5, 0],
                opacity: [0, 1, 0],
                y: [0, Math.random() * -20],
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

      {/* Floating 3D objects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${isDark ? 'bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20' : 'bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20'
              } backdrop-blur-md rounded-2xl border border-violet-500/20`}
            style={{
              width: 100 + Math.random() * 100,
              height: 100 + Math.random() * 100,
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              boxShadow: isDark
                ? '0 0 20px rgba(139, 92, 246, 0.3)'
                : '0 0 20px rgba(139, 92, 246, 0.2)'
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              rotate: [0, Math.random() * 20 - 10],
              scale: [1, 1 + Math.random() * 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Enhanced Main Content */}
      <AnimatePresence>
        {showContent && (
          <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
            <div className="max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{
                  perspective: "2000px"
                }}
              >
                {/* 3D Welcome Text */}
                <motion.div
                  ref={welcomeTextRef}
                  className="relative transition-transform duration-200 ease-out"
                  style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                >
                  <motion.h1
                    key="welcome"
                    initial={{ opacity: 0, scale: 0.5, rotateX: -90, z: -500 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateX: 0,
                      z: 0,
                      textShadow: isDark
                        ? "0 1px 0 #c9c9c9, 0 2px 0 #bbb, 0 3px 0 #aaa, 0 4px 0 #999, 0 6px 0 #888, 0 8px 15px rgba(139, 92, 246, 0.4), 0 0 10px rgba(139, 92, 246, 0.2), 0 2px 20px rgba(139, 92, 246, 0.3), 0 4px 30px rgba(139, 92, 246, 0.2), 0 8px 40px rgba(139, 92, 246, 0.25)"
                        : "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 6px 0 #aaa, 0 8px 15px rgba(139, 92, 246, 0.3), 0 0 10px rgba(139, 92, 246, 0.1), 0 2px 20px rgba(139, 92, 246, 0.2), 0 4px 30px rgba(139, 92, 246, 0.15)"
                    }}
                    exit={{ opacity: 0, scale: 1.5, y: 1000 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.68, -0.6, 0.32, 1.6]
                    }}
                    className={`text-6xl sm:text-8xl md:text-9xl font-bold mb-10 transform-gpu ${isDark
                      ? 'text-white'
                      : 'text-violet-900'
                      }`}
                  >
                    <motion.span
                      className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark
                        ? 'from-violet-400 via-fuchsia-300 to-pink-400'
                        : 'from-violet-600 via-fuchsia-600 to-pink-600'
                        } [text-shadow:_0_1px_20px_rgb(139_92_246_/_40%)] transform-gpu inline-block`}
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      Welcome
                    </motion.span>
                  </motion.h1>

                  {/* 3D floating elements around welcome text */}
                  <div className="absolute inset-0 -z-10 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={`float-${i}`}
                        className={`absolute w-6 h-6 rounded-full ${isDark ? 'bg-violet-500/30' : 'bg-violet-400/30'
                          }`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          boxShadow: isDark
                            ? '0 0 10px rgba(139, 92, 246, 0.5)'
                            : '0 0 10px rgba(139, 92, 246, 0.4)'
                        }}
                        animate={{
                          x: [0, Math.random() * 40 - 20],
                          y: [0, Math.random() * 40 - 20],
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`text-xl sm:text-2xl ${isDark ? 'text-violet-200' : 'text-violet-800'} font-light`}
                >
                  <motion.div
                    className="inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Sparkles className="inline-block animate-pulse" />
                    <span className="relative">
                      Prepare to be amazed
                      <motion.span
                        className={`absolute -bottom-1 left-0 h-0.5 w-full ${isDark ? 'bg-violet-400' : 'bg-violet-600'
                          } rounded-full`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      />
                    </span>
                    <Sparkles className="inline-block animate-pulse" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
