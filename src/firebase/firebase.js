// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXW80UwRvTHat5HBxGF-tUyFIIfdgYCfs",
  authDomain: "e-commerce-6d1f2.firebaseapp.com",
  projectId: "e-commerce-6d1f2",
  storageBucket: "e-commerce-6d1f2.appspot.com",
  messagingSenderId: "927349533360",
  appId: "1:927349533360:web:e7c6fb0be479b83c26e975"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }