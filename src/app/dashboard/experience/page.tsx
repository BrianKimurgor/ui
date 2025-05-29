'use client';

import { useEffect, useState } from 'react';
import { Briefcase, Plus, Pencil } from 'lucide-react';
import { getWorks, deleteWork } from '@/services/workService/workService';
import { WorkDto } from '@/types/work';
import { useRouter } from 'next/navigation';

function ExperienceCard({
  work,
  onEdit,
  onDelete,
}: {
  work: WorkDto;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between min-h-[180px]">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{work.CompanyName}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{work.JobTitle}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {work.StartDate ? new Date(work.StartDate).toLocaleDateString() : ''} - {work.EndDate ? new Date(work.EndDate).toLocaleDateString() : 'Present'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{work.Description}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="text-sm px-2 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded-md flex items-center gap-1"
        >
          <Pencil className="w-4 h-4" /> Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  const router = useRouter();
  const [experience, setExperience] = useState<WorkDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const data = await getWorks();
        setExperience(data);
      } catch (err) {
        console.error('Failed to fetch experience', err);
      } finally {
        setLoading(false);
      }
    }
    fetchExperience();
  }, []);

  const handleAddExperience = () => {
    router.push('/dashboard/experience/add');
  };

  const handleEditExperience = (id: string) => {
    router.push(`/dashboard/experience/edit/${id}`);
  };

  const handleDeleteExperience = async (id: string) => {
    try {
      await deleteWork(id);
      setExperience(experience.filter((exp) => exp.Id !== id));
    } catch (error) {
      console.error('Failed to delete experience:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Briefcase className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Experience</h2>
        </div>
        <button
          onClick={handleAddExperience}
          className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading experience...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {experience.map((exp) => (
            <ExperienceCard
              key={exp.Id}
              work={exp}
              onEdit={() => handleEditExperience(exp.Id)}
              onDelete={() => handleDeleteExperience(exp.Id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
