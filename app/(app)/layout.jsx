"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const Layout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          // No token found, redirect to login
          toast.error('Unauthenticated');
          setTimeout(() => {
            router.push('/login');
          }, 1000);
          return;
        }

        // Verify token by calling the /me endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          // Token invalid or expired
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        // User is authenticated
        setLoading(false);
      } catch (error) {
        console.error('Authentication check failed:', error);
        // On error, redirect to login
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner-icon" />
        
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
            background-color: #f9f9f9;
          }
          
          :global(.spinner-icon) {
            color: #776AA6;
            font-size: 80px;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Render children only if authenticated
  return (
    <div className="app-layout">
      {children}
    </div>
  );
};

export default Layout;