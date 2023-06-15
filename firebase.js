import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const app = initializeApp({
    apiKey: "AIzaSyArv9VIBhQeeoCH8WD9RzVg3SGcGg4_VUc",
    authDomain: "tailor-d729a.firebaseapp.com",
    projectId: "tailor-d729a",
    storageBucket: "tailor-d729a.appspot.com",
    messagingSenderId: "984500869609",
    appId: "1:984500869609:web:0e4f71e8ec2c710c0a1378",
    measurementId: "G-SNH9KMP6LL"
  });


const storage = getStorage(app);
export default storage
