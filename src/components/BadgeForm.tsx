"use client";
import { useState } from "react";
import { Badge } from "@/types/badge";
import { useRouter } from "next/navigation";

interface BadgeFormProps {
  badge?: Badge; // Optional prop for editing a badge
  initialData: Badge;
  onSubmit: (badge: Badge) => void; // Function to handle form submission
  onSave: (badge: Badge) => void;
  onDelete: (id: string) => void; // Function to handle badge deletion
}

const BadgeForm = ({ badge, onSave }: BadgeFormProps) => {

  const [name, setName] = useState<string>(badge ? badge.Name : "");
  const [description, setDescription] = useState<string>(badge ? badge.Description : "");
  const [imageUrl, setImageUrl] = useState<string>(badge ? badge.ImageUrl : "");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBadge: Badge = {
      Id: badge ? badge.Id : Date.now().toString(), // Generate a new id for new badges
      name,
      description,
      imageUrl,
    };

    onSave(newBadge); // Trigger the save action (passed via props)
    router.push("/dashboard/badges"); // Navigate back to the badges page
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">{badge ? "Edit Badge" : "Add New Badge"}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-2">Badge Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="text-sm font-medium mb-2">Badge Image URL</label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex justify-between">
          <button type="button" className="btn btn-secondary" onClick={() => router.push("/dashboard/badges")}>Cancel</button>
          <button type="submit" className="btn btn-primary">{badge ? "Update Badge" : "Add Badge"}</button>
        </div>
      </form>
    </section>
  );
};

export default BadgeForm;
