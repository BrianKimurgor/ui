'use client';

import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '@/services/projectService/projectService'; // Include deleteProject service
import { Project } from '@/types/project';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, FolderKanban, Pencil } from 'lucide-react';

function ProjectCard({
  project,
  onEdit,
  onDelete,
  onView,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between min-h-[320px]">
      {project.ImageUrl && (
        <Image
          src={project.ImageUrl}
          alt={project.Title}
          width={200}
          height={200}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{project.Title || 'Untitled Project'}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{project.Description}</p>
        {project.Tags?.length ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.Tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 text-xs font-medium px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex gap-4 mt-4">
          {project.GitHubUrl && (
            <a
              href={project.GitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              GitHub
            </a>
          )}
          {project.LiveDemoUrl && (
            <a
              href={project.LiveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              Live Demo
            </a>
          )}
        </div>
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
        <button
          onClick={onView}
          className="text-sm px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        console.log(data);
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleView = (Id: string) => {
    // Redirect to the view page with the project Id
    router.push(`/dashboard/projects/view/${Id}`);
  };

  const handleDelete = async (Id: string) => {
    try {
      await deleteProject(Id); // Call delete service to delete project
      setProjects(projects.filter((project) => project.Id !== Id)); // Remove project from the list
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleEdit = (Id: string) => {
    // Redirect to the edit page with the project Id
    router.push(`/dashboard/projects/edit/${Id}`);
  };

  const handleAddProject = () => {
    // Redirect to the add project page
    router.push('/dashboard/projects/add');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FolderKanban className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Projects</h2>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.Id}
              project={project}
              onEdit={() => handleEdit(project.Id)}
              onDelete={() => handleDelete(project.Id)}
              onView={() => handleView(project.Id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
