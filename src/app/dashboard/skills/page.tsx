'use client';

import { useEffect, useState } from 'react';
import { Wrench, Plus } from 'lucide-react';
import { Project } from '@/types/project';
import { getProjects } from '@/services/projectService/projectService'; 

function SkillCard({
   name, onEdit }: {
    readonly name: string;
    readonly onEdit: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-gray-100">{name}</h3>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);

        // Extract and flatten tags
        const allTags = data.flatMap((project) => project.Tags || []);
        // Remove duplicates
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

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

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tags.map((tag) => (
          <SkillCard
            key={tag}
            name={tag}
            onEdit={() => handleEditSkill(tag)}
          />
        ))}
      </div>
    </div>
  );
}
