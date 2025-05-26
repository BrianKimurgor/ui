'use client';

import { useState } from 'react';
import { GraduationCap, Plus, Pencil } from 'lucide-react';

const initialEducation = [
  {
    institution: 'University of Nairobi',
    degree: 'BSc. Computer Science',
    period: '2019 - 2023',
  },
  {
    institution: 'ALX Africa',
    degree: 'Software Engineering Program',
    period: '2022 - 2023',
  },
  {
    institution: 'Teach2Give Academy',
    degree: 'Full Stack Web Development',
    period: '2023',
  },
];

function EducationCard({
  institution,
  degree,
  period,
  onEdit,
}: {
  institution: string;
  degree: string;
  period: string;
  onEdit: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{institution}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{degree}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{period}</p>
      </div>
      <button
        onClick={onEdit}
        className="text-sm px-2 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded-md"
      >
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function EducationPage() {
  const [education, setEducation] = useState(initialEducation);

  const handleAddEducation = () => {
    alert('Trigger education creation modal/form');
  };

  const handleEditEducation = (institution: string) => {
    alert(`Edit education entry from: ${institution}`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <GraduationCap className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Education</h2>
        </div>
        <button
          onClick={handleAddEducation}
          className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {education.map((edu) => (
          <EducationCard
            key={edu.institution}
            institution={edu.institution}
            degree={edu.degree}
            period={edu.period}
            onEdit={() => handleEditEducation(edu.institution)}
          />
        ))}
      </div>
    </div>
  );
}
