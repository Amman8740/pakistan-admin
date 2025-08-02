"use client";
import { Menu, Plus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
type NavbarProps = {
    toggleSidebar: () => void;
}
export default function Navbar ({toggleSidebar}: NavbarProps){
    const router = useRouter();
    const handleCreate = () => {
        router.push("/create/panel");
    }
    return (
        <header className="bg-white shadow px-4 py-1 flex items-center justify-between w-full">
            <button className=" text-gray-700" onClick={toggleSidebar}>
                <Menu className="cursor-pointer" size={24}  aria-label="toggle sidebar"/>
            </button>
            <h1 className="text-lg font-semibold text-green-700 hidden md:block">Admin</h1>
            <div className="flex items-center gap-2 sm:gap-4">
                <button 
                onClick={handleCreate}
                className="bg-green-600 hover:bg-green-700 text-white p-2 sm:px-3 sm:py-2 rounded-md shadow transition text-sm">
                    <Plus size={15} className="sm:mr-1"/>
                    <span className="hidden sm:inline">Create</span>
                </button>
                <button 
                 onClick={() => {
                    localStorage.removeItem("psm-auth");
                    router.push("/login");
                  }}
                className="bg-red-500 hover:bg-red-600 text-white p-2 sm:px-3 sm:py-2 rounded-md shadow transition text-sm">
                    <LogOut size={15} className="sm:mr-1"/>
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
    )
}