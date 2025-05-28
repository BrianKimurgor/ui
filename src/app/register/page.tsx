"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { register } from '@/services/authservice/registerService';
import { RegisterDto } from '@/types/register';
import { AxiosError } from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: RegisterDto = { username, email, password };

    try {
      await register(payload);
      router.push('/login');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-950">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-6">
        <div className="flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400">
          <Lock className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Register</h1>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-teal-500 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
}
