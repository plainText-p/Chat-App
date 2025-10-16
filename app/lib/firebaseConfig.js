import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

export const db=getFirestore(app);