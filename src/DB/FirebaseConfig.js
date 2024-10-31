import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB_kDXIeSfPaVPsY22bj9tvSRJrQAL-tvk",
  authDomain: "chatapp-c9195.firebaseapp.com",
  databaseURL: "https://chatapp-c9195-default-rtdb.firebaseio.com",
  projectId: "chatapp-c9195",
  storageBucket: "chatapp-c9195.appspot.com",
  messagingSenderId: "257202542770",
  appId: "1:257202542770:web:3f3ab19e99cdb9370dd1ab"
};

const app = initializeApp(firebaseConfig);
export default firebaseConfig






// import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   databaseURL: import.meta.env.VITE_databaseURL,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId
// };


// const app = initializeApp(firebaseConfig);
// export default firebaseConfig