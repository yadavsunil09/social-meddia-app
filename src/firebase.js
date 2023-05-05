import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage ,ref} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsT_JJwO8-Gh38RbcX5BeH6WaxnehNujY",
  authDomain: "social-media-app-457c7.firebaseapp.com",
  projectId: "social-media-app-457c7",
  storageBucket: "social-media-app-457c7.appspot.com",
  messagingSenderId: "604497895126",
  appId: "1:604497895126:web:7c2e84e15c095be83b7377",
  measurementId: "G-EYSGJYTW34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get the firestore instance
export const firestore = getFirestore(app);
// get the storage instance
export const storage = getStorage(app);

// Use the storage service
export const storageRef = ref(storage);

export const auth = getAuth(app);
export default app;
