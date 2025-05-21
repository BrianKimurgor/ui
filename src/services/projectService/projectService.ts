import api from "@/lib/api"
import { Project, CreateProjectDto } from "@/types/project";

// projectService.ts
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get('/api/projects');
  const rawProjects = response.data;

  // Normalize keys
  return rawProjects.map((p: Project) => ({
    id: p.Id,
    title: p.Title,
    description: p.Description,
    techStack: p.Tags ?? [],
    imageUrl: p.ImageUrl,
    githubUrl: p.GitHubUrl,
    LiveDemoUrl: p.LiveDemoUrl,
    createdAt: p.CreatedAt,
    updatedAt: p.UpdatedAt,
  }));
};

export const getProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await api.get(`/api/projects/${id}`);

    if (response.status === 200) {
      const p = response.data;

      // Normalize keys
      return {
        id: p.Id,
        title: p.Title,
        description: p.Description,
        tags: p.Tags ?? [],
        imageUrl: p.ImageUrl,
        githubUrl: p.GitHubUrl,
        LiveDemoUrl: p.LiveDemoUrl,
        createdAt: p.CreatedAt,
        updatedAt: p.UpdatedAt,
      };
    } else {
      throw new Error('Failed to fetch project data');
    }
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
};


export const createProject = async (project: CreateProjectDto) => {
  const response = await api.post("/api/projects", project);
  return response.data as Project;
};

export const updateProject = async (id: string, project: Project) => {
  const response = await api.put(`/api/projects/${id}`, project);
  return response.data as Project;
}

export const deleteProject = async (id: string) => {
  const response = await api.delete(`/api/projects/${id}`);
  return response.data as Project;
}