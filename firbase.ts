import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAM5mVUivohiBDJS3F0CspEnEC34RmflNY",
  authDomain: "chat-gpt-massenger.firebaseapp.com",
  projectId: "chat-gpt-massenger",
  storageBucket: "chat-gpt-massenger.appspot.com",
  messagingSenderId: "726878756106",
  appId: "1:726878756106:web:de7dc7b32c9305ed206ef3",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
