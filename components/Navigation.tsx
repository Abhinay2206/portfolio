'use client';

interface NavigationProps {
  scrolled: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ scrolled }) => {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex justify-between items-center p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200">
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Abhinay
          </span>
          <div className="flex gap-6 items-center">
            <a href="#contact" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};