"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn") === "true");
    setUser(localStorage.getItem("currentUser"));
    const onStorage = () => {
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
      setUser(localStorage.getItem("currentUser"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = (username) => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", username);
    setLoggedIn(true);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 