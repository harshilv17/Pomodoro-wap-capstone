"use client";
import Home from "./components/Home";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./components/AuthProvider";

export default function Page() {
  const { loggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);
  if (!loggedIn) return null;
  return <Home />;
}
