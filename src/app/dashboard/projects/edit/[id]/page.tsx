'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; // ✅ Import useParams
import { getProjectById, updateProject } from '@/services/projectService/projectService';
import { Project, UpdateProjectDto } from '@/types/project';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams(); // ✅ Correct hook to get dynamic route params
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  



  
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Tags: '',
    ImageUrl: '',
    GitHubUrl: '',
    LiveDemoUrl: '',
  });

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
  
        setFormData({
            Title: fetchedProject.Title ?? '',
            Description: fetchedProject.Description ?? '',
            Tags: (fetchedProject.Tags ?? []).join(', '),
            ImageUrl: fetchedProject.ImageUrl ?? '',
            GitHubUrl: fetchedProject.GitHubUrl ?? '',
            LiveDemoUrl: fetchedProject.LiveDemoUrl ?? '',
          });
          
          setProject({
            Id: fetchedProject.Id,
            Title: fetchedProject.Title,
            Description: fetchedProject.Description,
            Tags: fetchedProject.Tags,
            ImageUrl: fetchedProject.ImageUrl,
            GitHubUrl: fetchedProject.GitHubUrl,
            LiveDemoUrl: fetchedProject.LiveDemoUrl,
            CreatedAt: fetchedProject.CreatedAt,
            UpdatedAt: fetchedProject.UpdatedAt,
          });
          
      } catch (err) {
        console.error("Failed to fetch project:", err);
      }
    };
  
    fetchProject();
  }, [id]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!project) return; // Prevent submitting if no project data is available
  
    // Prepare the DTO object
    const updatedProject: UpdateProjectDto = {
      Id: project.Id,
      Title: formData.Title || project.Title,  // Use existing value if no update
      Description: formData.Description || project.Description,
      Tags: formData.Tags ? formData.Tags.split(',').map(s => s.trim()) : project.Tags,
      ImageUrl: formData.ImageUrl || project.ImageUrl,
      GitHubUrl: formData.GitHubUrl || project.GitHubUrl,
      LiveDemoUrl: formData.LiveDemoUrl || project.LiveDemoUrl,
      UpdatedAt: new Date().toISOString(),  // Set the current time as updatedAt
    };
  
    try {
      await updateProject(project.Id, { 
        ...updatedProject, 
        Title: updatedProject.Title ?? '', 
        Description: updatedProject.Description ?? '', 
        Tags: updatedProject.Tags ?? [], 
        ImageUrl: updatedProject.ImageUrl ?? '', 
        GitHubUrl: updatedProject.GitHubUrl ?? '', 
        LiveDemoUrl: updatedProject.LiveDemoUrl ?? '', 
        CreatedAt: project.CreatedAt 
      });  // Ensure all fields have default values
      router.push('/dashboard/projects');
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };
  

  // Display loading text while waiting for project data
  if (!project) {
    return <p>Loading project...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          type="text"
          name="Title"
          placeholder="Project Name"
          value={formData.Title}
          onChange={handleChange}
          required
          className="input input-bordered border-blue-100 w-full border-2 rounded-md p-2"
        />
        <textarea
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleChange}
          required
          className="textarea textarea-bordered border-blue-100 w-full border-2 rounded-md p-2"
        />
        <input
          type="text"
          name="Tags"
          placeholder="Tech Stack (comma separated)"
          value={formData.Tags}
          onChange={handleChange}
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <input
          type="text"
          name="ImageUrl"
          placeholder="Image URL"
          value={formData.ImageUrl}
          onChange={handleChange}
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <input
          type="text"
          name="GitHubUrl"
          placeholder="GitHub URL"
          value={formData.GitHubUrl}
          onChange={handleChange}
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <input
          type="text"
          name="LiveDemoUrl"
          placeholder="Live demo URL"
          value={formData.LiveDemoUrl}
          onChange={handleChange}
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => router.push('/dashboard/projects')} className="btn btn-outline bg-amber-600 hover:bg-amber-700 text-white  p-2 rounded-md">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary bg-green-600 hover:bg-green-700 text-white  p-2 rounded-md">
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
}
