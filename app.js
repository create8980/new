import { auth, db } from "./firebase-config.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// DOM Elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutBtn = document.getElementById("logoutBtn");
const userDashboard = document.getElementById("userDashboard");

// Auth State Observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
    if(userDashboard) userDashboard.classList.remove("hidden");
    loadUserVerifications(user.uid);
  } else {
    console.log("User logged out");
    if(userDashboard) userDashboard.classList.add("hidden");
  }
});

// User Registration Function
window.handleRegister = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("রেজিস্ট্রেশন সফল হয়েছে!");
  } catch (error) {
    alert("ত্রুটি: " + error.message);
  }
};

// User Login Function
window.handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("লগইন সফল হয়েছে!");
  } catch (error) {
    alert("লগইন ব্যর্থ হয়েছে: " + error.message);
  }
};

// User Logout Function
if(logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("লগআউট করা হয়েছে।");
  });
}

// Save Verification Data to Firestore
window.saveVerificationData = async (docData) => {
  const user = auth.currentUser;
  if (!user) {
    alert("দয়া করে প্রথমে লগইন করুন!");
    return;
  }

  try {
    await addDoc(collection(db, "verifications"), {
      ...docData,
      userId: user.uid,
      timestamp: serverTimestamp()
    });
    alert("ডেটা সফলভাবে সেভ করা হয়েছে!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Load User Specific Verifications
async function loadUserVerifications(uid) {
  try {
    const q = query(collection(db, "verifications"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error loading data: ", error);
  }
}
