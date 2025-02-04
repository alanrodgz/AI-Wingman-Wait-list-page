import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"; 

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .then(() => console.log("Offline persistence enabled"))
  .catch((error) => {
    console.error("Error enabling offline persistence:", error);
    if (error.code === "failed-precondition") {
      console.warn(
        "Offline persistence can only be enabled in one tab at a time."
      );
    } else if (error.code === "unimplemented") {
      console.warn(
        "Offline persistence is not supported in this browser."
      );
    }
  });

export { db };