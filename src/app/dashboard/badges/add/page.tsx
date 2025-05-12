"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBadge } from "@/services/badgeService/badgeService";

export default function AddBadgePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    ImageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBadge(formData);
      router.push("/dashboard/badges");
    } catch (error) {
      console.error("Failed to create badge:", error);
    }
  };


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Badge</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="Name"
          placeholder="Badge Name"
          value={formData.Name}
          onChange={handleChange}
          required
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <textarea
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleChange}
          required
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <input
          type="text"
          name="ImageUrl"
          placeholder="Image URL"
          value={formData.ImageUrl}
          onChange={handleChange}
          required
          className="input input-bordered w-full border-blue-100 border-2 rounded-md p-2"
        />
        <button
          type="submit"
          className="btn btn-primary bg-green-600 hover:bg-green-700 text-white p-2 rounded-md mb-6 w-full"
        >
          Add Badge
        </button>
      </form>
    </div>
  );
}
