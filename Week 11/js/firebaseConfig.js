import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoTf1QUWYmg7uCypPNnxfgHYPH7qCRRB4",
  authDomain: "task-manager-d46b2.firebaseapp.com",
  projectId: "task-manager-d46b2",
  storageBucket: "task-manager-d46b2.appspot.com",
  messagingSenderId: "680074188522",
  appId: "1:680074188522:web:a06190b0faeec91359e993",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
