// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Components/Auth.jsx";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
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
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-violet-600"
        >
          MealMetrics
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-violet-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/nutrition"
            className="text-gray-600 hover:text-violet-600 transition-colors duration-200"
          >
            Nutrition Calculator
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-violet-600 transition-colors duration-200"
          >
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
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
      </div>
    </nav>
  );
};

export default Navbar;
