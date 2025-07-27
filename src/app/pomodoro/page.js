"use client";
import Pomodoro from "../components/Pomodoro";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";

export default function PomodoroPage() {
  const { loggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);
  if (!loggedIn) return null;
  return <Pomodoro />;
}
