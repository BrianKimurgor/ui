export interface Badge {
    Id: number;          // Unique identifier (could be UUID)
    Name: string;         // Badge title (example: "Top Contributor")
    Description: string;  // Short description (example: "Awarded for top 5% answers")
    ImageUrl: string;     // Path or URL to badge image (example: "/badges/top-contributor.png")
    CreatedAt: string; // or Date, depending on how you handle date parsing

  }
  

//create badge dto
export interface CreateBadgeDto {
    Name: string;         // Badge title (example: "Top Contributor")
    Description: string;  // Short description (example: "Awarded for top 5% answers")
    ImageUrl: string;     // Path or URL to badge image (example: "/badges/top-contributor.png")
  }

//update badge dto
export interface UpdateBadgeDto {
    Id: number;          // Unique identifier (could be UUID)
    Name?: string;         // Badge title (example: "Top Contributor")
    Description?: string;  // Short description (example: "Awarded for top 5% answers")
    ImageUrl?: string;     // Path or URL to badge image (example: "/badges/top-contributor.png")
  }