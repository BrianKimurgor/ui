import api from '@/lib/api';
import { ProfileReadDto, CreateProfileDto, UpdateProfileDto } from '@/types/profile';

export const getProfile = async (): Promise<ProfileReadDto> => {
    const response = await api.get('/api/profile');
    const rawProfile = response.data;

    // Normalizing keys
    return {
        Id: rawProfile.Id,
        Name: rawProfile.Name,
        Role: rawProfile.Role,
        Company: rawProfile.Company,
        Bio: rawProfile.Bio,
        Image: rawProfile.Image
    };
}

export const createProfile = async (profile: CreateProfileDto): Promise<ProfileReadDto> => {
    const response = await api.post('/api/profile', profile);
    return response.data as ProfileReadDto;
};

export const updateProfile = async (profile: UpdateProfileDto): Promise<ProfileReadDto> => {
    const response = await api.put(`/api/profile/${profile.Id}`, profile);
    return response.data as ProfileReadDto;
};

export const deleteProfile = async (id: string): Promise<void> => {
    await api.delete(`/api/profile/${id}`);
};