// v8
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import firebase from 'firebase/compat/app'; //v9
import 'firebase/compat/auth'; //v9
import 'firebase/compat/firestore'; //v9


const config = {
    apiKey: "AIzaSyAWbZVY6ecwTB1U6G-M1hbzcOwKlYjX-Nk",
    authDomain: "crwn-db-325ea.firebaseapp.com",
    projectId: "crwn-db-325ea",
    storageBucket: "crwn-db-325ea.appspot.com",
    messagingSenderId: "291887900150",
    appId: "1:291887900150:web:8b8b94d5cde878852c13d7",
    measurementId: "G-M9XDJ975F3"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;
