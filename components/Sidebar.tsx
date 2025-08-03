"use client";
import {
  LogOut,
  Mail,
  Layers,
  ChevronDown,
  ChevronUp,
  BatteryCharging,
  PanelTop,
  HardDrive,
  Landmark,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Sidebar({isOpen}: {isOpen: boolean}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-md p-5 transform transition-transform duration-300 rounded-r-2xl",
        {
          "translate-x-0": isOpen,
          "-translate-x-full": !isOpen,
        }
      )}>
            {/* Top logo and Image */}
            <div>
                <div className="mb-8 flex items-center gap-2">
                    <Image src="/logo.jpg" alt="logo" width={40} height={40} className="rounded-full"/>
                    <h1 className="text-xl font-semibold text-green-600 hidden sm:block">Solar Panel Admin</h1>
                </div>
                {/* Navigation */}
                <nav className="flex flex-col gap-4 text-sm">
                <SidebarLink icon={<Mail size={18} />} label="Contact Us" href="#" />
                <SidebarLink icon={<Landmark size={18}/>} label="Bids Request" href="#"/>
                {/* DropDown */}
                <button
                onClick={()=>setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between text-green-600 px-2 py-2 rounded-lg hover:bg-green-50 transition"
                >
                    <span className="flex items-center gap-2">
                        <Layers size={18}/>
                        My Posts
                    </span>
                    {isDropdownOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </button>
                {isDropdownOpen && (
                  <div className="ml-6 flex flex-col gap-2 text-gray-700">
                    <SidebarLink icon={<PanelTop size={16}/>} label="Panels Post" href="#" small onClick={()=>router.push("/posts/panels")}/>
                    <SidebarLink icon={<BatteryCharging size={16}/>} label="Batteries Post" href="#" small onClick={()=>router.push("/posts/batteries")}/>
                    <SidebarLink icon={<HardDrive size={16}/>} label="Inverter Posts" href="#" small onClick={()=>router.push("/posts/inverters")}/>
                    </div>
                )}
                </nav>
            </div>
            {/* Bottom links */}
            <div className="pt-6">
          <SidebarLink
            icon={<LogOut size={18} />}
            label="Logout"
            href="#"
            className="text-red-500 hover:bg-red-50"
          />
        </div>
      </aside>
    </>
  );
}
function SidebarLink({ icon, label, href, small = false, className = "", onClick}: { icon: React.ReactNode; label: string; href: string; small?: boolean; className?: string; onClick?: ()=>void;}) {
    return (
     <button
      onClick={onClick ? onClick : () => window.location.href = href}
      className={`w-full text-left flex items-center gap-2 px-2 py-2 rounded-lg text-gray-400 hover:bg-gray-100 transition ${
        small ? "text-sm pl-6" : "text-base"
      } ${className}`}
    >
      {icon}
      {label}
    </button>
    );
  }
  
