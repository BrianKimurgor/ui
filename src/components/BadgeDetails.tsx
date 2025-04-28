"use client";
import { useRouter } from "next/navigation";
import { Badge } from "@/types/badge";

interface BadgeDetailsProps {
  badge: Badge;
  onDelete: (id: string) => void;
}

const BadgeDetails = ({ badge, onDelete }: BadgeDetailsProps) => {
  const router = useRouter();

  const handleDelete = () => {
    onDelete(badge.id);
    router.push("/dashboard/badges"); // Navigate back after deleting
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">{badge.name}</h2>
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/dashboard/badges/edit/${badge.id}`)}
            className="btn btn-primary"
          >
            Edit Badge
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-destructive"
          >
            Delete Badge
          </button>
        </div>
      </div>

      <img src={badge.imageUrl} alt={badge.name} className="w-32 h-32 object-contain mb-6" />
      <p className="text-sm text-muted-foreground">{badge.description}</p>
    </section>
  );
};

export default BadgeDetails;
