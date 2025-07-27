import "./globals.css";
import Link from "next/link";
import AuthNav from "./components/AuthNav";
import AuthProvider from "./components/AuthProvider";
import ThemeToggle from "./components/ThemeToggle";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <nav>
            <Link href="/">Home</Link>
            <Link href="/todo">To-Do List</Link>
            <Link href="/pomodoro">Pomodoro</Link>
            <Link href="/planner">Planner</Link>
            <ThemeToggle />
            <AuthNav />
          </nav>
          <div className="content">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
