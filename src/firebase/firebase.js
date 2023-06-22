// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJj2nOSrpF7Vn_Xsmo-TsTwi8YiiilQ_A",
  authDomain: "filmyweb-8f2d1.firebaseapp.com",
  projectId: "filmyweb-8f2d1",
  storageBucket: "filmyweb-8f2d1.appspot.com",
  messagingSenderId: "581815820398",
  appId: "1:581815820398:web:1a6426f98cdf7e570ec67f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const  db = getFirestore(app);
 export const movieRef = collection(db,'movies');
 export const reviewsRef = collection(db, 'reviews');
 export const usersRef = collection(db, 'users');

 export default app;