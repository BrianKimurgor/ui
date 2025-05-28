'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/services/projectService/projectService';

export default function AddProjectPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    TechStack: '',
    ImageUrl: '',
    GitHubUrl: '',
    LiveDemoUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject({
        Title: formData.Title,
        Description: formData.Description,
        Tags: formData.TechStack.split(',').map(s => s.trim()),
        ImageUrl: formData.ImageUrl,
        GitHubUrl: formData.GitHubUrl,
        LiveDemoUrl: formData.LiveDemoUrl,
      });
      router.push('/dashboard/projects');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Project Name"
          value={formData.Title}
          onChange={handleChange}
          required
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleChange}
          required
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma separated)"
          value={formData.TechStack}
          onChange={handleChange}
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <input
          type="text"
          name="imageUrl"
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
          name="liveUrl"
          placeholder="Live URL"
          value={formData.LiveDemoUrl}
          onChange={handleChange}
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => router.push('/dashboard/projects')} className="btn btn-outline bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-md">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary bg-green-500 hover:bg-green-600 text-white p-2 rounded-md">
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
}
