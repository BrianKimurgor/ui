"use client";
import { useState, useEffect } from "react";
import {
  Folder,
  Briefcase,
  Code2,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
} from "lucide-react";
import { motion} from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


type ActivityItem = {
  id: number;
  title: string;
  date: string;
  type: "project" | "skill" | "experience" | "update";
};

type Recommendation = {
  id: number;
  text: string;
  priority: "high" | "medium" | "low" | "complete";
};

type Metric = {
  name: string;
  value: string | number;
  change?: string;
  subtext?: string;
};

export default function DashboardPage() {
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

  const activities: ActivityItem[] = [
    {
      id: 1,
      title: 'Added new project "AI Portfolio Analyzer"',
      date: "Apr 25, 2025 at 10:30 AM",
      type: "project",
    },
    {
      id: 2,
      title: 'Updated skill "TypeScript" to Expert level',
      date: "Apr 25, 2025 at 9:15 AM",
      type: "skill",
    },
    {
      id: 3,
      title: 'Updated work experience at "TechCorp"',
      date: "Apr 22, 2025 at 9:45 AM",
      type: "experience",
    },
    {
      id: 4,
      title: "Refreshed portfolio homepage design",
      date: "Apr 20, 2025 at 2:10 PM",
      type: "update",
    },
  ];

  const recommendations: Recommendation[] = [
    {
      id: 1,
      text: "Add more detailed descriptions to your 3 most recent projects",
      priority: "high",
    },
    {
      id: 2,
      text: "Update your profile photo (last updated 6 months ago)",
      priority: "medium",
    },
    {
      id: 3,
      text: "Your skills section is up to date!",
      priority: "complete",
    },
  ];

  const metrics: Metric[] = [
    {
      name: "Portfolio Views",
      value: "1,243",
      change: "12%",
      subtext: "this month",
    },
    {
      name: "Contact Requests",
      value: "8",
      change: "3 new",
      subtext: "this week",
    },
    {
      name: "Most Viewed Project",
      value: "E-commerce Dashboard",
      subtext: "328 views",
    },
    {
      name: "Top Skill Interest",
      value: "React.js",
      subtext: "42% of visitors",
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-full w-full bg-gray-100 dark:bg-gray-900 p-4 md:p-8 relative">
      {/* Mobile Toggle Button */}
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
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Portfolio Dashboard
                </h1>
                <p className="text-gray-700 dark:text-gray-300">
                  Overview of your portfolio metrics and activity
                </p>
              </header>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatsCard
                  title="Total Projects"
                  value={15}
                  icon={<Folder size={24} />}
                  color="bg-blue-50 dark:bg-blue-900/20"
                  iconColor="text-blue-600 dark:text-blue-400"
                  lastUpdated="April 27, 2025"
                />
                <StatsCard
                  title="Skills"
                  value={25}
                  icon={<Code2 size={24} />}
                  color="bg-green-50 dark:bg-green-900/20"
                  iconColor="text-green-600 dark:text-green-400"
                  lastUpdated="April 27, 2025"
                />
                <StatsCard
                  title="Experiences"
                  value={5}
                  icon={<Briefcase size={24} />}
                  color="bg-amber-50 dark:bg-amber-900/20"
                  iconColor="text-amber-600 dark:text-amber-400"
                  lastUpdated="April 27, 2025"
                />
                <StatsCard
                  title="Status"
                  value="Active"
                  icon={<CheckCircle size={24} />}
                  color="bg-purple-50 dark:bg-purple-900/20"
                  iconColor="text-purple-600 dark:text-purple-400"
                  lastUpdated="April 27, 2025"
                />
              </div>

              {/* Recent Activity */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="h-5 w-1 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
                  Recent Activity
                </h2>
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                    {activities.map((activity) => (
                      <motion.li
                        key={activity.id}
                        whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
                        className="p-4 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">
                              {activity.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {activity.date}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              activity.type === "project"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                : activity.type === "skill"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : activity.type === "experience"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300"
                            }`}
                          >
                            {activity.type.charAt(0).toUpperCase() +
                              activity.type.slice(1)}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Portfolio Health */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="h-5 w-1 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
                  Portfolio Health
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recommendations */}
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
                    <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                      Recommendations
                    </h3>
                    <ul className="space-y-4">
                      {recommendations.map((rec) => (
                        <li key={rec.id} className="flex items-start">
                          <div
                            className={`flex-shrink-0 mt-1 mr-3 ${
                              rec.priority === "complete"
                                ? "text-green-500"
                                : "text-amber-500"
                            }`}
                          >
                            {rec.priority === "complete" ? (
                              <CheckCircle size={18} />
                            ) : (
                              <AlertTriangle size={18} />
                            )}
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {rec.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visibility Analytics */}
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
                    <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                      Visibility Analytics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 dark:bg-gray-600 rounded-lg"
                        >
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            {metric.name}
                          </p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {metric.value}
                          </p>
                          {metric.change && (
                            <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                              <ArrowUp size={12} className="mr-1" />
                              {metric.change}{" "}
                              <span className="text-gray-500 dark:text-gray-400 ml-1">
                                {metric.subtext}
                              </span>
                            </p>
                          )}
                          {metric.subtext && !metric.change && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {metric.subtext}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// StatsCard Component
type StatsCardProps = {
  readonly title: string;
   readonly value: string | number;
  readonly icon: React.ReactNode;
  readonly color: string;
  readonly iconColor: string;
  readonly lastUpdated: string;
};

function StatsCard({
  title,
  value,
  icon,
  color,
  iconColor,
  lastUpdated,
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${color} p-5 rounded-xl shadow-sm`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${iconColor}`}>{icon}</div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        Updated {lastUpdated}
      </p>
    </motion.div>
  );
}
