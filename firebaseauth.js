import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Your Firebase config
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

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = "1";
  setTimeout(() => {
    messageDiv.style.opacity = "0";
  }, 5000);
}

document.getElementById("submitSignUp").addEventListener("click", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        first: firstName,
        last: lastName,
        email: email
      };
      return setDoc(doc(db, "users", user.uid), userData);
    })
    .then(() => {
      showMessage("Account Created Successfully!", "signUpMessage");
      window.location.href = "index.html"; // change as needed
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        showMessage("Email already in use!", "signUpMessage");
      } else {
        showMessage("Failed to create account!", "signUpMessage");
      }
      console.error(error);
    });
});
