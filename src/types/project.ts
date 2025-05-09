export interface Project {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  githubUrl?: string;
  LiveDemoUrl?: string;
  createdAt: string;
  updatedAt: string;
}


export interface CreateProjectDto {
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  githubUrl?: string;
  LiveDemoUrl?: string;
}

export interface UpdateProjectDto {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
  githubUrl?: string;
  LiveDemoUrl?: string;
  updatedAt: string;
}
