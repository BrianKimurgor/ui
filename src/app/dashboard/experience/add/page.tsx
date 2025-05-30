"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWork } from "@/services/workService/workService";
import { CreateWorkDto } from "@/types/work";
import { ToastContainer, toast } from 'react-toastify';

export default function AddExperiencePage() {
    const router = useRouter();
    const [form, setForm] = useState<CreateWorkDto>({
        CompanyName: "",
        JobTitle: "",
        LogoUrl: "",
        Description: "",
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createWork({
                ...form,
                StartDate: startDate ? new Date(startDate) : undefined,
                EndDate: endDate ? new Date(endDate) : undefined,
            } as any);
            toast.success("Experience added successfully!");
            setTimeout(() => router.push("/dashboard/experience"), 1200);
        } catch (err) {
            const error = err as Error;
            console.error("Error creating work:", error.message);
            toast.error(error.message || "Failed to add experience.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-8">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="CompanyName" className="block text-gray-700 dark:text-gray-200 mb-1">Company Name</label>
                    <input
                        id="CompanyName"
                        type="text"
                        name="CompanyName"
                        value={form.CompanyName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="JobTitle" className="block text-gray-700 dark:text-gray-200 mb-1">Job Title</label>
                    <input
                        id="JobTitle"
                        type="text"
                        name="JobTitle"
                        value={form.JobTitle}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="LogoUrl" className="block text-gray-700 dark:text-gray-200 mb-1">Logo URL</label>
                    <input
                        id="LogoUrl"
                        type="text"
                        name="LogoUrl"
                        value={form.LogoUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                    />
                </div>
                <div>
                    <label htmlFor="Description" className="block text-gray-700 dark:text-gray-200 mb-1">Description</label>
                    <textarea
                        id="Description"
                        name="Description"
                        value={form.Description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                        rows={3}
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label htmlFor="StartDate" className="block text-gray-700 dark:text-gray-200 mb-1">Start Date</label>
                        <input
                            id="StartDate"
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="EndDate" className="block text-gray-700 dark:text-gray-200 mb-1">End Date</label>
                        <input
                            id="EndDate"
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Experience"}
                </button>
            </form>
        </div>
    );
}
