import React, { useState,useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("user_name");
  useEffect(() => {
    token ? setAuthStatus(true): setAuthStatus(false)
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };
  
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative px-4 py-2 text-sm font-medium transition-all duration-200
          ${isActive 
            ? 'text-white' 
            : 'text-gray-300 hover:text-white'
          }
          group`}
      >
        {children}
        <span className={`absolute bottom-0 left-0 h-0.5 bg-white transform transition-all duration-200
          ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}>
        </span>
      </Link>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Quiz App</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-4">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/quiz">Quiz</NavLink>
            </div>
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center">
            {authStatus ? (
                <div className="flex">
                <p className="px-4 py-2 text-sm font-medium transition-all text-white">{userName}</p>
              <button
                onClick={handleLogout}
                className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 
                  text-white font-medium transform transition-all duration-200 
                  hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Logout
              </button>
                </div>
              
            ) : (
              <Link
                to="/login"
                className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 
                  text-white font-medium transform transition-all duration-200 
                  hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 
                hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 
                focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/quiz"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Quiz
          </Link>
          {authStatus  ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;