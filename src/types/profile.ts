export interface ProfileReadDto {
    Id: string;
    Name: string;
    Role: string;
    Company: string;
    Bio: string;
    Image: string;
}
export interface CreateProfileDto {
    Name: string;
    Role: string;
    Company: string;
    Bio: string;
    Image: string;
}
export interface UpdateProfileDto {
    Id: string;
    Name: string;
    Role: string;
    Company: string;
    Bio: string;
    Image: string;
}