"use client";
import { useEffect, useState } from 'react';
import { getBadges, deleteBadge } from '@/services/badgeService/badgeService';
import { Badge } from '@/types/badge';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function BadgesPage() {

  const router = useRouter();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBadges() {
      try {
        const data = await getBadges(); // using service instead of raw fetch
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
    // Redirect to the view page with the badge ID
    router.push(`/dashboard/badges/view/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBadge(id); // Call delete service to delete badge
      setBadges(badges.filter((badge) => badge.Id !== Number(id))); // Remove badge from the list
    } catch (error) {
      console.error('Failed to delete badge:', error);
    }
  };

  const handleEdit = (id: string) => {
    // Redirect to the edit page with the badge ID
    router.push(`/dashboard/badges/edit/${id}`);
  };

  const handleAddBadge = () => {
    // Redirect to the add badge page
    router.push('/dashboard/badges/add');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className='mb-6 flex flex-row items-center justify-between'>
        <h1 className="text-4xl font-bold text-center mb-10 text-indigo-600">My Badges</h1>
        <button
          onClick={handleAddBadge}
          className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md mb-6"
        >
          Add New Badge
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading badges...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.Id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <Image
                src={badge.ImageUrl}
                alt={badge.Name}
                width={200}
                height={200}
                className="mb-4 rounded-full object-cover"
              />

              <h2
                className="text-xl font-semibold mb-2"
              >
                {badge.Name}
              </h2>
              <p className="text-gray-600 mb-4">
                {badge.Description}
              </p>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(badge.Id.toString())} className="btn btn-secondary bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md">Edit</button>
                <button onClick={() => handleDelete(badge.Id.toString())} className="btn btn-danger bg-red-500 hover:bg-red-600 text-white p-2 rounded-md">Delete</button>
                <button onClick={() => handleView(badge.Id.toString())} className="btn btn-primary bg-green-500 hover:bg-green-600 text-white p-2 rounded-md">View</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
