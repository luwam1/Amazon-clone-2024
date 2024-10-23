// import firebase from "firebase/compat/app";
// import { getAuth } from "firebase/auth"
//  import "firebase/compat/firestore"
// import "firebase/compat/auth" 


// const firebaseConfig = {
//   apiKey: "AIzaSyDUu6cWCQOmVRUA8S-_Yq1w8aLNgQb6NaE",
//   authDomain: "clone-2b191.firebaseapp.com",
//   projectId: "clone-2b191",
//   storageBucket: "clone-2b191.appspot.com",
//   messagingSenderId: "403910206520",
//   appId: "1:403910206520:web:22c192f8c5aa61ab5932cd",
// };

// firebase.initializeApp(firebaseConfig);

// const app = firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const db = app.firestore()

import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore"; // Import Firestore compat if you still need to use the older syntax

const firebaseConfig = {
  apiKey: "AIzaSyDUu6cWCQOmVRUA8S-_Yq1w8aLNgQb6NaE",
  authDomain: "clone-2b191.firebaseapp.com",
  projectId: "clone-2b191",
  storageBucket: "clone-2b191.appspot.com",
  messagingSenderId: "403910206520",
  appId: "1:403910206520:web:22c192f8c5aa61ab5932cd",
};

// Initialize Firebase App (only once)
const app = firebase.initializeApp(firebaseConfig);

// Initialize Auth and Firestore services
export const auth = getAuth(app);
export const db = firebase.firestore(); // Use firestore from compat version

