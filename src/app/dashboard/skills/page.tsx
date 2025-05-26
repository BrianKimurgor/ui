'use client';

import { useState } from 'react';
import { Wrench, Plus, Pencil } from 'lucide-react';

const initialSkills = [
  { name: 'JavaScript', level: 'Advanced' },
  { name: 'React', level: 'Advanced' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'TypeScript', level: 'Intermediate' },
  { name: 'Tailwind CSS', level: 'Advanced' },
  { name: 'Express.js', level: 'Intermediate' },
  { name: 'SQL', level: 'Intermediate' },
  { name: 'GraphQL', level: 'Beginner' },
];

function SkillCard({ name, level, onEdit }: { name: string; level: string; onEdit: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{level}</p>
      </div>
      <button
        onClick={onEdit}
        className="text-sm px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
      >
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function SkillsPage() {
  const [skills] = useState(initialSkills);

  const handleAddSkill = () => {
    alert('Trigger skill creation modal/form');
  };

  const handleEditSkill = (skillName: string) => {
    alert(`Edit skill: ${skillName}`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Wrench className="w-6 h-6 text-green-600 dark:text-teal-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Skills</h2>
        </div>
        <button
          onClick={handleAddSkill}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            level={skill.level}
            onEdit={() => handleEditSkill(skill.name)}
          />
        ))}
      </div>
    </div>
  );
}
