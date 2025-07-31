import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Sign In handler
const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showMessage("Please fill in all fields.", "signInMessage");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showMessage("Sign In Successful!", "signInMessage");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        showMessage("Incorrect password!", "signInMessage");
      } else if (errorCode === "auth/user-not-found") {
        showMessage("Account does not exist!", "signInMessage");
      } else {
        showMessage("Login failed. Please try again.", "signInMessage");
      }
      console.error(error);
    });
});
