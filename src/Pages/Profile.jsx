// src/components/Profile.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../Components/Auth.jsx";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../SmallComponents/Navbar.jsx";

const calcBMI = (w, h) => {
  if (!w || !h) return null;
  const m = h / 100;
  return (w / (m * m)).toFixed(1);
};
const calcCalories = (w, h, age, gender, act) => {
  if (!w || !h || !age || !gender) return null;
  const bmr =
    gender === "male"
      ? 10 * w + 6.25 * h - 5 * age + 5
      : 10 * w + 6.25 * h - 5 * age - 161;
  const f = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    "very-active": 1.9,
  };
  return Math.round(bmr * (f[act] || 1.2));
};
const calcMacros = (cal) =>
  cal
    ? {
        protein: Math.round((0.25 * cal) / 4),
        carbs: Math.round((0.5 * cal) / 4),
        fat: Math.round((0.25 * cal) / 9),
      }
    : null;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return navigate("/signin");
      setUser(currentUser);

      const uDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (uDoc.exists()) {
        const data = uDoc.data();
        setProfile(data);
        setForm(data);
      }
      const q = query(
        collection(db, "savedRecipes"),
        where("userId", "==", currentUser.uid)
      );
      const snap = await getDocs(q);
      setSavedRecipes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const saveProfile = async () => {
    await setDoc(doc(db, "users", user.uid), form, { merge: true });
    setProfile(form);
    setEditing(false);
  };

  const bmi = calcBMI(profile?.weight, profile?.height);
  const calories = calcCalories(
    profile?.weight,
    profile?.height,
    profile?.age,
    profile?.gender,
    profile?.activity
  );
  const macros = calcMacros(calories);

  if (!user) return null;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar />
      <div className="flex justify-center items-start py-12 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl">

          {/* ===== User Info ===== */}
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={"src/assets/profile.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-100 shadow-md object-cover"
            />
            <h2 className="text-3xl font-extrabold text-gray-900 mt-4">
              {profile?.name || user.displayName || "Your Name"}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since:{" "}
              {new Date(user.metadata.creationTime).toLocaleDateString()}
            </p>
          </div>

          {/* ===== Editable Details ===== */}
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-purple-600">
                Health Stats
              </h3>
              <button
                onClick={() =>
                  editing ? saveProfile() : setEditing(true)
                }
                className="text-purple-600 font-semibold"
              >
                {editing ? "Save" : "Edit"}
              </button>
            </div>

            {["age", "height", "weight"].map((field) => (
              <div key={field} className="mb-3">
                <label className="block text-gray-700 capitalize">
                  {field}
                </label>
                {editing ? (
                  <input
                    type="number"
                    value={form[field] || ""}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    className="w-full border rounded p-2"
                  />
                ) : (
                  <p>{profile?.[field] || "—"}</p>
                )}
              </div>
            ))}

            {/* Gender */}
            <div className="mb-3">
              <label className="block text-gray-700">Gender</label>
              {editing ? (
                <select
                  value={form.gender || ""}
                  onChange={(e) =>
                    setForm({ ...form, gender: e.target.value })
                  }
                  className="w-full border rounded p-2"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p>{profile?.gender || "—"}</p>
              )}
            </div>

            {/* Activity */}
            <div className="mb-3">
              <label className="block text-gray-700">Activity Level</label>
              {editing ? (
                <select
                  value={form.activity || ""}
                  onChange={(e) =>
                    setForm({ ...form, activity: e.target.value })
                  }
                  className="w-full border rounded p-2"
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="very-active">Very Active</option>
                </select>
              ) : (
                <p>{profile?.activity || "—"}</p>
              )}
            </div>

            {/* Calculated Results */}
            <div className="mt-6 text-purple-700">
              <p>BMI: {bmi || "—"}</p>
              <p>Daily Calories: {calories ? `${calories} kcal` : "—"}</p>
              {macros && (
                <p>
                  Macros: {macros.protein}g protein / {macros.carbs}g carbs /{" "}
                  {macros.fat}g fat
                </p>
              )}
            </div>
          </div>

          {/* ===== Logout ===== */}
          <button
            onClick={handleLogout}
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-full hover:bg-purple-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
