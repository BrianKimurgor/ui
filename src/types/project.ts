export interface Project {
  Id: string;
  Title: string;
  Description: string;
  Tags?: string[];
  ImageUrl?: string;
  GitHubUrl?: string;
  LiveDemoUrl?: string;
  CreatedAt: string;
  UpdatedAt: string;
}


export interface CreateProjectDto {
  Title: string;
  Description: string;
  Tags?: string[];
  ImageUrl?: string;
  GitHubUrl?: string;
  LiveDemoUrl?: string;
}

export interface UpdateProjectDto {
  Id: string;
  Title: string;
  Description: string;
  Tags?: string[];
  ImageUrl?: string;
  GitHubUrl?: string;
  LiveDemoUrl?: string;
  UpdatedAt: string;
}
