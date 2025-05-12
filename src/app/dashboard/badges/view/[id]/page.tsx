"use client"; // Client-side rendering

import {  useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBadgeById } from "@/services/badgeService/badgeService";
import { Badge } from "@/types/badge";

export default function BadgeView() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [badge, setBadge] = useState<Badge | null>(null);

  useEffect(() => {
    const fetchBadge = async () => {
      if (!id) return;

      try {
        const fetchedBadge = await getBadgeById(id);

        if (!fetchedBadge) {
          console.error("No badge found!");
          return;
        }

        setBadge(fetchedBadge);
      } catch (err) {
        console.error("Failed to fetch badge:", err);
      }
    };

    fetchBadge();
  }, [id]);

  // Display loading text while waiting for badge data
  if (!badge) {
    return <p>Loading badge...</p>;
  }

  return (
   
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-600">
        Badge Details
      </h1>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">{badge.Name}</h1>
        <div className="flex justify-center mb-6">
          <img
            src={badge.ImageUrl}
            alt={badge.Name}
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>
        <p className="text-xl">{badge.Description}</p>
        <p className="text-md font-semibold">Created At:</p>
        <p className="text-md">{new Date(badge.CreatedAt).toLocaleDateString()}</p>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => window.history.back()}
          className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md"
        >
          Back
        </button>
        </div>
    </div>
  );
}