// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notification from './Notification';
import { 
  FiHome, 
  FiPieChart, 
  FiUpload, 
  FiSearch, 
  FiDollarSign, 
  FiBell, 
  FiUser,
  FiLogOut,
  FiMenu
} from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items with summarized labels
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiPieChart className="w-4 h-4" /> },
    { path: '/upload', label: 'Upload', icon: <FiUpload className="w-4 h-4" /> },
    { path: '/search', label: 'Search', icon: <FiSearch className="w-4 h-4" /> },
    { path: '/transactions', label: 'Transactions', icon: <FiDollarSign className="w-4 h-4" /> },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl sticky top-0 z-50 font-sans border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - No underline */}
          <Link to="/" className="flex items-center space-x-3 no-underline">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiHome className="text-white w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                RLR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 font-medium transition-all duration-200 group no-underline ${
                    isActiveLink(item.path) 
                      ? 'text-blue-300' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  
                  {/* Active indicator without underline */}
                  <div className={`absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 ${
                    isActiveLink(item.path) 
                      ? 'w-full opacity-100' 
                      : 'w-0 opacity-0'
                  }`}></div>
                </Link>
              ))}
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-slate-700 rounded-lg group no-underline"
                >
                  <FiBell className="w-5 h-5" />
                  {/* Notification indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-800"></div>
                </button>
                {showNotifications && <Notification />}
              </div>

              {/* Profile & Logout */}
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-700">
                <div className="flex items-center space-x-3 bg-slate-700/50 px-4 py-2 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    Hi, <span className="text-white">{user.name.split(' ')[0]}</span>
                  </span>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl transition-all duration-200 font-semibold shadow-lg flex items-center space-x-2 border border-red-600 group no-underline"
                >
                  <HiOutlineLogout className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            className="md:hidden bg-slate-700 text-white p-3 rounded-xl transition-all duration-200 shadow-lg no-underline"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && user && (
          <div className="md:hidden py-4 border-t border-slate-700 bg-slate-800 rounded-b-2xl shadow-2xl">
            <div className="flex flex-col space-y-2 px-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-200 font-medium no-underline ${
                    isActiveLink(item.path)
                      ? 'bg-blue-600/20 text-blue-300 border-l-4 border-blue-400'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`${isActiveLink(item.path) ? 'text-blue-400' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile User Info */}
              <div className="flex items-center space-x-3 py-3 px-4 mt-4 bg-slate-700/50 rounded-xl border border-slate-600">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">Welcome back</p>
                </div>
              </div>

              {/* Mobile Logout */}
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-4 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl transition-all duration-200 font-semibold mt-2 shadow-lg no-underline"
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Re-import HiOutlineLogout for the logout button
import { HiOutlineLogout } from 'react-icons/hi';

export default Navbar;