// Import Firebase SDKs (Modular v12)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcgH4GfMmixsJh4rLGSjusIqqW6JrEo44",
  authDomain: "travel-1a6b1.firebaseapp.com",
  projectId: "travel-1a6b1",
  storageBucket: "travel-1a6b1.firebasestorage.app",
  messagingSenderId: "519605106219",
  appId: "1:519605106219:web:c6ba3277bf5dedf7209c6e",
  measurementId: "G-6G2PKE3326"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export instances for other JS files
export { app, auth, db, analytics };
