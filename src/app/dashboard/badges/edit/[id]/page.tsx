"use client"; // Client-side rendering

import { useState, useEffect } from "react";
import { useRouter, useParams  } from "next/navigation";
import { Badge } from "@/types/badge"; // Import Badge type
import BadgeForm from "@/components/BadgeForm"; // Import BadgeForm component
// import { useToast } from "@/components/Toast"; // Optional: For showing toast messages

export default function BadgeEdit() {
  const [badge, setBadge] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams(); // Use useParams to get route parameters
  const id = params?.id as string | undefined; // badge ID from the URL
  if (!id) {
    return <p>Invalid badge ID.</p>;
  }

//   const toast = useToast(); // Optional: For showing toast messages after update

  useEffect(() => {
    if (id) {
      // Simulate fetching badge data (replace with actual data fetching logic)
      const fetchBadge = async () => {
        // Here you would fetch the data from an API or database
        // For the sake of this example, I'm using static data
        const fetchedBadge = {
          id: id,
          name: `Badge ${id}`,
          description: `Description for Badge ${id}`,
          imageUrl: `/badges/${id}.png`,
        };
        
        setBadge(fetchedBadge);
        setLoading(false);
      };

      fetchBadge();
    }
  }, [id]);

  const handleUpdateBadge = async (updatedBadge: Badge) => {
    // Here, you'd send a request to update the badge data in your backend.
    // Simulating a success response after updating the badge.

    // toast.success("Badge updated successfully!");
    console.log("Updated Badge:", updatedBadge);
    
    // Navigate back to the badges list after updating
    router.push("/dashboard/badges");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!badge) {
    return <p>Badge not found.</p>;
  }

  return (
    <section className="w-full mx-auto px-2 py-4">
      <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-700 to-green-400 mb-8">
        Edit Badge
      </h2>

      {/* Pass the existing badge data to the BadgeForm */}
      <BadgeForm
        initialData={badge} // Pass the existing badge data as initial values
        onSubmit={handleUpdateBadge} // Handle the update logic
        onSave={handleUpdateBadge} // Handle the save logic (could be the same as update)
        onDelete={(id: string) => {
          console.log(`Badge with id ${id} deleted.`);
          // Add actual deletion logic here
          router.push("/dashboard/badges");
        }} // Handle badge deletion (if needed)
      />
    </section>
  );
}