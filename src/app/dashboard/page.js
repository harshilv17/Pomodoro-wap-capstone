"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";

export default function DashboardPage() {
  const { loggedIn, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);
  if (!loggedIn) return null;
  return (
    <div className="auth-container">
      <h2>Welcome, {user}!</h2>
      <p>This is your dashboard.</p>
    </div>
  );
} 