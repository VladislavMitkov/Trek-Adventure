// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCk_7XF3YBf4nIdfSCAUqrPHxA98pt7tjM",
	authDomain: "trekadventure-25ee2.firebaseapp.com",
	projectId: "trekadventure-25ee2",
	storageBucket: "trekadventure-25ee2.appspot.com",
	messagingSenderId: "953460068584",
	appId: "1:953460068584:web:cd6628b9895aba5c0e795d",
	measurementId: "G-82K6FCVC6Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
//db
export const db = getFirestore(app);

const analytics = getAnalytics(app);
export const storage = getStorage(app);

export default app;
