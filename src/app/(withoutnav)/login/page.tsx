'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';

interface LoginResponse {
  access_token: string;
  user_id?: string;
  email?: string;
}

interface ErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getErrorMessage = (err: unknown): string => {
    console.log('err: ', err)
    if (err instanceof AxiosError) {
      // Handle specific error cases
      const data = err.response?.data as ErrorResponse | undefined;
      console.log('data: ', data)
      if (err.response?.status === 401 || err.response?.status === 403) {
        return 'Invalid email or password';
      }
      
      if (err.response?.status === 429) {
        return 'Too many login attempts. Please try again later';
      }

      if (data?.message) {
        return data.message;
      }

      if (err.message === 'Network Error') {
        return 'Unable to connect to the server. Please check your internet connection';
      }
    }
    
    return 'Something went wrong. Please try again';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    // Create URLSearchParams for OAuth2 password flow
    const params = new URLSearchParams();
    params.append('username', email as string);
    params.append('password', password as string);

    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_HTTP_SERVER_URL}/api/auth/login`,
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }
        }
      );

      // Set the auth token cookie
      if (response.data?.access_token) {
        Cookies.set('auth_token', response.data.access_token, { 
          expires: 7,
          path: '/',
          secure: true,
          sameSite: 'lax'
        });
        
        // Navigate to home page
        router.push('/');
      } else {
        throw new Error('No authentication token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Welcome
          </h1>
          <p className="text-gray-600">
            to Temus Avatar
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Continue to Temus Avatar'}
          </button>
        </form>
      </div>
    </div>
  );
} 