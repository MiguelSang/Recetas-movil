// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDagUXTEsQKv7XuZOTs1NlhSbf4hzJDP3A",
  authDomain: "recetas-d490a.firebaseapp.com",
  projectId: "recetas-d490a",
  storageBucket: "recetas-d490a.appspot.com", // 👈 corregido
  messagingSenderId: "507310661883",
  appId: "1:507310661883:web:34f8f6b27a7b32eb0b505e",
  measurementId: "G-DYHFYJC4TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (para base de datos)
export const db = getFirestore(app);

// Inicializar Analytics (solo funciona en web)
export const analytics = getAnalytics(app);
