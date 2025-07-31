import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPhHWUUicDAgCg_Myefi5J4eTCQRNGnUM",
  authDomain: "qutor-fdd88.firebaseapp.com",
  projectId: "qutor-fdd88",
  storageBucket: "qutor-fdd88.firebasestorage.app",
  messagingSenderId: "433760997594",
  appId: "1:433760997594:web:4592dbf1fcf9bc6011d5e3",
  measurementId: "G-7X1CK9JXJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Load user from localStorage
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser && loggedInUser.uid) {
  const docRef = doc(db, "users", loggedInUser.uid);
  getDoc(docRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        document.getElementById("loggedUserFName").innerText = userData.first;
        document.getElementById("loggedUserLName").innerText = userData.last;
        document.getElementById("loggedUserEmail").innerText = userData.email;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
} else {
  // No user is logged in, redirect to login
  window.location.href = "index.html";
}

// Logout button functionality
document.getElementById("Logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
});
