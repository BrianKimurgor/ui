import api from "@/lib/api"
import { Badge, CreateBadgeDto } from "@/types/badge"

// badgeService.ts
export const getBadges = async (): Promise<Badge[]> => {
  const response = await api.get('/api/badges');
  const rawBadges = response.data;

  // Normalize keys
  return rawBadges.map((b: any) => ({
    Id: b.Id,
    Name: b.Name,
    Description: b.Description,
    ImageUrl: b.ImageUrl,
    CreatedAt: b.CreatedAt,
  }));
};

export const getBadgeById = async (id: string): Promise<Badge> => {
  try {
    const response = await api.get(`/api/badges/${id}`);

    if (response.status === 200) {
      const b = response.data;

      // Normalize keys
      return {
        Id: b.Id,
        Name: b.Name,
        Description: b.Description,
        ImageUrl: b.ImageUrl,
        CreatedAt: b.CreatedAt,
      };
    } else {
      throw new Error('Failed to fetch badge data');
    }
  } catch (error) {
    console.error(`Error fetching badge with id ${id}:`, error);
    throw error;
  }
};

export const createBadge = async (badge: CreateBadgeDto) => {
  const response = await api.post("/api/badges", badge);
  return response.data as Badge;
};

export const updateBadge = async (id: string, badge: Badge) => {
  const response = await api.put(`/api/badges/${id}`, badge);
  return response.data as Badge;
}

export const deleteBadge = async (id: string) => {
  const response = await api.delete(`/api/badges/${id}`);
  return response.data;
};