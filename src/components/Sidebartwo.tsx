'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Info, Mail, FileText, Folder, Briefcase, House } from 'lucide-react';

interface SidebarProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        !(event.target as HTMLElement).closest('.sidebar') &&
        !(event.target as HTMLElement).closest('.sidebar-toggle')
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="sidebar fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center justify-center z-40 md:w-20 w-20"
        >
          <div className="flex flex-col items-center space-y-8">
            <NavItem href="/" icon={<House size={24} />} label="Home" />
            <NavItem href="/about" icon={<Info size={24} />} label="About" />
            <NavItem href="/contact" icon={<Mail size={24} />} label="Contact" />
            <NavItem href="/downloadcv" icon={<FileText size={24} />} label="Resume" />
            <NavItem href="/projects" icon={<Folder size={24} />} label="Projects" />
            <NavItem href="/experience" icon={<Briefcase size={24} />} label="Experience" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <motion.a
      href={href}
      className="group relative flex flex-col items-center justify-center w-12 h-12 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </motion.a>
  );
}
