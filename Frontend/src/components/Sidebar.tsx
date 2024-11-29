import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../routes';
import PharmaGeap from '../assets/PharmaGeap.png'

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
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
              className={`flex items-center gap-3 p-3 rounded-lg mb-1 ${isActive
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
  );
}