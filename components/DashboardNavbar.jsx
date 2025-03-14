'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DashboardNavbar = () => {
  const router = useRouter();

  const handleSignOut = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    toast.success('Sign out successful');
    setTimeout(() => {
      router.push('/login');
    }, 3000);
    return;
  };

  return (
    <nav className="dashboard-navbar">
      <div className="navbar-container">
        <Link href="/dashboard" className="navbar-title flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          Dashboard
        </Link>
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </div>

      <style jsx>{`
        .dashboard-navbar {
          width: 100%;
          background-color: #2c3e50;
          color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          max-width: 1200px;
          margin: 0 auto;
          height: 60px;
        }

        .navbar-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }

        .signout-button {
          background-color: #e74c3c;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .signout-button:hover {
          background-color: #c0392b;
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 0.75rem;
            height: 50px;
          }

          .navbar-title {
            font-size: 1rem;
          }

          .signout-button {
            padding: 0.4rem 0.75rem;
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 0 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default DashboardNavbar;