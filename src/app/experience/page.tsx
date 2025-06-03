"use client";
import { useState, useEffect } from "react";
import {
    Menu,
    X,
    Calendar,
    ChevronDown,
    ChevronUp,
    ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebartwo";
import { WorkDto } from "@/types/work";
import { getWorks } from "@/services/workService/workService";

export default function ExperiencePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [works, setWorks] = useState<WorkDto[]>([]);
    const [experiencesFromAPI, setExperiencesFromAPI] = useState<WorkDto[]>([]);
    const [expandedExperience, setExpandedExperience] = useState<number | null>(0);

    // Handle hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {

        const fetchWorks = async () => {
            try {
                const data: WorkDto[] = await getWorks();
                
                const normalized = data.map((work: WorkDto) => ({
                    Id: work.Id,
                    CompanyName: work.CompanyName,
                    JobTitle: work.JobTitle,
                    LogoUrl: work.LogoUrl,
                    Description: work.Description,
                    Responsibilities: work.Responsibilities || [],
                    Tags: work.Tags || [],
                    Location: work.Location || "",
                    StartDate: work.StartDate ? new Date(work.StartDate) : null,
                    EndDate: work.EndDate ? new Date(work.EndDate) : null,
                }));

                setExperiencesFromAPI(normalized);
            } catch (error) {
                console.error("Failed to fetch works:", error);
            }
        };
        fetchWorks();

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

    const toggleExperience = (index: number) => {
        setExpandedExperience(expandedExperience === index ? null : index);
    };



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
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Professional Experience
                                </h2>
                                <p className="text-xl text-green-600 dark:text-green-400">
                                    My career journey and technical expertise
                                </p>
                            </div>

                            {/* Experience Timeline */}
                            <div className="space-y-8">
                                {experiencesFromAPI.map((exp, index) => {
                                    // Format dates nicely
                                    const startDate = exp.StartDate
                                        ? new Date(exp.StartDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
                                        : "N/A";
                                    const endDate = exp.EndDate
                                        ? new Date(exp.EndDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
                                        : "Present";
                                    const period = `${startDate} - ${endDate}`;

                                    return (
                                        <motion.div
                                            key={exp.Id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="border-l-2 border-green-500 dark:border-green-400 pl-6 relative pb-6"
                                        >
                                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-green-500 dark:bg-green-400"></div>

                                            <div
                                                className="cursor-pointer"
                                                onClick={() => toggleExperience(index)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                            {exp.JobTitle}
                                                        </h3>
                                                        <p className="text-lg text-gray-700 dark:text-gray-300">
                                                            {exp.CompanyName}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <Calendar size={14} />
                                                        {period}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    {exp.Location || "N/A"}
                                                </p>
                                                <p className="text-gray-700 dark:text-gray-300 mt-2">
                                                    {exp.Description}
                                                </p>
                                                <div className="mt-2 flex justify-end">
                                                    {expandedExperience === index ? (
                                                        <ChevronUp size={20} className="text-green-600 dark:text-green-400" />
                                                    ) : (
                                                        <ChevronDown size={20} className="text-green-600 dark:text-green-400" />
                                                    )}
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {expandedExperience === index && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-4 space-y-4">
                                                            <div>
                                                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                                                    Key Responsibilities:
                                                                </h4>
                                                                <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                                                                    {exp.Responsibilities.map((item, i) => (
                                                                        <li key={i}>{item}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            <div>
                                                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                                                    Technologies Used:
                                                                </h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {exp.Tags.map((tech, i) => (
                                                                        <span
                                                                            key={i}
                                                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                                                                        >
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}

                            </div>

                            {/* Additional Info */}
                            <div className="mt-12 pt-6 border-t border-gray-300 dark:border-gray-600">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                                    Want to know more about my experience?
                                </h3>
                                <a
                                    href="/contact"
                                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium flex items-center gap-2"
                                >
                                    Contact me for references or details
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}