export interface WorkDto {
    Id: string;
    CompanyName: string;
    JobTitle: string;
    LogoUrl: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
}

export interface CreateWorkDto {
    CompanyName: string;
    JobTitle: string;
    LogoUrl: string;
    Description: string;
}

export interface UpdateWorkDto {
    Id: string;
    CompanyName: string;
    JobTitle: string;
    LogoUrl: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
}

export interface DeleteWorkDto {
    Id: string;
}

