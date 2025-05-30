"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateEducationDto } from "@/types/education";
import { createEducation } from "@/services/educationService/educationService";
import { ToastContainer, toast } from "react-toastify";

export default function AddEducationPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        SchoolName: "",
        Degree: "",
        FieldOfStudy: "",
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const educationData: CreateEducationDto = {
                ...form,
                StartDate: new Date(startDate).toISOString(),
                EndDate: endDate ? new Date(endDate).toISOString() : "",
            };            
    
            await createEducation(educationData);
            toast.success("Education added successfully!");
            setTimeout(() => router.push("/dashboard/education"), 1200);
        } catch (err) {
            const error = err as Error;
            console.error("Error creating education:", error.message);
            toast.error(error.message || "Failed to add education.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-8">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add Education</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="SchoolName" className="block text-gray-700 dark:text-gray-200 mb-1">School Name</label>
                    <input
                        id="SchoolName"
                        type="text"
                        name="SchoolName"
                        value={form.SchoolName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Degree" className="block text-gray-700 dark:text-gray-200 mb-1">Degree</label>
                    <input
                        id="Degree"
                        type="text"
                        name="Degree"
                        value={form.Degree}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="FieldOfStudy" className="block text-gray-700 dark:text-gray-200 mb-1">Field of Study</label>
                    <input
                        id="FieldOfStudy"
                        type="text"
                        name="FieldOfStudy"
                        value={form.FieldOfStudy}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
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
                    {loading ? "Adding..." : "Add Education"}
                </button>
            </form>
        </div>
    );
}
