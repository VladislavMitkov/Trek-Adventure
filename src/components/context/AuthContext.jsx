import { useState, createContext, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
// toastify

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // checking the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // create user with email and password
  const createUser = async (username, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) => console.log(err));
      await updateProfile(auth.currentUser, { displayName: username }).catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return <UserContext.Provider value={{ createUser, user, logout, signIn, signInWithGoogle }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
