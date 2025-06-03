"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getWorkById } from "@/services/workService/workService";
import { WorkDto } from "@/types/work";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

export default function ViewExperiencePage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const [work, setWork] = useState<WorkDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWork() {
            try {
                const data = await getWorkById(id);
                setWork(data);
                console.log("Fetched work data:", data);
            } catch (err) {
                const error = err as Error;
                console.error("Error fetching work:", error.message);
                toast.error(error.message || "Failed to fetch experience.");
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchWork();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center p-8 text-gray-600 dark:text-gray-300">Loading...</div>
        );
    }
    if (!work) {
        return <div className="text-center p-8 text-red-500">Experience not found.</div>;
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-8">
            <ToastContainer />
            <button
                onClick={() => router.push("/dashboard/experience")}
                className="mb-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
                &larr; Back
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Experience Details</h2>

            <div className="mb-4">
                <span className="block text-gray-700 dark:text-gray-200 font-semibold">Company Name:</span>
                <span className="block text-gray-900 dark:text-gray-100">{work.CompanyName}</span>
            </div>

            <div className="mb-4">
                <span className="block text-gray-700 dark:text-gray-200 font-semibold">Job Title:</span>
                <span className="block text-gray-900 dark:text-gray-100">{work.JobTitle}</span>
            </div>

            <div className="mb-4">
                <span className="block text-gray-700 dark:text-gray-200 font-semibold">Location:</span>
                <span className="block text-gray-900 dark:text-gray-100">{work.Location || "N/A"}</span>
            </div>

            <div className="mb-4">
                <span className="block text-gray-700 dark:text-gray-200 font-semibold">Period:</span>
                <span className="block text-gray-900 dark:text-gray-100">
                    {work.StartDate ? new Date(work.StartDate).toLocaleDateString() : ""} -{" "}
                    {work.EndDate ? new Date(work.EndDate).toLocaleDateString() : "Present"}
                </span>
            </div>

            {work.LogoUrl && (
                <div className="mb-4">
                    <span className="block text-gray-700 dark:text-gray-200 font-semibold">Logo:</span>
                    <Image
                        src={work.LogoUrl}
                        width={64}
                        height={64}
                        alt={`${work.CompanyName} Logo`}
                        className="h-16 w-16 object-contain rounded border mt-2"
                    />
                </div>
            )}

            <div className="mb-4">
                <span className="block text-gray-700 dark:text-gray-200 font-semibold">Description:</span>
                <span className="block text-gray-900 dark:text-gray-100">{work.Description}</span>
            </div>

            {work.Responsibilities?.length > 0 && (
                <div className="mb-4">
                    <span className="block text-gray-700 dark:text-gray-200 font-semibold">Responsibilities:</span>
                    <ul className="list-disc pl-5 text-gray-900 dark:text-gray-100">
                        {work.Responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                        ))}
                    </ul>
                </div>
            )}

            {work.Tags?.length > 0 && (
                <div className="mb-4">
                    <span className="block text-gray-700 dark:text-gray-200 font-semibold">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {work.Tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-100 text-xs px-2 py-0.5 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
