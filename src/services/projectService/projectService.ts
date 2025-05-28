import api from "@/lib/api"
import { Project, CreateProjectDto } from "@/types/project";

// projectService.ts
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get('/api/projects');
  const rawProjects = response.data;

  // Normalize keys
  return rawProjects.map((p: Project) => ({
    Id: p.Id,
    Title: p.Title,
    Description: p.Description,
    Tags: p.Tags ?? [],
    ImageUrl: p.ImageUrl,
    GitHubUrl: p.GitHubUrl,
    LiveDemoUrl: p.LiveDemoUrl,
    CreatedAt: p.CreatedAt,
    UpdatedAt: p.UpdatedAt,
  }));
};

export const getProjectById = async (Id: string): Promise<Project> => {
  try {
    const response = await api.get(`/api/projects/${Id}`);

    if (response.status === 200) {
      const p = response.data;

      // Normalize keys
      return {
        Id: p.Id,
        Title: p.Title,
        Description: p.Description,
        Tags: p.Tags ?? [],
        ImageUrl: p.ImageUrl,
        GitHubUrl: p.GitHubUrl,
        LiveDemoUrl: p.LiveDemoUrl,
        CreatedAt: p.CreatedAt,
        UpdatedAt: p.UpdatedAt,
      };
    } else {
      throw new Error('Failed to fetch project data');
    }
  } catch (error) {
    console.error(`Error fetching project with id ${Id}:`, error);
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