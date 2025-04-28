"use client";
import { useRouter } from "next/navigation";
import BadgeForm from "@/components/BadgeForm";
import { Badge } from "@/types/badge";

export default function Page() {
  const router = useRouter();

  // Function to handle saving a new badge
  const handleSave = (newBadge: Badge) => {
    // Here you would typically make an API call to save the badge to your database
    console.log("New Badge Added: ", newBadge);
    // Redirect back to the badges list page after saving
    router.push("/dashboard/badges");
  };

  // Function to handle badge deletion (although this will not be used on Add page)
  const handleDelete = (id: string) => {
    // Deleting a badge is not necessary on the Add page, but function is required for form
    console.log(`Delete Badge with ID: ${id}`);
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-center mb-8">Add a New Badge</h1>
      <BadgeForm
        onSave={handleSave}
        onDelete={handleDelete}  // Even though delete isn't needed here, it's required for the form
        badge={undefined}  // No badge is passed, indicating this is for a new badge
        initialData={{
          id: "",
          name: "",
          description: "",
          imageUrl: "",
        }}  // Initial data for a new badge
        onSubmit={handleSave}  // Handle form submission
      />
    </section>
  );
}
