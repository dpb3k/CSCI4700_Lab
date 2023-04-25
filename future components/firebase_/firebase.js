// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTBSbeurmew3qqPQPnqyA4OQJ9srEmx4w",
  authDomain: "lab-directory-11016.firebaseapp.com",
  databaseURL: "https://lab-directory-11016-default-rtdb.firebaseio.com",
  projectId: "lab-directory-11016",
  storageBucket: "lab-directory-11016.appspot.com",
  messagingSenderId: "566365208820",
  appId: "1:566365208820:web:e1cf6a2fc5e2c41d1e5ea1",
  measurementId: "G-VMRCHPP7YY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;