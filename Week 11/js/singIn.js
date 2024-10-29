// Import the functions you need from the SDKs you need
import { db, auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.getElementById("sign-in-form");
  const signUpForm = document.getElementById("sign-up-form");
  const showSignUp = document.getElementById("show-signup");
  const showSignIn = document.getElementById("show-signin");
  const signInBtn = document.getElementById("sign-in-btn");
  const SignUpBtn = document.getElementById("sign-up-btn");

  showSignIn.addEventListener("click", () => {
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
  });

  showSignUp.addEventListener("click", () => {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
  });

  SignUpBtn.addEventListener("click", async () => {
    const email = document.getElementById("sign-up-email").value;
    const password = document.getElementById("sign-up-password").value;
    try {
      const authCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(authCredential.user);
      const docRef = doc(db, "users", authCredential.user.uid);
      console.log(docRef);
      await setDoc(docRef, {
        email: email,
      });
      M.toast({ html: "Sign up successful!" });
      window.location.href = "/";
      signUpForm.style.display = "none";
      signInForm.style.display = "block";
    } catch (e) {
      M.toast({ html: e.message });
    }
  });

  signInBtn.addEventListener("click", async () => {
    const email = document.getElementById("sign-in-email").value;
    const password = document.getElementById("sign-in-password").value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      M.toast({ html: "Sign-in successful!" });
      window.location.href = "/"; // Redirect to home page after successful sign-in
    } catch (e) {
      console.error("Sign-in error: ", e);
      M.toast({ html: e.message });
    }
  });
});
