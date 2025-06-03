'use client';

import { useState } from 'react';
import { createSocial } from '@/services/socialService/socialService'; // Adjust path if different
import { useRouter } from 'next/navigation';

export default function AddSocialPage() {
  const [platform, setPlatform] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await createSocial({ Platform: platform, Url: url, Icon: icon });
      setMessage('Social profile added successfully!');
      setPlatform('');
      setUrl('');
      setIcon('');
      // Optionally redirect:
      router.push('dashboard/social');
    } catch (error: any) {
      setMessage('Failed to add social profile.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add Social Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Platform
          </label>
          <input
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Icon (e.g., github, linkedin)
          </label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Social'}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-gray-800 dark:text-gray-200">{message}</p>
      )}
    </div>
  );
}
