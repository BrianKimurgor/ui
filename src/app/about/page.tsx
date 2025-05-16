"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@headlessui/react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebartwo';

export default function AboutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && !(event.target as HTMLElement).closest('.sidebar') && !(event.target as HTMLElement).closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };


    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-full py-12 px-4 md:px-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Intro Section */}
        <section className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Brian Kimurgor</h1>
            <h2 className="text-xl md:text-2xl text-green-600 dark:text-green-400 mb-2">
              Software Engineer
            </h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic">
              Turning ideas into scalable software.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <Image
                src="https://avatars.githubusercontent.com/u/95771383?v=4"
                alt="Brian Kimurgor"
                fill
                sizes="(max-width: 768px) 192px, 224px"
                className="rounded-full border-4 border-green-500 object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* Who I Am */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Who I Am</h3>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I'm a passionate software engineer with a strong focus on backend architecture,
            performance optimization, and clean code. My journey began with a curiosity about
            how systems work and has grown into a career of building real-world applications
            that make an impact.
          </p>
        </section>

        {/* Tech Stack */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-white">Tech Stack & Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['TypeScript', 'Next.js', '.NET', 'PostgreSQL', 'Docker', 'Kubernetes', 'TailwindCSS', 'Framer Motion'].map(tool => (
              <motion.div
                key={tool}
                className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-medium text-gray-800 dark:text-gray-200">{tool}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-white">Experience</h3>
          <div className="space-y-6">
            {/* Replace with dynamic WorkService data later */}
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-lg font-semibold">Software Engineer @ Griffinglobal Technologies</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Jan 2024 – Present</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Building scalable systems and APIs, contributing to system architecture and DevOps.
              </p>
            </div>
          </div>
        </section>

        {/* Values & Philosophy */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">My Principles</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Test-Driven Development',
              'Clean, maintainable code',
              'Continuous learning & self-improvement',
              'Accessibility & performance first'
            ].map(principle => (
              <li key={principle} className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-gray-700 dark:text-gray-300">{principle}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Hobbies & Personality */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Beyond Code</h3>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
            I enjoy reading psychology books, exploring agricultural innovations, and building passion
            projects that solve real-world problems.
          </p>
        </section>

        {/* Fun Stats */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-white text-center">Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: '25+', label: 'Projects' },
              { value: '10', label: 'Blog Posts' },
              { value: '3k+', label: 'Cups of Coffee' },
              { value: '∞', label: 'Curiosity' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-500">{stat.value}</p>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-8">
          <p className="text-xl mb-6 text-gray-800 dark:text-white">Want to see what I build?</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
              View My Projects
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}