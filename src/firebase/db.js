import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKfv-GIhmDiI9ZsF-c9jlgrdu22cImc1Y",
  authDomain: "contact-book-85878.firebaseapp.com",
  databaseURL: "https://contact-book-85878-default-rtdb.firebaseio.com",
  projectId: "contact-book-85878",
  storageBucket: "contact-book-85878.firebasestorage.app",
  messagingSenderId: "257278346516",
  appId: "1:257278346516:web:6297227963e3566137ee01",
  measurementId: "G-23CRXDCKPE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
