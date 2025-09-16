// src/components/Register.jsx
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../Components/Auth.jsx";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [step, setStep] = useState(1); // Step 1: signup, Step 2: extra info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [foodPref, setFoodPref] = useState("");

  const [currentUserId, setCurrentUserId] = useState(null);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  // Ensure current user is always up-to-date
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailRegister = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUserId(userCredential.user.uid);
      setStep(2); // move to extra info
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setCurrentUserId(userCredential.user.uid);
      setStep(2); // move to extra info
      alert("Signed in with Google!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleExtraInfoSubmit = async () => {
    if (!name || !age || !foodPref) {
      alert("Please fill all fields");
      return;
    }

    const uid = currentUserId || auth.currentUser?.uid;
    if (!uid) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      await setDoc(doc(db, "users", uid), {
        name,
        age,
        foodPreference: foodPref,
        email: email || auth.currentUser?.email || "",
      });
      alert("Profile info saved!");
      navigate("/"); // redirect to home/dashboard
    } catch (error) {
      console.error("Firestore write error:", error);
      alert("Failed to save info. Please check your internet connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">
        {step === 1 && (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <button
                onClick={handleEmailRegister}
                disabled={loading}
                className="w-full bg-violet-600 text-white font-semibold py-2 rounded-full hover:bg-violet-700 transition disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register with Email"}
              </button>
            </div>

            <div className="my-6 border-t border-gray-300"></div>

            <button
              onClick={handleGoogleRegister}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-full hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium text-gray-700">Sign in with Google</span>
            </button>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-violet-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Tell us about yourself</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Food Preference (e.g., Vegan, Keto)"
                value={foodPref}
                onChange={(e) => setFoodPref(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <button
                onClick={handleExtraInfoSubmit}
                className="w-full bg-violet-600 text-white py-2 rounded-full hover:bg-violet-700 transition"
              >
                Save Info
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}