'use client';
import { useState, useEffect } from 'react';
import { Moon, Sun, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  scrolled: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ scrolled }) => {
  const [theme, setTheme] = useState('dark');
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="relative flex justify-between items-center p-4 rounded-2xl bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-violet-900/20 shadow-lg dark:shadow-violet-500/10"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <motion.span 
            className="text-2xl font-bold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] hover:animate-gradient"
            whileHover={{ scale: 1.05 }}
          >
            Abhinay
          </motion.span>
          <div className="flex gap-6 items-center">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => router.push('/')}
              className="p-2.5 rounded-lg bg-gray-50 dark:bg-violet-900/30 shadow-sm hover:shadow-md transition-all duration-300"
              aria-label="Go home"
            >
              <Home className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-gray-50 dark:bg-violet-900/30 shadow-sm hover:shadow-md transition-all duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <motion.a 
              href="#contact" 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 dark:from-violet-500 dark:via-fuchsia-400 dark:to-indigo-500 text-white transition-all duration-300 shadow-lg shadow-violet-500/20 dark:shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40"
            >
              Contact
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};