import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
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

const firebaseConfig2 = {
  apiKey: "AIzaSyBTBSbeurmew3qqPQPnqyA4OQJ9srEmx4w",
authDomain: "lab-directory-11016.firebaseapp.com",
databaseURL: "https://lab-directory-11016-default-rtdb.firebaseio.com",
projectId: "lab-directory-11016",
storageBucket: "lab-directory-11016.appspot.com",
messagingSenderId: "566365208820",
appId: "1:566365208820:web:25dba2736f4a38261e5ea1",
measurementId: "G-BTYGPYE1WL"
};

const app2 = initializeApp(firebaseConfig2, "app2");

const auth = getAuth(app2)


const fb = firebase;


export default fb;

export {auth};
