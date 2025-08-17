// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXl68E3jZZhu7kuIuLLRcp4R2z_vdHiXY",
  authDomain: "to-do-application-be51c.firebaseapp.com",
  projectId: "to-do-application-be51c",
  storageBucket: "to-do-application-be51c.firebasestorage.app",
  messagingSenderId: "932082310546",
  appId: "1:932082310546:web:73c6a654501e8ee6e4754b",
  measurementId: "G-3WYL6XZG40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig