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
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [foodPref, setFoodPref] = useState("");

  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUserId(user.uid);
    });
    return () => unsub();
  }, []);

  const handleEmailRegister = async () => {
    if (!email || !password) return alert("Please enter email & password");
    try {
      setLoading(true);
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUserId(userCred.user.uid);
      setStep(2);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      setCurrentUserId(userCred.user.uid);
      setStep(2);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleExtraInfoSubmit = async () => {
    if (!name || !age || !foodPref) return alert("Fill all fields");
    try {
      // 🔑 store extra details under the user’s UID
      await setDoc(doc(db, "users", currentUserId), {
        name,
        age: Number(age),
        foodPreference: foodPref,
        email: email || auth.currentUser?.email || "",
      });
      alert("Profile info saved!");
      navigate("/");
    } catch (err) {
      console.error("Firestore write error:", err);
      alert("Failed to save info.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {step === 1 ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={handleEmailRegister}
              disabled={loading}
              className="w-full bg-violet-600 text-white py-2 rounded-full hover:bg-violet-700 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register with Email"}
            </button>

            <div className="my-6 border-t border-gray-300"></div>

            <button
              onClick={handleGoogleRegister}
              className="w-full border py-2 rounded-full hover:bg-gray-50 transition"
            >
              Sign in with Google
            </button>

            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link to="/signin" className="text-violet-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">Tell us about yourself</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="text"
              placeholder="Food Preference (e.g., Vegan, Keto)"
              value={foodPref}
              onChange={(e) => setFoodPref(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={handleExtraInfoSubmit}
              className="w-full bg-violet-600 text-white py-2 rounded-full hover:bg-violet-700 transition"
            >
              Save Info
            </button>
          </>
        )}
      </div>
    </div>
  );
}
