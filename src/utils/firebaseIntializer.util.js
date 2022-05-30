import firebase from "firebase/compat/app"

import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/database'

firebase.initializeApp({
    apiKey: "AIzaSyDzkEuiLvUrNZYdU6blvHgVoHBf2tniZO0",
    authDomain: "jupebstudyapp.firebaseapp.com",
    projectId: "jupebstudyapp",
    storageBucket: "jupebstudyapp.appspot.com",
    messagingSenderId: "316815533405",
    databaseURL: 'https://jupebstudyapp-default-rtdb.firebaseio.com/',
    appId: "1:316815533405:web:b0e02fdcf37e5c5cf8b4b4",
    measurementId: "G-XFLZXCNJ44"
})

// firebase.analytics();
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const rtdb = firebase.database()
// export const storage = firebase.storage()
