"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  Folder,
  X,
  Github,
  Linkedin,
  Twitter,
  BookOpen,
  Coffee,
  Lightbulb,
  Code2,
  Server,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Sidebar from "@/components/Sidebartwo";

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
      const target = event.target as HTMLElement;
      if (
        sidebarOpen &&
        !target.closest(".sidebar") &&
        !target.closest(".sidebar-toggle")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  if (!mounted) {
    return null;
  }

  const techStack = [
    { name: "TypeScript", icon: <Code2 size={20} /> },
    { name: "React/Next.js", icon: <Code2 size={20} /> },
    { name: ".NET Core", icon: <Server size={20} /> },
    { name: "Node.js", icon: <Server size={20} /> },
    { name: "PostgreSQL", icon: <Server size={20} /> },
    { name: "Docker", icon: <Server size={20} /> },
    { name: "React Native", icon: <Smartphone size={20} /> },
    { name: "TailwindCSS", icon: <Code2 size={20} /> },
  ];

  const principles = [
    "Test-Driven Development",
    "Clean, maintainable code",
    "Continuous learning",
    "Performance optimization",
    "Accessibility first",
    "Collaborative approach",
  ];

  const stats = [
    { value: "25+", label: "Projects", icon: <Folder size={20} /> },
    { value: "10", label: "Blog Posts", icon: <BookOpen size={20} /> },
    { value: "3k+", label: "Cups of Coffee", icon: <Coffee size={20} /> },
    { value: "∞", label: "Curiosity", icon: <Lightbulb size={20} /> },
  ];

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
      <div className="md:ml-20 flex justify-center items-start min-h-screen py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden"
        >
          <div className="p-8 md:p-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Intro Section */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="relative w-40 h-40 md:w-48 md:h-48">
                    <Image
                      src="https://avatars.githubusercontent.com/u/95771383?v=4"
                      alt="Brian Kimurgor"
                      fill
                      sizes="(max-width: 768px) 160px, 192px"
                      className="rounded-full border-4 border-green-500 dark:border-green-400 object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                <div className="text-center md:text-left">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    Brian Kimurgor
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-xl md:text-2xl text-green-600 dark:text-green-400 mb-3"
                  >
                    Software Engineer
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-700 dark:text-gray-300 italic"
                  >
                    Turning ideas into scalable software solutions
                  </motion.p>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex justify-center md:justify-start gap-4 mt-6"
                  >
                    <a
                      href="https://github.com/briankimurgor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={22} />
                    </a>
                    <a
                      href="https://linkedin.com/in/briankimurgor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={22} />
                    </a>
                    <a
                      href="https://twitter.com/briankimurgor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter size={22} />
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* About Me Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="h-5 w-1 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
                  Who I Am
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    I'm a passionate software engineer with expertise in full-stack development,
                    specializing in building scalable web applications and robust backend systems.
                    My journey in tech began with a curiosity about how systems work and has
                    evolved into a career creating solutions that solve real-world problems.
                  </p>
                  <p>
                    With a strong foundation in computer science and hands-on experience across
                    the stack, I approach each project with attention to performance, clean
                    architecture, and maintainable code.
                  </p>
                </div>
              </div>

              {/* Tech Stack Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="h-5 w-1 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
                  Tech Stack & Tools
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="text-green-600 dark:text-green-400">
                        {tech.icon}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Principles Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="h-5 w-1 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
                  My Development Principles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {principles.map((principle, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-green-500 dark:bg-green-400 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {principle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="h-5 w-1 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
                  Beyond Coding
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-4">
                  <p>
                    When I'm not building software, you can find me reading psychology books,
                    exploring agricultural innovations, or contributing to open-source projects.
                    I believe in continuous learning and sharing knowledge with the community.
                  </p>
                  <p>
                    I'm also passionate about mentoring junior developers and helping bridge the
                    gap between education and industry requirements in tech.
                  </p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="h-5 w-1 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
                  By The Numbers
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center"
                    >
                      <div className="text-green-600 dark:text-green-400 flex justify-center mb-2">
                        {stat.icon}
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                  Want to see what I've built?
                </h3>
                <motion.a
                  href="/projects"
                  className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Projects
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// NavItem component with TypeScript
interface NavItemProps {
  readonly href: string;
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly active?: boolean;
}

function NavItem({ href, icon, label, active = false }: NavItemProps) {
  return (
    <motion.a
      href={href}
      className={`group relative flex flex-col items-center justify-center w-12 h-12 
      ${
        active
          ? "text-green-600 dark:text-green-400"
          : "text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
      } 
      transition-colors duration-200`}
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