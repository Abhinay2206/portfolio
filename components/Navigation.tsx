'use client';
import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  scrolled: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ scrolled }) => {
  const [theme, setTheme] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      setTheme(isDarkMode ? 'dark' : 'light');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } else {
      setTheme(savedTheme);
    }
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNameClick = () => {
    router.push('/');
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Magnetic button effect
  const MagneticButton = ({ children, className, onClick, ...props }: React.PropsWithChildren<{
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }>) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.15);
      y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.button
        ref={ref}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className={`relative flex justify-between items-center px-5 py-3 rounded-2xl transition-all duration-500 ${scrolled
              ? 'bg-white/80 dark:bg-zinc-900/80'
              : 'bg-white/60 dark:bg-zinc-900/60'
              } backdrop-blur-xl border border-white/50 dark:border-zinc-800/50`}
            style={{
              boxShadow: scrolled
                ? '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                : '0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            }}
          >
            {/* Logo */}
            <motion.button
              onClick={handleNameClick}
              className="text-xl font-bold tracking-tight cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Abhinay
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Nav Links */}
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
                    whileHover={{ y: -1 }}
                  >
                    {link.name}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-zinc-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-zinc-700/80 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === 'light' ? (
                        <Moon className="w-4 h-4" />
                      ) : (
                        <Sun className="w-4 h-4" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>

                <MagneticButton
                  onClick={handleContactClick}
                  className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-500 text-white text-sm font-medium overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10">Contact</span>
                </MagneticButton>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300"
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3">
                <div
                  className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-zinc-800/50 p-4 space-y-3"
                  style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                  }}
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block py-2 px-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={toggleTheme}
                      className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300"
                    >
                      {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleContactClick}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};