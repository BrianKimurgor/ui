"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getEducations } from "@/services/educationService/educationService";
import { GraduationCap, Plus, Pencil, Eye } from "lucide-react";
import { Education } from "@/types/education";

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchEducations() {
      try {
        const data = await getEducations();
        setEducation(data);
      } catch {
        setError("Failed to fetch education records.");
      } finally {
        setLoading(false);
      }
    }
    fetchEducations();
  }, []);

  let content;

  if (loading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div className="text-red-500">{error}</div>;
  } else {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {education.map((edu) => (
          <div
            key={edu.Id}
            className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {edu.SchoolName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{edu.Degree}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {edu.StartDate} - {edu.EndDate}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => router.push(`/dashboard/education/view/${edu.Id}`)}
                className="text-sm px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-1"
              >
                <Eye className="w-4 h-4" /> View
              </button>
              <button
                onClick={() => router.push(`/dashboard/education/edit/${edu.Id}`)}
                className="text-sm px-2 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded-md flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <GraduationCap className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Education</h2>
        </div>
        <button
          onClick={() => router.push("/dashboard/education/add")}
          className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {content}
    </div>
  );
}