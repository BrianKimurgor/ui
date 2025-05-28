import { LoginDto } from "@/types/login";
import { AuthResponse } from "@/types/authResponse";
import api from "@/lib/api";

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/api/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};