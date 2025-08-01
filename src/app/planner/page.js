"use client";
import Planner from "../components/Planner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";

export default function PlannerPage() {
  const { loggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);
  if (!loggedIn) return null;
  return <Planner />;
}
