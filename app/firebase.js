import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIneUCN0B5lIDD2mExDm6Uw04ZQxHQ2uE",
  authDomain: "next-firebase-kodekloud.firebaseapp.com",
  projectId: "next-firebase-kodekloud",
  storageBucket: "next-firebase-kodekloud.appspot.com",
  messagingSenderId: "554464573082",
  appId: "1:554464573082:web:51244e679bdfc22246d123",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
