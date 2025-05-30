"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getWorkById, updateWork } from "@/services/workService/workService";
import { UpdateWorkDto, WorkDto } from "@/types/work";
import { ToastContainer, toast } from 'react-toastify';

export default function EditExperiencePage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [form, setForm] = useState<UpdateWorkDto | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchWork() {
            try {
                const data: WorkDto = await getWorkById(id);
                setForm({
                    Id: data.Id,
                    CompanyName: data.CompanyName,
                    JobTitle: data.JobTitle,
                    LogoUrl: data.LogoUrl,
                    Description: data.Description,
                    StartDate: data.StartDate,
                    EndDate: data.EndDate,
                });
                setStartDate(data.StartDate ? new Date(data.StartDate).toISOString().split("T")[0] : "");
                setEndDate(data.EndDate ? new Date(data.EndDate).toISOString().split("T")[0] : "");
            } catch (err)
            {
                const error = err as Error;
                console.error("Error fetching work:", error.message);
                toast.error(error.message || "Failed to fetch experience.");
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchWork();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!form) return;
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;
        setSaving(true);
        setError("");
        try {
            await updateWork(id, {
                ...form,
                StartDate: startDate ? new Date(startDate) : form.StartDate,
                EndDate: endDate ? new Date(endDate) : form.EndDate,
            });
            router.push("/dashboard/experience");
        } catch (err) {
            const error = err as Error;
            console.error("Error updating work:", error.message);
            toast.error(error.message || "Failed to update experience.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center p-8 text-gray-600 dark:text-gray-300">Loading...</div>;
    }
    if (!form) {
        return <div className="text-center p-8 text-red-500">Experience not found.</div>;
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-8">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Edit Experience</h2>
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Update Experience"}
                </button>
            </form>
        </div>
    );
}
