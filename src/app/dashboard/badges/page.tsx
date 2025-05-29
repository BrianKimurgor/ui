"use client";
import { useEffect, useState } from 'react';
import { getBadges, deleteBadge } from '@/services/badgeService/badgeService';
import { Badge } from '@/types/badge';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Award, Pencil } from 'lucide-react';

function BadgeCard({
  badge,
  onEdit,
  onDelete,
  onView,
}: {
  badge: Badge;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center justify-between min-h-[320px]">
      <Image
        src={badge.ImageUrl}
        alt={badge.Name}
        width={120}
        height={120}
        className="mb-4 rounded-full object-cover border-4 border-teal-200 dark:border-teal-700"
      />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center">{badge.Name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">{badge.Description}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={onEdit}
          className="text-sm px-2 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded-md flex items-center gap-1"
        >
          <Pencil className="w-4 h-4" /> Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Delete
        </button>
        <button
          onClick={onView}
          className="text-sm px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default function BadgesPage() {
  const router = useRouter();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBadges() {
      try {
        const data = await getBadges();
        setBadges(data);
      } catch (err) {
        console.error('Failed to fetch badges', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBadges();
  }, []);

  const handleView = (id: string) => {
    router.push(`/dashboard/badges/view/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBadge(id);
      setBadges(badges.filter((badge) => badge.Id !== Number(id)));
    } catch (error) {
      console.error('Failed to delete badge:', error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/badges/edit/${id}`);
  };

  const handleAddBadge = () => {
    router.push('/dashboard/badges/add');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Award className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Badges</h2>
        </div>
        <button
          onClick={handleAddBadge}
          className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          Add Badge
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading badges...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <BadgeCard
              key={badge.Id}
              badge={badge}
              onEdit={() => handleEdit(badge.Id.toString())}
              onDelete={() => handleDelete(badge.Id.toString())}
              onView={() => handleView(badge.Id.toString())}
            />
          ))}
        </div>
      )}
    </div>
  );
}
