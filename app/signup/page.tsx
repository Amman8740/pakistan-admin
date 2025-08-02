"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (email && password) {
      // Simulate signup success
      localStorage.setItem("psm-auth", "true");

      // Redirect to dashboard or login
      router.push("/login"); // or "/dashboard" if you want to auto-login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 rounded-lg">
        <img src="/login.png" className="mx-auto mb-6" />
        <h2 className="text-center text-xl font-semibold mb-4">Create an Account</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 bg-gray-100 rounded-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 bg-gray-100 rounded-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-500 text-white py-3 rounded-full font-semibold"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
