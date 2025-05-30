import api from '@/lib/api'
import { Education, CreateEducationDto, UpdateEducationDto } from '@/types/education'

export const getEducations = async (): Promise<Education[]> => {
    const response = await api.get('/api/educations');
    const rawEducation = response.data;

    //normalizing keys
    return rawEducation.map((e: Education) => ({
        Id: e.Id,
        SchoolName: e.SchoolName,
        Degree: e.Degree,
        FieldOfStudy: e.FieldOfStudy,
        StartDate: e.StartDate,
        EndDate: e.EndDate
    }));
};

export const getEducationById = async (id: string): Promise<Education> => {
    try {
        const response = await api.get(`/api/educations/${id}`);
        const e = response.data;

        // normalize
        return {
            Id: e.Id,
            SchoolName: e.SchoolName,
            Degree: e.Degree,
            FieldOfStudy: e.FieldOfStudy,
            StartDate: e.StartDate,
            EndDate: e.EndDate
        };
    } catch (error) {
        console.error(`Error fetching education with id ${id}:`, error);
        throw error;
    }
};

export const createEducation = async (education: CreateEducationDto) => {
    const response = await api.post('/api/educations', education)
    return response.data as Education;
};

export const updateEducation = async (id: string, education: UpdateEducationDto) => {
    const response = await api.put(`/api/educations/${id}`, education);
    return response.data as Education;
}

export const deleteEducation = async (id: string) => {
    const response = await api.delete(`/api/educations/${id}`);
    return response.data;
}



