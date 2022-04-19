import firebase from 'firebase/compat';

const firebaseConfig = ({
    apiKey: "AIzaSyChq7doiw-0vvz_3ceenTjOdow-SDyZVME",
    authDomain: "fir-web-a16d4.firebaseapp.com",
    projectId: "fir-web-a16d4",
    storageBucket: "fir-web-a16d4.appspot.com",
    messagingSenderId: "295313408920",
    appId: "1:295313408920:web:02b6e547820fbde5fae1ed",
    databaseURL: "https://fir-web-a16d4-default-rtdb.europe-west1.firebasedatabase.app/"
});

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
export const ROOT_REF = '/cows/';