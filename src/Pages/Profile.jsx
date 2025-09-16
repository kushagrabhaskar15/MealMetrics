// src/components/Profile.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../Components/Auth.jsx"; // Auth + Firestore
import { signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();

  // Firebase Auth: Check logged-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchSavedRecipes(currentUser.uid);
      } else {
        navigate("/signin"); // redirect if not logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch saved recipes from Firestore
  const fetchSavedRecipes = async (uid) => {
    try {
      const q = query(collection(db, "savedRecipes"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const recipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSavedRecipes(recipes);
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
    }
  };

  // Logout
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      
      {/* ===== Header Section ===== */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="flex flex-col items-center -mt-16 mb-6">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">{user.displayName || "Your Name"}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* ===== Stats Section ===== */}
        <div className="grid grid-cols-3 gap-4 mt-6 mb-6 text-center">
          <div className="bg-yellow-50 rounded-xl py-3 shadow-md">
            <p className="font-bold text-lg">{savedRecipes.length}</p>
            <p className="text-sm text-gray-500">Saved Recipes</p>
          </div>
          <div className="bg-yellow-50 rounded-xl py-3 shadow-md">
            <p className="font-bold text-lg">{/* Placeholder for Recipes Added */}0</p>
            <p className="text-sm text-gray-500">Recipes Added</p>
          </div>
          <div className="bg-yellow-50 rounded-xl py-3 shadow-md">
            <p className="font-bold text-lg">{/* Placeholder for Favorites */}0</p>
            <p className="text-sm text-gray-500">Favorites</p>
          </div>
        </div>

        {/* ===== Saved Recipes Section ===== */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-left">Saved Recipes</h3>
          {savedRecipes.length === 0 ? (
            <p className="text-gray-500 text-center">You have no saved recipes yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {savedRecipes.map(recipe => (
                <div key={recipe.id} className="bg-yellow-50 rounded-xl shadow-md overflow-hidden">
                  <img
                    src={recipe.image || "https://via.placeholder.com/150"}
                    alt={recipe.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 text-center">
                    <p className="font-semibold">{recipe.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== Settings Section ===== */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
