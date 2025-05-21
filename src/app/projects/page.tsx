"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  ExternalLink,
  Code,
  Server,
  Layout,
  Smartphone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebartwo";


type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  links: {
    github?: string;
    live?: string;
  };
  features: string[];
  techStack: {
    frontend?: string[];
    backend?: string[];
    mobile?: string[];
  };
};

export default function ProjectsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product listings, cart functionality, and secure checkout process.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/images/ecommerce.jpg",
      links: {
        github: "https://github.com/username/ecommerce-platform",
        live: "https://ecommerce.example.com",
      },
      features: [
        "Product catalog with filters and search",
        "User authentication and profiles",
        "Shopping cart and wishlist",
        "Secure payment processing",
        "Admin dashboard",
      ],
      techStack: {
        frontend: ["React", "TypeScript", "Redux", "TailwindCSS"],
        backend: ["Node.js", "Express", "MongoDB", "Redis"],
      },
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team functionality.",
      tags: ["Next.js", "Firebase", "Real-time"],
      image: "/images/taskapp.jpg",
      links: {
        github: "https://github.com/username/task-management",
        live: "https://tasks.example.com",
      },
      features: [
        "Real-time task updates",
        "Drag-and-drop interface",
        "Team collaboration",
        "Due date reminders",
        "Activity history",
      ],
      techStack: {
        frontend: ["Next.js", "TypeScript", "React DnD", "Chakra UI"],
        backend: ["Firebase", "Firestore"],
      },
    },
    {
      id: 3,
      title: "Health & Fitness Mobile App",
      description:
        "A mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
      tags: ["React Native", "GraphQL", "HealthKit"],
      image: "/images/fitnessapp.jpg",
      links: {
        github: "https://github.com/username/fitness-app",
      },
      features: [
        "Workout tracking with animations",
        "Nutrition logging",
        "Health data integration",
        "Progress analytics",
        "Personalized recommendations",
      ],
      techStack: {
        mobile: ["React Native", "TypeScript", "Expo"],
        backend: ["GraphQL", "Apollo Server", "PostgreSQL"],
      },
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing projects, skills, and contact information.",
      tags: ["Next.js", "TailwindCSS", "Framer Motion"],
      image: "/images/portfolio.jpg",
      links: {
        github: "https://github.com/username/portfolio",
        live: "https://portfolio.example.com",
      },
      features: [
        "Responsive design",
        "Project showcase",
        "Interactive elements",
        "Dark mode",
        "Contact form",
      ],
      techStack: {
        frontend: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
      },
    },
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
          className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden"
        >
          <div className="p-8 md:p-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Projects
                </h2>
                <p className="text-xl text-green-600 dark:text-green-400">
                  A collection of my recent work
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <h3 className="text-xl font-semibold text-white">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          >
                            <Github size={18} />
                            <span>Code</span>
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="ml-auto text-sm text-green-600 dark:text-green-400 hover:underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Project Modal */}
              <AnimatePresence>
                {selectedProject && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 50 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 50 }}
                      className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative">
                        <div className="h-64 bg-gray-200 dark:bg-gray-700 w-full"></div>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {selectedProject.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                          {selectedProject.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                              <Layout size={20} />
                              Key Features
                            </h4>
                            <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                              {selectedProject.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              Technology Stack
                            </h4>
                            {selectedProject.techStack.frontend && (
                              <div className="mb-4">
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400 mb-2">
                                  <Code size={18} />
                                  <span className="font-medium">Frontend</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProject.techStack.frontend.map(
                                    (tech) => (
                                      <span
                                        key={tech}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                                      >
                                        {tech}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                            {selectedProject.techStack.backend && (
                              <div className="mb-4">
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400 mb-2">
                                  <Server size={18} />
                                  <span className="font-medium">Backend</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProject.techStack.backend.map(
                                    (tech) => (
                                      <span
                                        key={tech}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                                      >
                                        {tech}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                            {selectedProject.techStack.mobile && (
                              <div className="mb-4">
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400 mb-2">
                                  <Smartphone size={18} />
                                  <span className="font-medium">Mobile</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProject.techStack.mobile.map(
                                    (tech) => (
                                      <span
                                        key={tech}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                                      >
                                        {tech}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
                          {selectedProject.links.github && (
                            <a
                              href={selectedProject.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
                            >
                              <Github size={18} />
                              View Code
                            </a>
                          )}
                          {selectedProject.links.live && (
                            <a
                              href={selectedProject.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                            >
                              <ExternalLink size={18} />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
