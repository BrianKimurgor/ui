"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBadgeById, updateBadge } from "@/services/badgeService/badgeService";
import { Badge } from "@/types/badge";



export default function BadgeEdit() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [badge, setBadge] = useState<Badge | null>(null);
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    ImageUrl: "",
  });

  // Fetch badge data by id when `id` is available
  useEffect(() => {
    const fetchBadge = async () => {
      if (!id) return;

      try {
        const fetchedBadge = await getBadgeById(id);

        if (!fetchedBadge) {
          console.error("No badge found!");
          return;
        }

        setFormData({
          Name: fetchedBadge.Name ?? "",
          Description: fetchedBadge.Description ?? "",
          ImageUrl: fetchedBadge.ImageUrl ?? "",
        });

        setBadge(fetchedBadge);
      } catch (err) {
        console.error("Failed to fetch badge:", err);
      }
    };

    fetchBadge();
  }, [id]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!badge) return;

    const updatedBadge: Badge = {
      Id: badge.Id,
      Name: formData.Name,
      Description: formData.Description,
      ImageUrl: formData.ImageUrl,
      CreatedAt: badge.CreatedAt, // Include the CreatedAt property
    };

    try {
      await updateBadge(badge.Id.toString(), updatedBadge);
      router.push("/dashboard/badges");
    } catch (err) {
      console.error("Failed to update badge:", err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-600">
        Edit Badge
      </h1>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Badge</h1>
        <form>
          {/* Form fields for editing badge */}
          <input
            type="text"
            name="Name"
            placeholder="Badge Name"
            value={formData.Name}
            onChange={handleChange}
            required
            className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2 mb-4"
          />
          <textarea
            name="Description"
            placeholder="Description"
            value={formData.Description}
            onChange={handleChange}
            required
            className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2 mb-4"
          />
          <input
            type="text"
            name="ImageUrl"
            placeholder="Image URL"
            value={formData.ImageUrl}
            onChange={handleChange}
            required
            className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2 mb-4"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary bg-green-600 hover:bg-green-700 text-white p-2 rounded-md mb-6 w-full"
          >
            Update Badge
          </button>
        </form>
      </div>
    </div>
  );
}