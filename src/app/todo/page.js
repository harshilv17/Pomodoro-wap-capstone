"use client";
import Todo from "../components/Todo";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";

export default function TodoPage() {
  const { loggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);
  if (!loggedIn) return null;
  return <Todo />;
}
