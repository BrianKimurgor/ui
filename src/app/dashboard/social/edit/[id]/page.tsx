'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getSocialById, updateSocial } from '@/services/socialService/socialService';
import {UpdateSocialDto } from '@/types/socials';

export default function EditSocialPage() {
  const params = useParams();
  const Id = (params as Record<string, string>).id;

  
  const router = useRouter();

  const [form, setForm] = useState<UpdateSocialDto>({
    Id: '',
    Platform: '',
    Url: '',
    Icon: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const data = await getSocialById(Id);
        setForm({
          Id: data.Id,
          Platform: data.Platform,
          Url: data.Url,
          Icon: data.Icon,
        });
      } catch (error) {
        console.error('Failed to fetch social:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocial();
  }, [Id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSocial(Id, form);
      router.push('/dashboard/social');
    } catch (error) {
      console.error('Failed to update:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-4 text-gray-600 dark:text-gray-300">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Edit Social</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="Platform"
          value={form.Platform}
          onChange={handleChange}
          placeholder="Platform"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
          required
        />
        <input
          type="url"
          name="Url"
          value={form.Url}
          onChange={handleChange}
          placeholder="URL"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
          required
        />
        <input
          type="text"
          name="Icon"
          value={form.Icon}
          onChange={handleChange}
          placeholder="Icon name (e.g., Github)"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
          required
        />
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          {saving ? 'Saving...' : 'Update Social'}
        </button>
      </form>
    </div>
  );
}
