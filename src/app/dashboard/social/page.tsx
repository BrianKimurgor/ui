"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { getSocials } from "@/services/socialService/socialService";
import { Social } from "@/types/socials";

export default function SocialsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [socials, setSocials] = useState<Social[]>([]);

  // Handle hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch socials
  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const data = await getSocials();
        setSocials(data);
      } catch (error) {
        console.error("Failed to fetch socials:", error);
      }
    };
    fetchSocials();
  }, []);

  // Close sidebar on outside click
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4 md:p-8 relative">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 text-white bg-green-800 hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 sidebar-toggle"
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
              <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  My Social Profiles
                </h1>
                <p className="text-xl text-green-600 dark:text-green-400">
                  Connect with me across platforms
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socials.map((social) => (
                  <motion.a
                    key={social.Id}
                    href={social.Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="bg-green-800 dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 dark:bg-black/20 rounded-full backdrop-blur-sm">
                        <span className="text-white font-semibold">
                          {social.Icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {social.Platform}
                        </h3>
                        <p className="text-white/70 text-sm mt-1 truncate">
                          {social.Url}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="px-3 py-1 bg-white/20 dark:bg-black/20 rounded-full text-white text-sm group-hover:bg-white/30 dark:group-hover:bg-black/30 transition-all">
                        Visit Profile
                      </div>
                      <a
                        href={`/dashboard/social/edit/${social.Id}`}
                        className="text-sm text-green-300 hover:text-green-100 underline transition-all"
                      >
                        Edit
                      </a>
                    </div>

                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
