// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  EmailAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  collection,
  query,
  getDocs,
  addDoc
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsZfcDnd4KVgGUwAw-3L8ME0XB1Z-oiJ8",
  authDomain: "brand-site-backend.firebaseapp.com",
  databaseURL: "https://brand-site-backend-default-rtdb.firebaseio.com",
  projectId: "brand-site-backend",
  storageBucket: "brand-site-backend.firebasestorage.app",
  messagingSenderId: "873434253745",
  appId: "1:873434253745:web:e2e59f30ff1019f301d590",
  measurementId: "G-CX5C3WGRYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Export auth methods
export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
};

// Export Firestore methods
export {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  addDoc
};