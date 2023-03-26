// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyACgOVsAlqnuMlhhDhpiRaiuBr0ZtyDHUU",
	authDomain: "wanderland-95cbd.firebaseapp.com",
	projectId: "wanderland-95cbd",
	storageBucket: "wanderland-95cbd.appspot.com",
	messagingSenderId: "158271986618",
	appId: "1:158271986618:web:d0fab64b5a8cc72d72db83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
//db
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
