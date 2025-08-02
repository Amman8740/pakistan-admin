"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ReactNode, useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  useEffect(()=>{
    const auth = localStorage.getItem("psm-auth");
    if (!auth) {
      router.push("/login");
    }
  })
  return (
    <SplashScreen>
      <div className="flex min-h-screen relative">
        <Sidebar isOpen={isSidebarOpen} />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
          <main className="p-4 bg-gray-50 flex-1 overflow-auto">{children}</main>
        </div>

        {/* This renders the modal globally */}
      </div>
      </SplashScreen>
  );
}
