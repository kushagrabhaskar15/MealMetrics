// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4CnZoF5EujzoxnRGg1JKApeKhuptD8nA",
  authDomain: "recipegenerator-64546.firebaseapp.com",
  projectId: "recipegenerator-64546",
  storageBucket: "recipegenerator-64546.firebasestorage.app",
  messagingSenderId: "397837200278",
  appId: "1:397837200278:web:db509910b98c0d663e0bb7",
  measurementId: "G-F4B8CQLPQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth};