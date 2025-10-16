// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAi6tXI3nMf_K-jv7oUXmsQjxEhpuPalTc",

  authDomain: "chatapp-77d35.firebaseapp.com",

  projectId: "chatapp-77d35",

  storageBucket: "chatapp-77d35.firebasestorage.app",

  messagingSenderId: "615938925645",

  appId: "1:615938925645:web:8fe2c258b8537eaea76804",

  measurementId: "G-K19P2BRS7Y"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export const db=getFirestore(app);