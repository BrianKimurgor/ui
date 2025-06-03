export interface Social {
    Id: string;
    Platform: string;
    Url: string;
    Icon: string;
}

export interface CreateSocialDto {
    Platform: string;
    Url: string;
    Icon: string;
}

export interface UpdateSocialDto {
    Id: string;
    Platform: string;
    Url: string;
    Icon: string;
}