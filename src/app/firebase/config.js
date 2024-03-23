// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATPNzAGnqhMyX74Vlw1-VcsRt8H75DKes",
  authDomain: "code-test-2024.firebaseapp.com",
  projectId: "code-test-2024",
  storageBucket: "code-test-2024.appspot.com",
  messagingSenderId: "285351817595",
  appId: "1:285351817595:web:9c344637411a1e720ccdde",
  measurementId: "G-1MQ7NS0LLY",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
