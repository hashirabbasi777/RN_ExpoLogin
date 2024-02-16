//Fire configuration key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC5Yt8jIkfCxTUCwg-WmT2QXhndLObC6WE",
    authDomain: "firsttest-b8e49.firebaseapp.com",
    projectId: "firsttest-b8e49",
    storageBucket: "firsttest-b8e49.appspot.com",
    messagingSenderId: "722055797005",
    appId: "1:722055797005:web:e9693ac1048ffd23e47844",
    measurementId: "G-HLDPJH8R2V"
}


if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};