import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

const useAuthentication = () => {
  const [activeUser, setActiveUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userError, setUserError] = useState("");
  const provider = new GoogleAuthProvider();

  //   Sign in With Google Handler Starting Here

  const signInWithGoogleHandler = () => {
    return signInWithPopup(auth, provider);
  };
  //   Sign in With Google Handler Ending Here

  //   Custom Sign in  Handler Starting Here

  const customSignInHandler = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   Custom Sign in  Handler Ending Here

  //   Registration  Handler Starting Here

  const registrationHandler = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   Registration Handler Ending Here

  //   Sign Out Handler Starting Here

  const signOutHandler = () => {
    return signOut(auth);
  };
  //   SignOut Handler Ending Here

  const updateProfileName = (userObj) => {
    return updateProfile(auth.currentUser, userObj);
  };
  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);

        console.log("From useAuthentication : User is,", user);
        setIsLoading(false);
      } else {
        setActiveUser({});
        console.log("From useAuthentication: User is,", user);
        setIsLoading(false);
      }
    });
    return () => {
      unSubscribed();
    };
  }, []);

  return {
    activeUser,
    setActiveUser,
    signInWithGoogleHandler,
    customSignInHandler,
    registrationHandler,
    updateProfileName,
    signOutHandler,
    userError,
    setUserError,
    isLoading,
    setIsLoading,
  };
};

export default useAuthentication;
