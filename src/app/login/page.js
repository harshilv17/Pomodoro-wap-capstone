"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", username);
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </div>
  );
} 