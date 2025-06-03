import api from "@/lib/api";
import { WorkDto, CreateWorkDto, UpdateWorkDto, DeleteWorkDto } from "@/types/work";

export const getWorks = async (): Promise<WorkDto[]> => {
    const response = await api.get('/api/work');
    return response.data;
}

//normalize keys
export const normalizeWorkDto = (work: WorkDto): WorkDto => {
    return {
        Id: work.Id,
        CompanyName: work.CompanyName,
        JobTitle: work.JobTitle,
        LogoUrl: work.LogoUrl,
        Description: work.Description,
        Responsibilities: work.Responsibilities || [],
        Tags: work.Tags || [],
        Location: work.Location || "",
        StartDate: work.StartDate,
        EndDate: work.EndDate,
    }
}

export const getWorkById = async (id: string): Promise<WorkDto> => {
    const response = await api.get(`/api/work/${id}`);
    return normalizeWorkDto(response.data);
}

export const createWork = async (work: CreateWorkDto): Promise<WorkDto> => {
    const response = await api.post('/api/work', work);
    return normalizeWorkDto(response.data);
}

export const updateWork = async (id: string, work: UpdateWorkDto): Promise<WorkDto> => {
    const response = await api.put(`/api/work/${id}`, work);
    return normalizeWorkDto(response.data);
}

export const deleteWork = async (id: string): Promise<DeleteWorkDto> => {
    const response = await api.delete(`/api/work/${id}`);
    return response.data;
}

