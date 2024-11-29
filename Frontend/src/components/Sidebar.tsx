import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../routes';

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Bouton pour afficher/masquer la sidebar */}
      <button
        className={`fixed top-4 z-20 p-1 bg-blue-600 text-white rounded-full shadow-lg w-6 h-6 flex items-center justify-center transition-all duration-300
          ${isOpen ? 'right-4' : 'left-2'}`}
        onClick={toggleSidebar}
      >
        <span className="sr-only">Toggle Sidebar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform lg:translate-x-0 transition-transform duration-300 z-10 w-64 bg-white shadow-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">PharmaSys</h1>
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
                onClick={() => setIsOpen(false)} // Fermer la sidebar après la navigation
              >
                <route.icon className="w-5 h-5" />
                <span>{route.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay pour cacher la sidebar en cliquant à l'extérieur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
