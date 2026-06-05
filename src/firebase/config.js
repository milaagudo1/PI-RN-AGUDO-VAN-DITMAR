import app from "firebase/app";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDIpsp9CKQ2Dr9eUPXcVCNsmIdtH9i_ga4",
  authDomain: "pi-2-df244.firebaseapp.com",
  projectId: "pi-2-df244",
  storageBucket: "pi-2-df244.firebasestorage.app",
  messagingSenderId: "306701030564",
  appId: "1:306701030564:web:b44b3b45466ff3a00d4231"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();