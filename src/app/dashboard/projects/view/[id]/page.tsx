'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // ✅ Import useParams
import { getProjectById } from '@/services/projectService/projectService';
import { Project } from '@/types/project';
import Image from 'next/image'; 

export default function ViewProjectPage() {
  const params = useParams(); // ✅ Correct hook to get dynamic route params
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [project, setProject] = useState<Project | null>(null);

  // Fetch project data by id when `id` is available
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const fetchedProject = await getProjectById(id);

        if (!fetchedProject) {
          console.error("No project found!");
          return;
        }

        setProject(fetchedProject);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      }
    };

    fetchProject();
  }, [id]);

  // Display loading text while waiting for project data
  if (!project) {
    return <p>Loading project...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">{project.Title}</h1>
      <div className="space-y-6">
        <div className="flex justify-center">
          <Image
            src={project.ImageUrl ?? "/placeholder.png"}
            alt={project.Title}
            width={200}
            height={200}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        </div>
        <p className="text-xl">{project.Description}</p>
        <p className="text-md font-semibold">Tech Stack:</p>
        <ul className="list-disc pl-6">
          {project.Tags?.map((tech) => (
            <li key={tech} className="text-md">{tech}</li>
          ))}
        </ul>
        <div className="flex justify-between mt-6">
          <a
            href={project.GitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
          >
            View on GitHub
          </a>
          <a
            href={project.LiveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary bg-green-600 hover:bg-green-700 text-white p-2 rounded-md"
          >
            Visit Live Project
          </a>
        </div>
      </div>
    </div>
  );
}
