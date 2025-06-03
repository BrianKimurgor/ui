export interface WorkDto {
  Id: string;
  CompanyName: string;
  JobTitle: string;
  LogoUrl: string;
  Description: string;
  StartDate: Date | null;  // updated
  EndDate: Date | null;    // updated
  Responsibilities: string[];
  Tags: string[];
  Location: string;
}


export interface CreateWorkDto {
  CompanyName: string;
  JobTitle: string;
  LogoUrl: string;
  Description: string;
  StartDate: Date | null;
  EndDate: Date | null;
  Responsibilities: string[];
  Tags: string[];
  Location: string;
}

export interface UpdateWorkDto {
  Id: string;
  CompanyName: string;
  JobTitle: string;
  LogoUrl: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  Responsibilities: string[];
  Tags: string[];
  Location: string;
}

export interface DeleteWorkDto {
  Id: string;
}
