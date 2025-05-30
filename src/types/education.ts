export interface Education {
    Id : string;
    SchoolName : string;
    Degree : string;
    FieldOfStudy : string;
    StartDate: string;
    EndDate: string;
}

export interface CreateEducationDto {
    SchoolName : string;
    Degree : string;
    FieldOfStudy : string;
    StartDate: string;
    EndDate: string;
}

export interface UpdateEducationDto {
    Id : string;
    SchoolName : string;
    Degree : string;
    FieldOfStudy : string;
    StartDate: string;
    EndDate: string;
}

