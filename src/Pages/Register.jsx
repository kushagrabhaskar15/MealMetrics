// src/components/Register.jsx
import { useState } from "react";
import { auth } from "../Components/Auth.jsx";
import { createUserWithEmailAndPassword, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier } from "firebase/auth";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleEmailRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePhoneRegister = async () => {
    try {
      const recaptcha = new RecaptchaVerifier("recaptcha-container", {}, auth);
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
    <div>
      <h2>Register</h2>

      {/* Email Register */}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleEmailRegister}>Register with Email</button>

      <hr />

      {/* Phone Register */}
      <input type="text" placeholder="+911234567890" value={phone} onChange={e => setPhone(e.target.value)} />
      <div id="recaptcha-container"></div>
      {!confirmationResult ? (
        <button onClick={handlePhoneRegister}>Send OTP</button>
      ) : (
        <>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}

      <hr />

      {/* Google */}
      <button onClick={handleGoogleRegister}>Sign in with Google</button>
    </div>
  );
}
