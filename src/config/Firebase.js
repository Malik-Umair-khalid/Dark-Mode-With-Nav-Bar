import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
  updateDoc, 
  increment
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA3G9Cgx510wOrV_YYKYWnymblUdu64Fc",
  authDomain: "react-firebase-19393.firebaseapp.com",
  projectId: "react-firebase-19393",
  storageBucket: "react-firebase-19393.appspot.com",
  messagingSenderId: "171129853530",
  appId: "1:171129853530:web:b70b6de39de6f116ef2a63",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
  updateDoc,
  increment
};
