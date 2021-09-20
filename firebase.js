import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCp4Z-eqgVyA7Q_f1_STo3QWlvtr9zYSy4",
    authDomain: "jotok-2ba19.firebaseapp.com",
    projectId: "jotok-2ba19",
    storageBucket: "jotok-2ba19.appspot.com",
    messagingSenderId: "326369861277",
    appId: "1:326369861277:web:48b638c2cd925260973e74"
  };

let app;
if (firebase.apps.length==0){
   app = firebase.initializeApp(firebaseConfig);
} else {
  app=firebase.app()
}

const db= app.firestore();
const auth=firebase.auth();
export { db,auth}