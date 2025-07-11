"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { getProfile } from "@/services/profileService/profileService";
import { ProfileReadDto } from "@/types/profile";
import Sidebar from "@/components/Sidebar";
import ProfileDetails from "@/components/profileDetails";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [profile, setProfile] = useState<ProfileReadDto | null>(null);
    const router = useRouter();

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
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: sidebarOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
            </button>

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Profile Details */}
            <ProfileDetails profile={profile} />
        </div>
    );
}