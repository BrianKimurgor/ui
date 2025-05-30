"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEducationById } from "@/services/educationService/educationService";
import { GraduationCap, Pencil, ArrowLeft } from "lucide-react";
import { Education } from "@/types/education";

export default function ViewEducationPage() {
    const params = useParams() ?? {};
    const router = useRouter();
    const id = params.id as string;
    const [education, setEducation] = useState<Education>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchEducation() {
            try {
                const edu = await getEducationById(id);
                setEducation(edu);
            } catch {
                setError("Failed to fetch education.");
            } finally {
                setLoading(false);
            }
        }
        fetchEducation();
    }, [id]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!education) return <div className="p-6">No education found.</div>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow mt-8">
            <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{education.SchoolName}</h2>
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Degree:</span> {education.Degree}
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Field of Study:</span> {education.FieldOfStudy}
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Start Date:</span> {education.StartDate}
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200">
                <span className="font-semibold">End Date:</span> {education.EndDate}
            </div>

            <div className="flex justify-between mt-6 gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                    onClick={() => router.push(`/dashboard/education/edit/${education.Id}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition"
                >
                    <Pencil className="w-4 h-4" /> Edit
                </button>
            </div>
        </div>
    );
}
