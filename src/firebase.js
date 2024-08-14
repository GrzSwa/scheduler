import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANABb1TtvCyFMpKVnQXtjRBifKlxrKjMM",
  authDomain: "scheduler-ca90e.firebaseapp.com",
  projectId: "scheduler-ca90e",
  storageBucket: "scheduler-ca90e.appspot.com",
  messagingSenderId: "1041975794585",
  appId: "1:1041975794585:web:f1e91dacf60fd7617f5108"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
