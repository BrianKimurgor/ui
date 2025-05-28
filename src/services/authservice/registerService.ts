import { RegisterDto } from "@/types/register";
import { AuthResponse } from "@/types/authResponse";
import api from "@/lib/api";

export const register = async (data: RegisterDto): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/api/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};