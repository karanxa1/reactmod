// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyagPUtAcwRqmiVGmc_98BQZtr8zyEcZg",
  authDomain: "modzyreact.firebaseapp.com",
  projectId: "modzyreact",
  storageBucket: "modzyreact.firebasestorage.app",
  messagingSenderId: "146519903058",
  appId: "1:146519903058:web:746041d074bc82d971c88b",
  measurementId: "G-MBHQ1CCD3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app; 