import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
