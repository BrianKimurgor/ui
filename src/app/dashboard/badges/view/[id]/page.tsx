"use client"; // Client-side rendering

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "@/types/badge"; // Import the Badge type
import BadgeDetails from "@/components/BadgeDetails";

export default function BadgeView() {
  const [badge, setBadge] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  if (!id) {
    router.push("/dashboard/badges"); // Redirect or handle the case where id is null
    return null;
  }

  useEffect(() => {
    if (id) {
      // Simulate fetching badge data (replace with actual data fetching)
      const fetchedBadge = {
        id: id,
        name: `Badge ${id}`,
        description: `Description for Badge ${id}`,
        imageUrl: `/badges/${id}.png`,
      };

      // Set the fetched badge data
      setBadge(fetchedBadge);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!badge) {
    return <p>Badge not found.</p>;
  }

  return (
    <section className="w-full mx-auto px-2 py-4">
      <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-700 to-green-400 mb-8">
        Badge Details
      </h2>

      <BadgeDetails 
        badge={badge} 
        onDelete={(id: string) => {
          console.log(`Badge with id ${id} deleted.`);
          // Add actual deletion logic here
          router.push("/dashboard/badges");
        }} 
      /> {/* Pass the badge to BadgeDetails */}
    </section>
  );
}