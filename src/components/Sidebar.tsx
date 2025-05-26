'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BadgeCheck,
  Briefcase,
  BookOpen,
  GraduationCap,
  Share2,
} from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/badges', label: 'Badges', icon: BadgeCheck },
  { href: '/dashboard/projects', label: 'Projects', icon: Briefcase },
  { href: '/dashboard/experience', label: 'Experience', icon: BookOpen },
  { href: '/dashboard/education', label: 'Education', icon: GraduationCap },
  { href: '/dashboard/social', label: 'Social Links', icon: Share2 },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-white dark:bg-gray-900 shadow-md w-64 h-screen p-4 flex flex-col border-r dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-6 text-primary dark:text-white">Portfolio</h2>
      <nav className="flex-1">
        <ul className="space-y-3">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
