'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Info,
  Mail,
  FileText,
  Folder,
  Briefcase,
  Home,
} from 'lucide-react';

interface SidebarProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

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

  const navItems = [
    { href: '/', icon: <Home size={24} />, label: 'Home' },
    { href: '/about', icon: <Info size={24} />, label: 'About' },
    { href: '/contact', icon: <Mail size={24} />, label: 'Contact' },
    { href: '/downloadcv', icon: <FileText size={24} />, label: 'Resume' },
    { href: '/projects', icon: <Folder size={24} />, label: 'Projects' },
    { href: '/experience', icon: <Briefcase size={24} />, label: 'Experience' },
  ];

  return (
    <AnimatePresence>
      {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="sidebar fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg flex flex-col items-center justify-center z-40 md:w-20 w-20"
        >
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={pathname === item.href}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface NavItemProps {
  readonly href: string;
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly active?: boolean;
}

function NavItem({ href, icon, label, active = false }: NavItemProps) {
  return (
    <Link href={href} passHref>
      <motion.div
        className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-md ${
          active
            ? 'text-green-600 dark:text-green-400 bg-gray-100 dark:bg-gray-800'
            : 'text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400'
        } transition-colors duration-200`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
          {label}
        </span>
      </motion.div>
    </Link>
  );
}
