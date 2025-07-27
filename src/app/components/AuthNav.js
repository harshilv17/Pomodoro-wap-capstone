"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function AuthNav() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn") === "true");
    // Listen for login/logout changes from other tabs
    const onStorage = () => setLoggedIn(localStorage.getItem("loggedIn") === "true");
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    setLoggedIn(false);
    // Redirect to login after logout
    router.push("/login");
  };

  return (
    <div className="auth-links">
      <ThemeToggle />
      {loggedIn ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
    </div>
  );
} 