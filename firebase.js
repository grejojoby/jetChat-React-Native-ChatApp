import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC42m_4cJ3j6C5mtZHzctqoxRb63I5uEhc",
  authDomain: "rnchat-d0d3f.firebaseapp.com",
  projectId: "rnchat-d0d3f",
  storageBucket: "rnchat-d0d3f.appspot.com",
  messagingSenderId: "546537876108",
  appId: "1:546537876108:web:e69c8ba9301856bcff29a9"
  };

// let app;
// if (firebase.apps.length==0){
const app = firebase.initializeApp(firebaseConfig);
// } else {
  // app=firebase.app()
// }

const db= app.firestore();
const auth=firebase.auth();
export { db,auth }