"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEducationById, updateEducation } from "@/services/educationService/educationService";
import { ToastContainer, toast } from "react-toastify";
import { Pencil } from "lucide-react";

export default function EditEducationPage() {
    const router = useRouter();
    const params = useParams() ?? {};
    const id = params.id as string;

    const [form, setForm] = useState({
        SchoolName: "",
        Degree: "",
        FieldOfStudy: "",
        StartDate: "",
        EndDate: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEducation() {
            try {
                const edu = await getEducationById(id);
                setForm({
                    SchoolName: edu.SchoolName,
                    Degree: edu.Degree,
                    FieldOfStudy: edu.FieldOfStudy,
                    StartDate: edu.StartDate.slice(0, 10),
                    EndDate: edu.EndDate?.slice(0, 10) || "",
                });
            } catch {
                toast.error("Failed to fetch education.");
            } finally {
                setLoading(false);
            }
        }
        fetchEducation();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateEducation(id, { ...form, Id: id });
            toast.success("Education updated successfully!");
            setTimeout(() => router.push("/dashboard/education"), 1200);
        } catch {
            toast.error("Failed to update education.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-8">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                <Pencil className="w-6 h-6 text-teal-600" /> Edit Education
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="SchoolName" className="block text-gray-700 dark:text-gray-200 mb-1">School Name</label>
                    <input
                        id="SchoolName"
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
                            name="StartDate"
                            type="date"
                            value={form.StartDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="EndDate" className="block text-gray-700 dark:text-gray-200 mb-1">End Date</label>
                        <input
                            id="EndDate"
                            name="EndDate"
                            type="date"
                            value={form.EndDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md transition"
                    disabled={loading}
                >
                    <Pencil className="w-4 h-4 mr-1" /> {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
