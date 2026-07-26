import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJn4GexaLicEpKzXgAs4A1YL5o1Vonwxg",
  authDomain: "fitiq-web.firebaseapp.com",
  projectId: "fitiq-web",
  storageBucket: "fitiq-web.firebasestorage.app",
  messagingSenderId: "773470923854",
  appId: "1:773470923854:web:a7bb7d18e69c8ded7b671f",
  measurementId: "G-V50YF6WLPY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();