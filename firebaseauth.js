// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

// Show message helper
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = "1";
  setTimeout(() => {
    messageDiv.style.opacity = "0";
  }, 5000);
}

// Sign up event listener
document.getElementById("submitSignUp").addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("remail").value;
  const password = document.getElementById("rPassword").value;
  const firstname = document.getElementById("rFirstName").value;
  const lastname = document.getElementById("rLastName").value;

  createUserWithEmailAndPassword
