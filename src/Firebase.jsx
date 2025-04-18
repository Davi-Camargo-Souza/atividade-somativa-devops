import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDs6Gvy_2wUZ3ykMXJHFX0Tu2Jt7JiHmG4",
    authDomain: "somativa-aec26.firebaseapp.com",
    projectId: "somativa-aec26",
    storageBucket: "somativa-aec26.firebasestorage.app",
    messagingSenderId: "617818795106",
    appId: "1:617818795106:web:20b747838576c9384b753b"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
export default firebase;