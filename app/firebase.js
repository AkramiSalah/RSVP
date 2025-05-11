// app/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCC31SvLZpJ2Hg20nwZqErqXuXF22NqIk",
  authDomain: "rsvp-c4acd.firebaseapp.com",
  projectId: "rsvp-c4acd",
  storageBucket: "rsvp-c4acd.firebasestorage.app",
  messagingSenderId: "929569410242",
  appId: "1:929569410242:web:bacd8769fc13088d59bf5b",
  measurementId: "G-45GT0W6C0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);