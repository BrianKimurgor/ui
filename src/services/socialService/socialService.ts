import api from "@/lib/api";
import { Social, CreateSocialDto, UpdateSocialDto, } from "@/types/socials";

export const getSocials = async (): Promise<Social[]> => {
    const response = await api.get('/api/socials');
    return response.data;
}

//normalize keys
export const normalizeSocial = (social: Social): Social => {
    return {
        Id: social.Id,
        Platform: social.Platform,
        Url: social.Url,
        Icon: social.Icon,
    };
}

export const getSocialById = async (Id: string): Promise<Social> => {
    const response = await api.get(`/api/socials/${Id}`);
    return normalizeSocial(response.data);
}

export const createSocial = async (social: CreateSocialDto): Promise<Social> => {
    const response = await api.post('/api/socials', social);
    return normalizeSocial(response.data);
}

export const updateSocial = async (Id: string, social: UpdateSocialDto): Promise<Social> => {
    const response = await api.put(`/api/socials/${Id}`, social);
    return normalizeSocial(response.data);
}

export const deleteSocial = async (Id: string): Promise<void> => {
    await api.delete(`/api/socials/${Id}`);
};
