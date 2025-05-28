'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { login } from '@/services/authservice/loginService';
import { LoginDto } from '@/types/login';
import { AxiosError } from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const credentials: LoginDto = { username, password };

    try {
      await login(credentials);
      router.push('/dashboard');
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
          <LogIn className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Login</h1>
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&lsquo;t have an account?{' '}
          <a href="/register" className="text-teal-600 hover:underline dark:text-teal-400">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
