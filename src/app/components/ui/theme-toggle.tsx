'use client';

import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="group w-8 h-8 flex items-center justify-center rounded-full border shadow-md bg-muted transition-colors duration-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle Theme"
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {isDark ? (
                <FaSun size={18} className="text-white group-hover:text-yellow-400 transition-colors" />
              ) : (
                <FaMoon size={18} className="text-blue-600 group-hover:text-blue-400 transition-colors" />
              )}
            </motion.div>
          </button>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
