// components/SplashScreen.tsx
"use client";
import { useEffect, useState } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
        <div className="border border-gray-200 p-10 rounded-3xl shadow-md">
          <img src="/logo.jpeg" alt="PSM Logo" className="h-24 md:h-32 mb-4" />
        </div>
        <h2 className="text-lg font-semibold mt-4">Pakistan Solar Market</h2>
      </div>
    );
  }

  return <>{children}</>;
}
