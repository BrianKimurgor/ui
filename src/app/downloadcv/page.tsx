"use client";
import { useState, useEffect } from "react";
import {
    Menu,
    X,
    Download,
    FileDown,
    FileText as FileDoc,
    Star,
    Award,
    Calendar,
    Share2,
    Printer,
    ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebartwo";

export default function DownloadCVPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeFormat, setActiveFormat] = useState("pdf");
    const [downloadClicked, setDownloadClicked] = useState(false);

    // Handle hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarOpen &&
                !(event.target as HTMLElement).closest(".sidebar") &&
                !(event.target as HTMLElement).closest(".sidebar-toggle")
            ) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarOpen]);

    // Reset download button animation
    useEffect(() => {
        if (downloadClicked) {
            const timer = setTimeout(() => {
                setDownloadClicked(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [downloadClicked]);

    // Handle CV download
    type CVFormat = 'pdf' | 'docx';

    const handleDownload = (format: CVFormat) => {
        setDownloadClicked(true);
        setActiveFormat(format);
        //i will trigger main download later
    };


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
            <div className="md:ml-20 flex justify-center items-center min-h-screen py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row">
                        {/* CV Preview Section */}
                        <div className="lg:w-2/3 p-8 md:p-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                            Brian Kimurgor
                                        </h2>
                                        <p className="text-xl text-green-600 dark:text-green-400">
                                            Software Engineer
                                        </p>
                                    </div>
                                    <div className="flex gap-3 mt-4 md:mt-0">
                                        <ActionButton
                                            icon={<Share2 size={18} />}
                                            label="Share"
                                            onClick={() => { }}
                                        />
                                        <ActionButton
                                            icon={<Printer size={18} />}
                                            label="Print"
                                            onClick={() => window.print()}
                                        />
                                    </div>
                                </div>

                                {/* CV Content */}
                                <div className="space-y-6 md:space-y-10">
                                    {/* Summary */}
                                    <CVSection title="Professional Summary">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Versatile Software Engineer with expertise in full-stack web development,
                                            specializing in modern JavaScript frameworks and backend technologies.
                                            Passionate about creating scalable, efficient applications with clean
                                            code and intuitive user experiences.
                                        </p>
                                    </CVSection>

                                    {/* Experience */}
                                    <CVSection title="Work Experience">
                                        <div className="space-y-6">
                                            <ExperienceItem
                                                title="Software Engineer"
                                                company="Griffinglobal Technologies"
                                                period="Jan 2024 - Present"
                                                location="Nairobi, Kenya"
                                                description="Building scalable systems and APIs, contributing to system architecture and DevOps infrastructure. Leading frontend development with React and Next.js."
                                            />

                                            <ExperienceItem
                                                title="Junior Developer"
                                                company="Tech Innovations Ltd."
                                                period="Jun 2022 - Dec 2023"
                                                location="Remote"
                                                description="Developed responsive web applications and contributed to the company's design system. Worked on both frontend and backend components using TypeScript and Node.js."
                                            />
                                        </div>
                                    </CVSection>

                                    {/* Education */}
                                    <CVSection title="Education">
                                        <div className="space-y-4">
                                            <EducationItem
                                                degree="Bachelor of Science in Computer Science"
                                                institution="University of Nairobi"
                                                year="2018 - 2022"
                                            />

                                            <EducationItem
                                                degree="Full-Stack Web Development"
                                                institution="Moringa School"
                                                year="2021"
                                            />
                                        </div>
                                    </CVSection>

                                    {/* Skills */}
                                    <CVSection title="Key Skills">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {[
                                                "TypeScript",
                                                "React & Next.js",
                                                ".NET Core",
                                                "Node.js",
                                                "PostgreSQL",
                                                "Docker",
                                                "RESTful APIs",
                                                "Git",
                                                "TailwindCSS",
                                            ].map((skill) => (
                                                <div
                                                    key={skill}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Star
                                                        size={16}
                                                        className="text-green-600 dark:text-green-400"
                                                    />
                                                    <span className="text-gray-800 dark:text-gray-300">
                                                        {skill}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CVSection>

                                    {/* Achievements */}
                                    <CVSection title="Achievements">
                                        <div className="space-y-3">
                                            {[
                                                "Led migration to a microservices architecture, improving system reliability by 35%",
                                                "Reduced API response times by 40% through performance optimization",
                                                "Developed an internal tool that saved 10+ hours per week for the team",
                                            ].map((achievement) => (
                                                <div
                                                    key={achievement}
                                                    className="flex items-start gap-2"
                                                >
                                                    <Award
                                                        size={18}
                                                        className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0"
                                                    />
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {achievement}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CVSection>
                                </div>
                            </motion.div>
                        </div>

                        {/* Download Section */}
                        <div className="lg:w-1/3 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-8 md:p-10">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="sticky top-10"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Download Resume
                                </h2>

                                <p className="text-gray-700 dark:text-gray-300 mb-8">
                                    Download my resume in your preferred format. Feel free to reach
                                    out if you have any questions or would like to discuss potential
                                    opportunities.
                                </p>

                                <div className="space-y-4">

                                    <DownloadOption
                                        icon={<FileDoc size={22} />}
                                        format="DOCX"
                                        description="Editable Word document format"
                                        active={activeFormat === "docx"}
                                        onClick={() => handleDownload("docx")}
                                    />

                                    <DownloadOption
                                        icon={<FileDown size={22} />}
                                        format="pdf"
                                        description="Simple text format for easy copying"
                                        active={activeFormat === "pdf"}
                                        onClick={() => handleDownload("pdf")}
                                    />
                                </div>

                                <div className="mt-8">
                                    <motion.button
                                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                                        onClick={() => handleDownload(activeFormat as CVFormat)}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        animate={
                                            downloadClicked
                                                ? {
                                                    backgroundColor: [
                                                        "#047857", // green-700
                                                        "#10B981", // green-500
                                                        "#047857", // green-700
                                                    ],
                                                    transition: { duration: 1 },
                                                }
                                                : {}
                                        }
                                    >
                                        <Download size={18} />
                                        Download {activeFormat.toUpperCase()}
                                    </motion.button>
                                </div>

                                <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-600">
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                                        Looking for something specific?
                                    </h3>
                                    <a
                                        href="/contact"
                                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium flex items-center gap-2"
                                    >
                                        Contact me for more info
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Helper components


interface ActionButtonProps {
    readonly icon: React.ReactNode;
    readonly label: string;
    readonly onClick: () => void;
}
function ActionButton({ icon, label, onClick }: ActionButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            className="px-3 py-2 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </motion.button>
    );
}

interface CVSectionProps {
    readonly title: string;
    readonly children: React.ReactNode;
}

function CVSection({ title, children }: CVSectionProps) {
    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <div className="h-5 w-1 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
                {title}
            </h3>
            <div className="ml-3">{children}</div>
        </div>
    );
}


interface ExperienceItemProps {
    readonly title: string;
    readonly company: string;
    readonly period: string;
    readonly location: string;
    readonly description: string;
}
function ExperienceItem({ title, company, period, location, description }: ExperienceItemProps) {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    {title} at {company}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar size={14} />
                    {period}
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{location}</p>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
    );
}


interface EducationItemProps {
    readonly degree: string;
    readonly institution: string;
    readonly year: string;
}

function EducationItem({ degree, institution, year }: EducationItemProps) {
    return (
        <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{degree}</h4>
            <div className="flex justify-between items-center">
                <p className="text-gray-700 dark:text-gray-300">{institution}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{year}</p>
            </div>
        </div>
    );
}


interface DownloadOptionProps {
    readonly icon: React.ReactNode;
    readonly format: string;
    readonly description: string;
    readonly active: boolean;
    readonly onClick: () => void;
}
function DownloadOption({ icon, format, description, active, onClick }: DownloadOptionProps) {
    return (
        <motion.div
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 flex items-start gap-3 ${active
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700"
                : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                }`}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div
                className={`p-2 rounded-full ${active
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}
            >
                {icon}
            </div>
            <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                    {format} Format
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}