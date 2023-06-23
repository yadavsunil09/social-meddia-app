import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAg1NFGyVpwEkAmG8NUeRSmOgeu7AcyFE0",
  authDomain: "social-media-ee4be.firebaseapp.com",
  projectId: "social-media-ee4be",
  storageBucket: "social-media-ee4be.appspot.com",
  messagingSenderId: "619619585103",
  appId: "1:619619585103:web:744189b2fdfcb51b19ae3a",
  measurementId: "G-Z45H2MHLTF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get the firestore instance
export const db = getFirestore(app);
// get the storage instance
export const storage = getStorage(app);

// Use the storage service
export const storageRef = ref(storage);

export const auth = getAuth(app);
export default app;
