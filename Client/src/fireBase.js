// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "modern-blog-53c96.firebaseapp.com",
  projectId: "modern-blog-53c96",
  storageBucket: "modern-blog-53c96.appspot.com",
  messagingSenderId: "645390234225",
  appId: "1:645390234225:web:d74b90634f7eaed7ce21d0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);