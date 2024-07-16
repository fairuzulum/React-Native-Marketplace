// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUIBmtmNyE73RC6RUCgymYUjAiRt9tFbo",
  authDomain: "react-native-49f10.firebaseapp.com",
  projectId: "react-native-49f10",
  storageBucket: "react-native-49f10.appspot.com",
  messagingSenderId: "835671876907",
  appId: "1:835671876907:web:42b118f21344674c12916e",
  measurementId: "G-GQNVF703DY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);