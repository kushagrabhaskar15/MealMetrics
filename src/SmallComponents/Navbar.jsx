// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../components/Auth.jsx";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-violet-600">
              MealMetrics
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-violet-600 transition-colors duration-200">
              Home
            </Link>
            <Link to="/recommend" className="text-gray-600 hover:text-violet-600 transition-colors duration-200">
              Recommend
            </Link>
            <Link to="/nutrition" className="text-gray-600 hover:text-violet-600 transition-colors duration-200">
              Macros & Micros
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-violet-600 transition-colors duration-200">
              About
            </Link>
          </div>

          {/* Desktop Auth/Profile Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="bg-violet-600 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:bg-violet-700 transition duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-violet-600 text-violet-600 font-medium px-4 py-2 rounded-full hover:bg-violet-50 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="bg-violet-600 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:bg-violet-700 transition duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="border border-violet-600 text-violet-600 font-medium px-4 py-2 rounded-full hover:bg-violet-50 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            Home
          </Link>
          <Link to="/recommend" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            Recommend
          </Link>
          <Link to="/nutrition" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            Macros & Micros
          </Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            About
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-violet-600 hover:bg-violet-700">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-base font-medium text-violet-600 border border-violet-600 py-2 rounded-md hover:bg-violet-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-violet-600 hover:bg-violet-700">
                Sign In
              </Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-violet-600 border border-violet-600 hover:bg-violet-50">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
