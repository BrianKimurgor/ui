"use client";
import { useState, useEffect } from "react";
import {
    Mail,
    Menu,
    X,
    Send,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Twitter,
    Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebartwo";

export default function ContactPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [formStatus, setFormStatus] = useState({ type: "", message: "" });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    // The rest of your component remains unchanged
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Form validation
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus({
                type: "error",
                message: "Please fill in all required fields."
            });
            return;
        }

        // Here you would typically send the form data to your backend
        // For now, we'll just simulate a successful submission
        setFormStatus({
            type: "success",
            message: "Thank you! Your message has been sent successfully."
        });

        // Reset form after successful submission
        setTimeout(() => {
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
            setFormStatus({ type: "", message: "" });
        }, 3000);
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
                        {/* Contact Info Section */}
                        <div className="lg:w-2/5 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-8 md:p-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-8">
                                    Feel free to reach out with any questions or opportunities. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                </p>

                                <div className="space-y-6">
                                    <ContactInfoItem
                                        icon={<Mail className="text-green-600" size={22} />}
                                        title="Email"
                                        detail="kimurgorbrian20@gmail.com"
                                        link="mailto:kimurgorbrian20@gmail.com"
                                    />

                                    <ContactInfoItem
                                        icon={<Phone className="text-green-600" size={22} />}
                                        title="Phone"
                                        detail="+254 (748) 983-103"
                                        link="tel:+254748983103"
                                    />

                                    <ContactInfoItem
                                        icon={<MapPin className="text-green-600" size={22} />}
                                        title="Location"
                                        detail="Kapsabet, Kenya" link={undefined}
                                        />

                                    <ContactInfoItem
                                        icon={<Clock className="text-green-600" size={22} />}
                                        title="Working Hours"
                                        detail="Mon - Fri: 9:00 AM - 5:00 PM" link={undefined}                                    />
                                </div>

                                {/* Social Links */}
                                <div className="mt-10">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Connect With Me</h3>
                                    <div className="flex space-x-5">
                                        <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com" bgColor="bg-blue-600" />
                                        <SocialIcon icon={<Github size={20} />} href="https://github.com" bgColor="bg-gray-800" />
                                        <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com" bgColor="bg-blue-400" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form Section */}
                        <div className="lg:w-3/5 p-8 md:p-10">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>

                                {/* Status Message */}
                                <AnimatePresence>
                                    {formStatus.message && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className={`mb-6 p-4 rounded-lg ${formStatus.type === "success"
                                                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                                                    : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                                                }`}
                                        >
                                            {formStatus.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Your email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="What is this regarding?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-1">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                            placeholder="Your message"
                                            required
                                        ></textarea>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Send Message
                                        <Send size={18} />
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


interface NavItemProps {
    readonly href: string;
    readonly icon: React.ReactNode;
    readonly label: string;
    readonly active: boolean;
}
// Helper components
function NavItem({ href, icon, label, active }: NavItemProps) {
    return (
        <motion.a
            href={href}
            className={`group relative flex flex-col items-center justify-center w-12 h-12 
      ${active
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"} 
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


interface ContactInfoItemProps {
    readonly icon: React.ReactNode;
    readonly title: string;
    readonly detail: string;
    readonly link?: string; // link is optional
}
function ContactInfoItem({ icon, title, detail, link }: ContactInfoItemProps) {
    return (
        <div className="flex items-start space-x-3">
            <div className="mt-1">{icon}</div>
            <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
                {link ? (
                    <a
                        href={link}
                        className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                        {detail}
                    </a>
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">{detail}</p>
                )}
            </div>
        </div>
    );
}

interface SocialIconProps {
    readonly icon: React.ReactNode;
    readonly href: string;
    readonly bgColor: string;
}


function SocialIcon({ icon, href, bgColor }: SocialIconProps) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bgColor} hover:opacity-90 text-white p-3 rounded-full flex items-center justify-center`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
        >
            {icon}
        </motion.a>
    );
}