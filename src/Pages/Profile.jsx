// src/components/Profile.jsx
import { useEffect, useState } from "react";
import { auth } from "../components/Auth.jsx";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/signin"); // redirect if not logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 hover:scale-110 transition-transform duration-200"
          aria-label="Back to dashboard"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h2>

        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            <span className="font-semibold">Name:</span> {user.displayName || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user.email || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone:</span> {user.phoneNumber || "N/A"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-violet-600 text-white font-semibold py-2 rounded-full hover:bg-violet-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
