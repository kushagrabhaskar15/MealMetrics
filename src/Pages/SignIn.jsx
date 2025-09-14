// src/components/SignIn.jsx
import { useState } from "react";
import { auth } from "../Components/Auth.jsx";
import { signInWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePhoneSignIn = async () => {
    try {
      const recaptcha = new RecaptchaVerifier("recaptcha-container", {}, auth);
      const result = await signInWithPhoneNumber(auth, phone, recaptcha);
      setConfirmationResult(result);
      alert("OTP sent");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert("Phone sign-in successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Signed in with Google!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>

      {/* Email */}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleEmailSignIn}>Sign in with Email</button>

      <hr />

      {/* Phone */}
      <input type="text" placeholder="+911234567890" value={phone} onChange={e => setPhone(e.target.value)} />
      <div id="recaptcha-container"></div>
      {!confirmationResult ? (
        <button onClick={handlePhoneSignIn}>Send OTP</button>
      ) : (
        <>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}

      <hr />

      {/* Google */}
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}
