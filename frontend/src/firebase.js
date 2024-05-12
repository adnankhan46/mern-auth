// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lyt-book.firebaseapp.com",
  projectId: "lyt-book",
  storageBucket: "lyt-book.appspot.com",
  messagingSenderId: "830084605765",
  appId: "1:830084605765:web:8d2da34a5027e8e50cc02c",
  measurementId: "G-MPWGR1RRY6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);