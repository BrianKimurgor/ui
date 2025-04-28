"use client";

import { useState } from "react";
import { Badge } from "@/types/badge";
import Link from "next/link";

export default function BadgesSection() {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "1",
      name: "Next.js Master",
      description: "Completed all Next.js modules",
      imageUrl: "/badges/nextjs.png",
    },
    {
      id: "2",
      name: "TypeScript Pro",
      description: "Built 10+ projects with TypeScript",
      imageUrl: "/badges/typescript.png",
    },
    {
      id: "3",
      name: "React Expert",
      description: "Mastered React concepts",
      imageUrl: "/badges/react.png",
    },
    {
      id: "4",
      name: "React Expert",
      description: "Mastered React concepts",
      imageUrl: "/badges/react.png",
    },
    {
      id: "5",
      name: "React Expert",
      description: "Mastered React concepts",
      imageUrl: "/badges/react.png",
    },
    {
      id: "6",
      name: "React Expert",
      description: "Mastered React concepts",
      imageUrl: "/badges/react.png",
    },
  ]);

  const handleDelete = (id: string) => {
    setBadges((prev) => prev.filter((badge) => badge.id !== id));
  };

  return (
    <section className="w-full mx-auto px-2 py-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-700 to-green-400">
          My Badges
        </h2>
        <Link
          href="/dashboard/badges/add"
          className="btn btn-primary rounded-full px-8 py-3 bg-gradient-to-r from-green-300 to-green-600 text-white hover:scale-105 transition-transform duration-200"
        >
          Add New Badge
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="rounded-2xl bg-white shadow-xl border border-gray-300 p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={badge.imageUrl}
              alt={badge.name}
              className="w-32 h-32 object-contain mb-4 border-2 border-gradient-to-br from-blue-400 to-pink-500 rounded-full"
            />
            <h3 className="text-2xl font-bold text-gray-800">{badge.name}</h3>
            <p className="text-gray-500 text-sm mt-2">{badge.description}</p>

            <div className="flex gap-4 mt-6">
              <Link
                href={`/dashboard/badges/view/${badge.id}`}
                className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold transition-transform duration-200 hover:bg-blue-600 hover:scale-105"
              >
                👁️ View
              </Link>
              <Link
                href={`/dashboard/badges/edit/${badge.id}`}
                className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold transition-transform duration-200 hover:bg-blue-600 hover:scale-105"
              >
                ✏️ Edit
              </Link>
              <button
                className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold transition-transform duration-200 hover:bg-red-600 hover:scale-105"
                onClick={() => handleDelete(badge.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
