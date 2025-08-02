"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("psm-auth", "true");
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 rounded-lg">
        <img src="/login.png" className="mx-auto mb-6 w-[80%]"/>
        <h2 className="text-center text-xl font-semibold mb-4">Welcome Back</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="text-sm w-full p-3 bg-gray-100 rounded-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="text-sm w-full p-3 bg-gray-100 rounded-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-500 text-white py-3 rounded-full font-semibold"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
