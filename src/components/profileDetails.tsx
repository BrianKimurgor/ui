//profile details
import { useEffect, useState } from "react";
import { getProfile } from "@/services/profileService/profileService";
import { ProfileReadDto } from "@/types/profile";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";


export default function ProfileDetails() {
    const [profile, setProfile] = useState<ProfileReadDto | null>(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const t = useTranslations("Profile");
    // const { theme } = useTheme();
    const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                toast.error(t("fetchError"));
            }
        };
        fetchProfile();
    }, [t]);

    if (!mounted || !profile) return null;

    return (
        <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4 md:p-8 relative">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                >
                    <div className="flex items-center space-x-4 mb-6">
                        <User size={48} className="text-gray-500 dark:text-gray-400" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {profile.Name}
                        </h1>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{profile.Bio}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {t("role")}: {profile.Role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {t("company")}: {profile.Company}
                    </p>
                    <Button
                        onClick={() => router.push("/dashboard/Profile/edit")}
                        className={`mt-4 ${isMobile ? "w-full" : "w-auto"}`}
                    >
                        {
                            t("editProfile")
                        }
                    </Button>
                </motion.div>
            </div>
            <div className="mt-8">
                <Button
                    onClick={() => router.push("/dashboard")}
                    className={`w-full ${isMobile ? "w-full" : "w-auto"}`}
                >
                    {t("backToDashboard")}
                </Button>
            </div>
        </div>
    );
}