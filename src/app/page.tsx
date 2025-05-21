"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Camera,
  Linkedin,
  Github,
  Mail,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebartwo";




export default function PortfolioPage() {
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
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4 md:p-8 relative">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 text-white bg-gray-800 hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Navigation"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: sidebarOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>

      {/* Sidebar for All Devices */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="md:ml-20 flex justify-center items-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Profile Image Section */}
          <div className="md:w-2/5 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-8">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-56 h-56 md:w-72 md:h-72 relative rounded-full overflow-hidden border-4 border-white dark:border-gray-600 shadow-xl">
                <Image
                  src="https://avatars.githubusercontent.com/u/95771383?v=4"
                  alt="Brian Kimurgor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 224px, 288px"
                  priority
                />
              </div>
              <motion.div 
                className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Camera size={24} />
              </motion.div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-3">
                Brian Kimurgor
              </h1>
              <h2 className="text-2xl md:text-4xl text-green-600 dark:text-green-400 mb-6">
                Software Engineer
              </h2>

              <div className="mb-8 space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Currently working at{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Griffinglobal Technologies
                  </span>
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Passionate about creating innovative solutions and pushing the
                  boundaries of web development with modern technologies.
                </p>
              </div>

              {/* Key Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', '.NET', 'PostgreSQL'].map(skill => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium"
                      whileHover={{ scale: 1.05, backgroundColor: '#10B981', color: 'white' }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6 mt-6">
                <SocialLink href="https://linkedin.com" icon={<Linkedin size={24} />} color="text-blue-600" hoverColor="text-blue-700" />
                <SocialLink href="https://github.com" icon={<Github size={24} />} color="text-gray-800 dark:text-gray-300" hoverColor="text-black dark:text-white" />
                <SocialLink href="mailto:your.email@example.com" icon={<Mail size={24} />} color="text-red-600" hoverColor="text-red-700" />
              </div>

              {/* CTA Button */}
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Let&lsquo;s Connect
                <ExternalLink size={18} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface SocialLinkProps {
  readonly href: string;
  readonly icon: React.ReactNode;
  readonly color: string;
  readonly hoverColor: string;
}

function SocialLink({ href, icon, color, hoverColor }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} hover:${hoverColor} transition-colors duration-200`}
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  );
}
