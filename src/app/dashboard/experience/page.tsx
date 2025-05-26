'use client';

import { useState } from 'react';
import { Briefcase, Plus, Pencil } from 'lucide-react';

const initialExperience = [
  {
    company: 'Happy Heart Agrochemicals',
    role: 'Software Engineer',
    period: '2021 - 2023',
  },
  {
    company: 'ALX Africa',
    role: 'Software Engineering Intern',
    period: '2022 - 2023',
  },
  {
    company: 'Teach2Give',
    role: 'Backend Developer',
    period: '2023',
  },
];

function ExperienceCard({
  company,
  role,
  period,
  onEdit,
}: {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  onEdit: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{company}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
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

export default function ExperiencePage() {
  const [experience, setExperience] = useState(initialExperience);

  const handleAddExperience = () => {
    alert('Trigger experience creation modal/form');
  };

  const handleEditExperience = (company: string) => {
    alert(`Edit experience at: ${company}`);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {experience.map((exp) => (
          <ExperienceCard
            key={exp.company}
            company={exp.company}
            role={exp.role}
            period={exp.period}
            onEdit={() => handleEditExperience(exp.company)}
          />
        ))}
      </div>
    </div>
  );
}
