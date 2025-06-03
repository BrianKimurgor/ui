"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebartwo";
import { getProjects } from "@/services/projectService/projectService";
import { Project } from "@/types/project";
import Image from "next/image";
;

export default function ProjectsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Handle hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch projects from backend
 useEffect(() => {
  const fetchProjects = async () => {
    try {
      const data: Project[] = await getProjects();

      const normalized = data.map((p: Project) => ({
        Id: p.Id,
        Title: p.Title,
        Description: p.Description,
        Tags: p.Tags ?? [],
        ImageUrl: p.ImageUrl ?? '',
        GitHubUrl: p.GitHubUrl ?? '',
        LiveDemoUrl: p.LiveDemoUrl ?? '',
        CreatedAt: p.CreatedAt,
        UpdatedAt: p.UpdatedAt,
      }));

      setProjects(normalized);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  fetchProjects();
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
                    key={project.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                      <div className="h-48 relative overflow-hidden">
                        {project.ImageUrl ? (
                          <Image
                            src={project.ImageUrl}
                            alt={project.Title}
                            width={50}
                            height={50}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                          <h3 className="text-xl font-semibold text-white">
                            {project.Title}
                          </h3>
                        </div>
                      </div>

                    </div>
                    <div className="p-5">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {project.Description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.Tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.GitHubUrl && (
                          <a
                            href={project.GitHubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            <Github size={20} />
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
                          {selectedProject.Title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                          {selectedProject.Description}
                        </p>
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
