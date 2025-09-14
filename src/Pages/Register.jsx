// src/components/Register.jsx
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../components/Auth.jsx";
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

  // Step 1: Email signup
  const handleEmailRegister = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user?.uid || auth.currentUser?.uid;
      setCurrentUserId(uid);
      setStep(2); // move to extra info
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Google signup
  const handleGoogleRegister = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const uid = userCredential.user?.uid || auth.currentUser?.uid;
      setCurrentUserId(uid);
      setStep(2); // move to extra info
      alert("Signed in with Google!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Step 2: Save extra info to Firestore
  const handleExtraInfoSubmit = async () => {
    if (!name || !age || !foodPref) {
      alert("Please fill all fields");
      return;
    }

    if (!currentUserId) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      await setDoc(doc(db, "users", currentUserId), {
        name,
        age,
        foodPreference: foodPref,
        email: email || auth.currentUser.email,
      });
      alert("Profile info saved!");
      navigate("/"); // redirect to home/dashboard
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">

        {step === 1 && (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>

            {/* Email Registration */}
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

            {/* Google */}
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

        {/* Step 2: Extra Info */}
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
