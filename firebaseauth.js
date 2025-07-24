  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getauth, createuserwithemailandpassword, signinwithemailandpassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
  import { getFirestore, setDoc, Doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  function showmessage(message, divid) {
    var messageDiv = document.getElementById(divid);
    messageDiv.style.display = "block";
    messageDiv.style.opacity
    messageDiv.innerHTML = message;
    setTimeout(function() {
        messageDiv.style.opacity = "0";
    }, 5000);
}

const signup=document.getElementById("submitSignUp");
signup.addEventListener("click", (Event) => {
    const email = document.getElementById("remail").value;
    const password = document.getElementById("rPassword").value;
    const firstname = document.getElementById("rFirstName").value;
    const lastname = document.getElementById("rLastName").value;
    const auth = getAuth();
    const firestore = getFirestore();

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(getFirestore(), "users", user.uid), {
            first: firstname,
            last: lastname,
            email: email
        });
        showmessage("Account Created Successfully", "signUpMessage");
        const docref = doc(db, "users", user.uid);
        setDoc(docref, userdata).then(() => {
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });

    }).catch((error) => {
        const errorcode = error.code;
        if (errorcode === "auth/email-already-in-use") {
            showmessage("Email Already in Use!!!", "signUpMessage");
        }
        else {
            showmessage("unable to create account!!", "signUpMessage");
        }
    });
});
