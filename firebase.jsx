import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyD2K9QPt7QvreufjfUm96R7f_dif45HtXM",
  authDomain: "labs-3715b.firebaseapp.com",
  projectId: "labs-3715b",
  storageBucket: "labs-3715b.appspot.com",
  messagingSenderId: "440101339114",
  appId: "1:440101339114:web:479ff271182440ac717c93",
  measurementId: "G-R43JJZDFGW"
});

const fb = firebase;
export default fb;