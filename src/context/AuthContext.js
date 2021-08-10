import { CircularProgress } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import loadingGif from "../assets/loading.gif";
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthFinished, setIsAuthFinished] = useState(false);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function signupWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    return auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function signupWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("email");
    return auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function deleteAccount() {
    return currentUser.delete();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function logout() {
    return auth.signOut();
  }
  function sendEmailVerify() {
    return auth.currentUser.sendEmailVerification();
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user != null) {
        setIsAuth(true);
        setIsAuthFinished(true);
      } else {
        setIsAuth(false);
        setIsAuthFinished(true);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    deleteAccount,
    signup,
    sendEmailVerify,
    signupWithGoogle,
    login,
    signupWithFacebook,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    isAuth,
    isAuthFinished,
  };

  return (
    <AuthContext.Provider value={value}>
      {isAuthFinished ? (
        children
      ) : (
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
          }}
          src={loadingGif}
          alt="#"
        />
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
