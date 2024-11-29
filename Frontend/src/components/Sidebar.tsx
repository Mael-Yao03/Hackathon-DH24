import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../routes';
import PharmaGeap from '../assets/PharmaGeap.png';

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Bouton Menu */}
      <button
        onClick={toggleSidebar}
        className="fixed top-18 -left-0 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg md:hidden"
        aria-label="Ouvrir le menu"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen`}
      >
        <div className="p-4 border-b">
          <Link to='/scanning'>
            <img src={PharmaGeap} alt="logo" width={180} />
          </Link>
        </div>
        <nav className="p-4">
          {routes.map((route) => {
            const isActive = location.pathname === route.path;
            return (
              <Link
                key={route.path}
                to={route.path}
                className={`flex items-center gap-3 p-3 rounded-lg mb-1 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <route.icon className="w-5 h-5" />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay pour fermer la sidebar */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 md:hidden"
        ></div>
      )}
    </>
  );
}
