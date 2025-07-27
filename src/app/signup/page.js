"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.username === username)) {
      setError("Username already exists");
      return;
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    router.push("/login");
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </div>
  );
} 