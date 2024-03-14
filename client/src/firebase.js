// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "mern-auth-8b6a5.firebaseapp.com",
  projectId: "mern-auth-8b6a5",
  storageBucket: "mern-auth-8b6a5.appspot.com",
  messagingSenderId: "500624604264",
  appId: "1:500624604264:web:11d52cbbc06e113ed08fdd",
  measurementId: "G-GEHKTZXBJN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);