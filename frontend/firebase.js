// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY, // coming from frontend/.env file
  authDomain: "vingo-food-delivery-abfa1.firebaseapp.com",
  projectId: "vingo-food-delivery-abfa1",
  storageBucket: "vingo-food-delivery-abfa1.firebasestorage.app",
  // storageBucket: "vingo-food-delivery-abfa1.appspot.com",
  messagingSenderId: "541655186919",
  appId: "1:541655186919:web:1d7cbd56658929267d9142",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
