// src/components/Register.jsx
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../components/Auth.jsx";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleEmailRegister = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneRegister = async () => {
    try {
      const recaptcha = new RecaptchaVerifier("recaptcha-container", { size: "invisible" }, auth);
      const result = await signInWithPhoneNumber(auth, phone, recaptcha);
      setConfirmationResult(result);
      alert("OTP sent to phone");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert("Phone number verified!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Signed in with Google!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">

        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 hover:scale-110 transition-transform duration-200"
          aria-label="Go back to dashboard"
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>

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

        {/* Phone Registration */}
        <div className="space-y-4">
          <input
            type="tel"
            placeholder="+911234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />
          <div id="recaptcha-container"></div>
          {!confirmationResult ? (
            <button
              onClick={handlePhoneRegister}
              className="w-full bg-gray-600 text-white py-2 rounded-full hover:bg-gray-700 transition"
            >
              Send OTP
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-violet-600 text-white py-2 rounded-full hover:bg-violet-700 transition"
              >
                Verify OTP
              </button>
            </>
          )}
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

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-violet-600 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
