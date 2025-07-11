"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { getProfile } from "@/services/profileService/profileService";
import { ProfileReadDto } from "@/types/profile";

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<ProfileReadDto | null>(null);

  // Handle hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
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

  if (!mounted || !profile) return null;

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4 md:p-8 relative">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 text-white bg-green-800 hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Navigation"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        initial={{ x: "-100%" }}
        animate={{ x: sidebarOpen ? "0%" : "-100%" }}
        exit={{ x: "-100%" }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {profile.Name} - {profile.Role}
            </p>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <a
                href="/dashboard/profile/edit"
                className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Edit Profile
              </a>
            </li>
            <li>
              <a
                href="/dashboard/profile/settings"
                className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 w-full p-4 border-t dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2023 Your Company
          </p>
        </div>
        </motion.div>
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:ml-64 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Profile Details
            </h1>
            <div className="space-y-4">
                <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Name
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{profile.Name}</p>
                </div>
                <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Role
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{profile.Role}</p>
                </div>
                {/* Add more profile fields as needed */}
            </div>
        </motion.div>
    </div>
    );
}