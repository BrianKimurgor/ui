'use client';

import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '@/services/projectService/projectService'; // Include deleteProject service
import { Project } from '@/types/project';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects(); // using service instead of raw fetch
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleView = (id: string) => {
    // Redirect to the view page with the project ID
    router.push(`/dashboard/projects/view/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id); // Call delete service to delete project
      setProjects(projects.filter((project) => project.id !== id)); // Remove project from the list
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleEdit = (id: string) => {
    // Redirect to the edit page with the project ID
    router.push(`/dashboard/projects/edit/${id}`);
  };

  const handleAddProject = () => {
    // Redirect to the add project page
    router.push('/dashboard/projects/add');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className='mb-6 flex flex-row items-center justify-between'>
        <h1 className="text-4xl font-bold text-center mb-10 text-indigo-600">My Projects</h1>
        <button
          onClick={handleAddProject}
          className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md mb-6"
        >
          Add New Project
        </button>
      </div>


      {loading ? (
        <p className="text-center text-gray-600">Loading projects...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl shadow-lg bg-white p-5 hover:shadow-indigo-300 transition-all duration-300 border border-indigo-100"
            >
              {project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}

              <h2 className="text-xl font-semibold text-indigo-700">{project.title || 'Untitled Project'}</h2>

              <p className="text-gray-600 mt-2">{project.description}</p>

              {project.tags?.length ? (
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ): null}


              <div className="flex gap-4 mt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {project.LiveDemoUrl && (
                  <a
                    href={project.LiveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(project.id)}
                  className="btn btn-sm btn-indigo bg-amber-600 hover:bg-amber-700 text-white  p-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="btn btn-sm btn-red bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleView(project.id)}
                  className="btn btn-sm btn-red bg-green-600 hover:bg-green-700 text-white p-2 rounded-md"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
