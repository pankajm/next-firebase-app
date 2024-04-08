"use client";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { TIMEOUT_IDLE, TIMEOUT_REFRESH, TIMEOUT_SESSION } from "../constants";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = useRef(null);
  const sessionExpiryRef = useRef(null);
  useIdleTimer({
    onIdle,
    timeout: TIMEOUT_IDLE,
  });

  /**
   * This function will be called after every 5 minutes
   * @param {*} currentUser
   */
  const refreshToken = (currentUser) => {
    refreshTimerRef.current = setTimeout(async () => {
      currentUser.getIdToken(true);
      refreshToken(currentUser);
      console.log("hehe");
    }, TIMEOUT_REFRESH);
  };

  /**
   * Session will be expired after 1hr of continuous usage
   */
  const setSessionExpiry = () => {
    sessionExpiryRef.current = setTimeout(async () => {
      logOut();
    }, TIMEOUT_SESSION);
  };

  async function onIdle() {
    try {
      if (user) logOut();
    } catch (ex) {
      console.log(ex);
    }
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    clearTimeout(refreshTimerRef.current);
    clearTimeout(sessionExpiryRef.current);
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setSessionExpiry();
        refreshToken(currentUser);
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
      clearTimeout(refreshTimerRef.current);
      clearTimeout(sessionExpiryRef.current);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
