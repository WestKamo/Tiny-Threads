import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "studio-6093932063-c4457",
  appId: "1:1027614895272:web:1b3bf3b9a4e55998a7e69d",
  storageBucket: "studio-6093932063-c4457.appspot.com",
  apiKey: "AIzaSyDO8ry8yhwg3EHvlMUug7yb5e_bqnv5F5E",
  authDomain: "studio-6093932063-c4457.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "1027614895272"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
