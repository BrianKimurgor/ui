"use client";
import { useState, useEffect } from "react";
import {
  Info,
  Mail,
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  Codepen,
} from "lucide-react";
import { motion } from "framer-motion";

type SocialLink = {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  darkColor: string;
  description: string;
};

export default function SocialsPage() {
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

  const socialLinks: SocialLink[] = [
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/briankimurgor",
      icon: <Github size={24} />,
      color: "bg-gray-800",
      darkColor: "bg-gray-700",
      description: "My open-source projects and contributions",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/in/briankimurgor",
      icon: <Linkedin size={24} />,
      color: "bg-blue-600",
      darkColor: "bg-blue-700",
      description: "Professional network and experience",
    },
    {
      id: "twitter",
      name: "Twitter",
      url: "https://twitter.com/briankimurgor",
      icon: <Twitter size={24} />,
      color: "bg-sky-500",
      darkColor: "bg-sky-600",
      description: "Tech thoughts and quick updates",
    },
    {
      id: "youtube",
      name: "YouTube",
      url: "https://youtube.com/briankimurgor",
      icon: <Youtube size={24} />,
      color: "bg-red-600",
      darkColor: "bg-red-700",
      description: "Coding tutorials and demos",
    },
    {
      id: "codepen",
      name: "CodePen",
      url: "https://codepen.io/briankimurgor",
      icon: <Codepen size={24} />,
      color: "bg-gray-800",
      darkColor: "bg-gray-900",
      description: "Frontend experiments and prototypes",
    },
    {
      id: "website",
      name: "Personal Website",
      url: "https://briankimurgor.dev",
      icon: <Globe size={24} />,
      color: "bg-green-600",
      darkColor: "bg-green-700",
      description: "My portfolio and blog",
    },
  ];

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
              {/* Header */}
              <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  My Social Profiles
                </h1>
                <p className="text-xl text-green-600 dark:text-green-400">
                  Connect with me across platforms
                </p>
              </div>

              {/* Social Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className={`${social.color} dark:${social.darkColor} p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 dark:bg-black/20 rounded-full backdrop-blur-sm">
                        {social.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {social.name}
                        </h3>
                        <p className="text-white/80 dark:text-white/70 text-sm mt-1">
                          {social.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <div className="px-3 py-1 bg-white/20 dark:bg-black/20 rounded-full text-white text-sm group-hover:bg-white/30 dark:group-hover:bg-black/30 transition-all">
                        Visit Profile
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Where to find me
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  I&apos;m most active on GitHub, Twitter, and LinkedIn. Feel free to
                  reach out on any platform - I&apos;m always open to interesting
                  discussions, collaborations, or just saying hello!
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:hello@briankimurgor.dev"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Mail size={18} />
                    Email Me
                  </a>
                  <a
                    href="/contact"
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Info size={18} />
                    Contact Form
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}