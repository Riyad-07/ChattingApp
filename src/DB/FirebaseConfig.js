// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_kDXIeSfPaVPsY22bj9tvSRJrQAL-tvk",
  authDomain: "chatapp-c9195.firebaseapp.com",
  databaseURL: "https://chatapp-c9195-default-rtdb.firebaseio.com",
  projectId: "chatapp-c9195",
  storageBucket: "chatapp-c9195.appspot.com",
  messagingSenderId: "257202542770",
  appId: "1:257202542770:web:3f3ab19e99cdb9370dd1ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig